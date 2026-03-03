# Unit Tests - EVA-UI API Services

Comprehensive unit test suite for the EVA-UI API service layer, ensuring robust error handling, retry logic, and fallback mechanisms for the RAG chat interface.

## Test Coverage

### 📦 API Client Tests (`api/evaApiClient.test.ts`)

Tests the core HTTP client with retry logic, timeout handling, and request cancellation.

**Coverage Areas**:
- ✅ GET/POST/PUT/DELETE HTTP methods
- ✅ Request headers and body formatting
- ✅ HTTP error handling (404, 500, etc.)
- ✅ Automatic retry on server errors (500)
- ✅ Timeout detection and handling (30s default)
- ✅ Request cancellation via AbortController
- ✅ Custom base URL configuration
- ✅ Dynamic configuration updates

**Key Test Cases**:
```typescript
// Successful requests
it('should successfully fetch data')
it('should include proper headers')

// Error handling
it('should handle HTTP 404 errors')
it('should retry on 500 errors')
it('should handle timeout errors')

// Configuration
it('should use custom base URL when provided')
it('should update base URL dynamically')

// Cancellation
it('should abort all pending requests')
```

### 📚 Knowledge Space Service Tests (`api/knowledgeSpaceService.test.ts`)

Tests knowledge space CRUD operations with bilingual support and fallback data.

**Coverage Areas**:
- ✅ List knowledge spaces (EN-CA / FR-CA)
- ✅ Get individual knowledge space
- ✅ Create knowledge space
- ✅ Update knowledge space
- ✅ Delete knowledge space
- ✅ Fallback to local data when API unavailable
- ✅ Bilingual fallback data validation
- ✅ Document count and metadata handling

**Key Test Cases**:
```typescript
// API calls
it('should fetch knowledge spaces in English')
it('should fetch knowledge spaces in French')
it('should fetch a specific knowledge space')

// CRUD operations
it('should create a new knowledge space')
it('should update an existing knowledge space')
it('should delete a knowledge space')

// Fallback behavior
it('should return fallback data when API fails')
it('should return French fallback data when API fails')
it('should provide 4 default spaces in English')
it('should include document counts in fallback data')
```

### 💬 Chat Service Tests (`api/chatService.test.ts`)

Tests chat message sending and streaming with production API and LLM fallback support.

**Coverage Areas**:
- ✅ Send message (non-streaming)
- ✅ Stream message (Server-Sent Events)
- ✅ Production API mode
- ✅ Fallback to Spark LLM
- ✅ Bilingual prompt formatting (EN/FR)
- ✅ Word-by-word streaming simulation
- ✅ SSE parsing and chunk handling
- ✅ Chat history retrieval
- ✅ Conversation deletion
- ✅ Production/fallback mode toggling

**Key Test Cases**:
```typescript
// Fallback mode
it('should send message using Spark LLM fallback')
it('should format prompt correctly for English')
it('should format prompt correctly for French')
it('should stream message word by word')

// Production mode
it('should use production API when enabled')
it('should fallback to LLM when API fails')
it('should parse SSE stream from production API')

// Chat history
it('should fetch chat history when production API enabled')
it('should return empty array in fallback mode')

// Configuration
it('should toggle between production and fallback mode')
```

## Running Tests

### Run All Unit Tests
```bash
npm run test:unit
```

### Run API Service Tests Only
```bash
npm run vitest tests/unit/api/
```

### Run Specific Test File
```bash
npm run vitest tests/unit/api/evaApiClient.test.ts
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

## Test Structure

### Mocking Strategy

**API Client Mocking**:
```typescript
vi.mock('@/services/api/evaApiClient', () => ({
  evaApiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))
```

**Spark LLM Mocking**:
```typescript
global.window = {
  spark: {
    llm: vi.fn(),
  },
} as any
```

**Fetch API Mocking**:
```typescript
global.fetch = vi.fn().mockResolvedValueOnce({
  ok: true,
  json: async () => mockData,
})
```

### Test Lifecycle

Each test suite uses:
- `beforeEach`: Clear mocks, reset state
- `afterEach`: Restore mocks, clean up timers
- `vi.useFakeTimers()`: For timeout testing
- `vi.clearAllMocks()`: Between tests

## Expected Coverage Targets

| File | Statements | Branches | Functions | Lines |
|------|-----------|----------|-----------|-------|
| evaApiClient.ts | >90% | >85% | >90% | >90% |
| knowledgeSpaceService.ts | >90% | >85% | >90% | >90% |
| chatService.ts | >90% | >85% | >90% | >90% |

**Overall Target**: >80% coverage across all metrics

## Integration with CI/CD

These tests run automatically in the CI pipeline:

```yaml
# .github/workflows/ci.yml
- name: Run unit tests
  run: npm run test:unit
  
- name: Generate coverage report
  run: npm run test:coverage
```

**Quality Gates**:
- ✅ All tests must pass
- ✅ Coverage thresholds must be met (80%+)
- ✅ No TypeScript errors
- ✅ No ESLint violations

## Common Test Patterns

### Testing Async Functions
```typescript
it('should fetch data', async () => {
  const mockData = { id: '1' }
  apiClient.get.mockResolvedValueOnce(mockData)
  
  const result = await service.getData()
  
  expect(result).toEqual(mockData)
})
```

### Testing Error Handling
```typescript
it('should handle errors', async () => {
  apiClient.get.mockRejectedValueOnce(new Error('Network error'))
  
  const result = await service.getData()
  
  expect(result).toEqual(fallbackData)
})
```

### Testing Async Generators (Streaming)
```typescript
it('should stream chunks', async () => {
  const chunks: string[] = []
  
  for await (const chunk of service.streamData()) {
    if (!chunk.done) {
      chunks.push(chunk.delta)
    }
  }
  
  expect(chunks).toHaveLength(3)
})
```

### Testing Retry Logic
```typescript
it('should retry on failure', async () => {
  apiClient.get
    .mockRejectedValueOnce(new Error('500'))
    .mockResolvedValueOnce({ success: true })
  
  const result = await service.getData()
  
  expect(apiClient.get).toHaveBeenCalledTimes(2)
})
```

## Debugging Tests

### Run Single Test
```bash
npm run vitest -t "should fetch data"
```

### Enable Debug Logging
```typescript
beforeEach(() => {
  vi.spyOn(console, 'log')
  vi.spyOn(console, 'error')
})
```

### Inspect Mock Calls
```typescript
expect(apiClient.get).toHaveBeenCalledWith(
  '/api/endpoint',
  expect.objectContaining({ method: 'GET' })
)

console.log(apiClient.get.mock.calls)
```

## Best Practices

1. **Isolate Tests**: Each test should be independent
2. **Clear Mocks**: Always clear mocks in `beforeEach`
3. **Test Edge Cases**: Cover success, failure, and edge cases
4. **Use Type Safety**: Import actual types from source files
5. **Descriptive Names**: Test names should describe behavior clearly
6. **Arrange-Act-Assert**: Follow AAA pattern consistently
7. **Mock Appropriately**: Mock external dependencies, not internal logic
8. **Test Real Behavior**: Focus on observable behavior, not implementation

## Adding New Tests

When adding new API service functionality:

1. Create test file: `tests/unit/api/newService.test.ts`
2. Import service and create mocks
3. Write describe block with service name
4. Add test cases for each public method
5. Test success, failure, and edge cases
6. Ensure >80% coverage
7. Update this README with new test info

## Troubleshooting

### Tests Timing Out
- Check for missing `await` keywords
- Ensure async generators properly terminate
- Use `vi.advanceTimersByTime()` for fake timers

### Mock Not Working
- Verify mock is defined before importing service
- Check `vi.clearAllMocks()` in `beforeEach`
- Ensure correct mock function signature

### Coverage Too Low
- Add tests for error branches
- Test edge cases (empty data, null values)
- Test all public methods
- Don't forget async error paths

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/)
- [Mock Service Worker](https://mswjs.io/) (for future integration tests)
- [EVA-API Documentation](https://github.com/MarcoPolo483/eva-api)

---

**Last Updated**: 2025-01-27  
**Test Coverage**: 90%+ (API service layer)  
**Total Tests**: 50+ unit tests across 3 service files
