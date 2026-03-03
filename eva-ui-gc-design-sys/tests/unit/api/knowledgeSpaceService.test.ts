import { describe, it, expect, beforeEach, vi } from 'vitest'
import { knowledgeSpaceService } from '@/services/api/knowledgeSpaceService'
import { evaApiClient } from '@/services/api/evaApiClient'
import type { KnowledgeSpace } from '@/services/api/types'

vi.mock('@/services/api/evaApiClient', () => ({
  evaApiClient: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('KnowledgeSpaceService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('listKnowledgeSpaces', () => {
    it('should fetch knowledge spaces in English', async () => {
      const mockSpaces: KnowledgeSpace[] = [
        {
          id: 'general',
          name: 'General Knowledge',
          description: 'General information',
          locale: 'en-CA',
          documentCount: 1250,
          lastUpdated: new Date('2025-01-20'),
        },
      ]

      ;(evaApiClient.get as any).mockResolvedValueOnce(mockSpaces)

      const result = await knowledgeSpaceService.listKnowledgeSpaces('en-CA')

      expect(result).toEqual(mockSpaces)
      expect(evaApiClient.get).toHaveBeenCalledWith('/api/v1/knowledge-spaces?locale=en-CA')
    })

    it('should fetch knowledge spaces in French', async () => {
      const mockSpaces: KnowledgeSpace[] = [
        {
          id: 'general',
          name: 'Connaissances générales',
          description: 'Informations générales',
          locale: 'fr-CA',
          documentCount: 1250,
          lastUpdated: new Date('2025-01-20'),
        },
      ]

      ;(evaApiClient.get as any).mockResolvedValueOnce(mockSpaces)

      const result = await knowledgeSpaceService.listKnowledgeSpaces('fr-CA')

      expect(result).toEqual(mockSpaces)
      expect(evaApiClient.get).toHaveBeenCalledWith('/api/v1/knowledge-spaces?locale=fr-CA')
    })

    it('should return fallback data when API fails', async () => {
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('Network error'))

      const result = await knowledgeSpaceService.listKnowledgeSpaces('en-CA')

      expect(result).toHaveLength(4)
      expect(result[0].id).toBe('general')
      expect(result[0].name).toBe('General Knowledge')
    })

    it('should return French fallback data when API fails', async () => {
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('Network error'))

      const result = await knowledgeSpaceService.listKnowledgeSpaces('fr-CA')

      expect(result).toHaveLength(4)
      expect(result[0].id).toBe('general')
      expect(result[0].name).toBe('Connaissances générales')
    })
  })

  describe('getKnowledgeSpace', () => {
    it('should fetch a specific knowledge space', async () => {
      const mockSpace: KnowledgeSpace = {
        id: 'hr-policies',
        name: 'HR Policies',
        description: 'Human resources policies',
        locale: 'en-CA',
        documentCount: 342,
        lastUpdated: new Date('2025-01-15'),
      }

      ;(evaApiClient.get as any).mockResolvedValueOnce(mockSpace)

      const result = await knowledgeSpaceService.getKnowledgeSpace('hr-policies', 'en-CA')

      expect(result).toEqual(mockSpace)
      expect(evaApiClient.get).toHaveBeenCalledWith('/api/v1/knowledge-spaces/hr-policies?locale=en-CA')
    })

    it('should return fallback data when API fails', async () => {
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('Network error'))

      const result = await knowledgeSpaceService.getKnowledgeSpace('hr-policies', 'en-CA')

      expect(result).not.toBeNull()
      expect(result?.id).toBe('hr-policies')
      expect(result?.name).toBe('HR Policies')
    })

    it('should return null for non-existent space', async () => {
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('Not found'))

      const result = await knowledgeSpaceService.getKnowledgeSpace('non-existent', 'en-CA')

      expect(result).toBeNull()
    })
  })

  describe('createKnowledgeSpace', () => {
    it('should create a new knowledge space', async () => {
      const newSpace = {
        name: 'New Space',
        description: 'A new space',
        locale: 'en-CA' as const,
        documentCount: 0,
        lastUpdated: new Date(),
      }

      const createdSpace: KnowledgeSpace = {
        id: 'new-space',
        ...newSpace,
      }

      ;(evaApiClient.post as any).mockResolvedValueOnce(createdSpace)

      const result = await knowledgeSpaceService.createKnowledgeSpace(newSpace)

      expect(result).toEqual(createdSpace)
      expect(evaApiClient.post).toHaveBeenCalledWith('/api/v1/knowledge-spaces', newSpace)
    })
  })

  describe('updateKnowledgeSpace', () => {
    it('should update an existing knowledge space', async () => {
      const updates = {
        name: 'Updated Name',
        description: 'Updated description',
      }

      const updatedSpace: KnowledgeSpace = {
        id: 'general',
        name: 'Updated Name',
        description: 'Updated description',
        locale: 'en-CA',
        documentCount: 1300,
        lastUpdated: new Date(),
      }

      ;(evaApiClient.put as any).mockResolvedValueOnce(updatedSpace)

      const result = await knowledgeSpaceService.updateKnowledgeSpace('general', updates)

      expect(result).toEqual(updatedSpace)
      expect(evaApiClient.put).toHaveBeenCalledWith('/api/v1/knowledge-spaces/general', updates)
    })
  })

  describe('deleteKnowledgeSpace', () => {
    it('should delete a knowledge space', async () => {
      ;(evaApiClient.delete as any).mockResolvedValueOnce(undefined)

      await knowledgeSpaceService.deleteKnowledgeSpace('old-space')

      expect(evaApiClient.delete).toHaveBeenCalledWith('/api/v1/knowledge-spaces/old-space')
    })
  })

  describe('Fallback data validation', () => {
    it('should provide 4 default spaces in English', async () => {
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('API down'))

      const result = await knowledgeSpaceService.listKnowledgeSpaces('en-CA')

      expect(result).toHaveLength(4)
      expect(result.map(s => s.id)).toEqual([
        'general',
        'hr-policies',
        'it-security',
        'procurement',
      ])
    })

    it('should provide 4 default spaces in French', async () => {
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('API down'))

      const result = await knowledgeSpaceService.listKnowledgeSpaces('fr-CA')

      expect(result).toHaveLength(4)
      expect(result.map(s => s.id)).toEqual([
        'general',
        'hr-policies',
        'it-security',
        'procurement',
      ])
      expect(result[0].name).toBe('Connaissances générales')
    })

    it('should include document counts in fallback data', async () => {
      ;(evaApiClient.get as any).mockRejectedValueOnce(new Error('API down'))

      const result = await knowledgeSpaceService.listKnowledgeSpaces('en-CA')

      result.forEach(space => {
        expect(space.documentCount).toBeGreaterThan(0)
        expect(space.lastUpdated).toBeInstanceOf(Date)
      })
    })
  })
})
