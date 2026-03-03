/**
 * Enterprise Security Framework
 * Adapted from Microsoft Info Assistant's proven security patterns
 */

export interface SecurityContext {
  tenantId: string;
  userId: string;
  userRoles: string[];
  securityClearance?: string;
  sourceIp: string;
  userAgent: string;
  requestId: string;
}

export interface ContentSafetyResult {
  isSafe: boolean;
  violations: SafetyViolation[];
  riskLevel: RiskLevel;
  recommendations: string[];
  filteredContent?: string;
}

export interface SafetyViolation {
  type: ViolationType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  confidence: number;
}

export enum ViolationType {
  HATE_SPEECH = 'hate_speech',
  VIOLENCE = 'violence',
  SELF_HARM = 'self_harm',
  SEXUAL_CONTENT = 'sexual_content',
  PROMPT_INJECTION = 'prompt_injection',
  DATA_LEAKAGE = 'data_leakage',
  PERSONAL_INFO = 'personal_info',
  MALICIOUS_CODE = 'malicious_code',
  INAPPROPRIATE_CONTENT = 'inappropriate_content'
}

export enum RiskLevel {
  SAFE = 'safe',
  LOW = 'low', 
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface NetworkSecurityResult {
  isAllowed: boolean;
  networkZone: NetworkZone;
  accessPolicy: string;
  restrictions: NetworkRestriction[];
}

export interface NetworkRestriction {
  type: 'ip_range' | 'subnet' | 'vnet' | 'private_endpoint';
  rule: string;
  enforced: boolean;
}

export enum NetworkZone {
  PUBLIC = 'public',
  PRIVATE = 'private',
  TRUSTED = 'trusted',
  RESTRICTED = 'restricted'
}

/**
 * Enterprise Security Framework Interface
 * Implements zero-trust security patterns from Info Assistant
 */
export interface IEnterpriseSecurityFramework {
  /**
   * Pre-processing content safety checks
   * Validates user input before processing
   */
  validateInputSafety(
    content: string,
    context: SecurityContext
  ): Promise<ContentSafetyResult>;

  /**
   * Post-processing content safety checks  
   * Validates AI-generated responses before delivery
   */
  validateResponseSafety(
    response: string,
    context: SecurityContext
  ): Promise<ContentSafetyResult>;

  /**
   * Network-level security enforcement
   * Implements VNet isolation and private endpoint validation
   */
  enforceNetworkSecurity(
    request: SecurityRequest
  ): Promise<NetworkSecurityResult>;

  /**
   * Identity and access validation
   * Integrates with Entra ID for enterprise authentication
   */
  validateIdentityAccess(
    token: string,
    requiredRoles: string[],
    resource: string
  ): Promise<AccessValidationResult>;

  /**
   * Prompt injection detection and defense
   * Protects against malicious prompt engineering attempts
   */
  detectPromptInjection(
    userInput: string,
    context: SecurityContext
  ): Promise<InjectionDetectionResult>;

  /**
   * Data loss prevention (DLP)
   * Prevents unauthorized data exposure
   */
  preventDataLeakage(
    content: string,
    context: SecurityContext
  ): Promise<DLPResult>;

  /**
   * Audit logging for compliance
   * Tracks security events for compliance and monitoring
   */
  auditSecurityEvent(
    event: SecurityEvent
  ): Promise<void>;
}

export interface SecurityRequest {
  sourceIp: string;
  userAgent: string;
  headers: Record<string, string>;
  path: string;
  method: string;
  timestamp: Date;
}

export interface AccessValidationResult {
  isAuthorized: boolean;
  userClaims: UserClaims;
  grantedPermissions: string[];
  deniedReasons?: string[];
  tokenExpiry?: Date;
}

export interface UserClaims {
  userId: string;
  tenantId: string;
  email: string;
  name: string;
  roles: string[];
  groups: string[];
  securityClearance?: string;
}

export interface InjectionDetectionResult {
  isInjection: boolean;
  injectionType: InjectionType;
  confidence: number;
  sanitizedInput?: string;
  detectionRules: string[];
}

export enum InjectionType {
  SYSTEM_PROMPT_OVERRIDE = 'system_prompt_override',
  ROLE_MANIPULATION = 'role_manipulation',
  INSTRUCTION_INJECTION = 'instruction_injection',
  JAILBREAK_ATTEMPT = 'jailbreak_attempt',
  DATA_EXTRACTION = 'data_extraction'
}

export interface DLPResult {
  hasViolation: boolean;
  violations: DLPViolation[];
  redactedContent?: string;
  riskScore: number;
}

export interface DLPViolation {
  type: DLPViolationType;
  pattern: string;
  location: string;
  confidence: number;
}

export enum DLPViolationType {
  CREDIT_CARD = 'credit_card',
  SOCIAL_SECURITY = 'social_security',
  EMAIL_ADDRESS = 'email_address',
  PHONE_NUMBER = 'phone_number',
  API_KEY = 'api_key',
  PASSWORD = 'password',
  PROPRIETARY_DATA = 'proprietary_data'
}

export interface SecurityEvent {
  eventType: SecurityEventType;
  severity: 'info' | 'warning' | 'error' | 'critical';
  timestamp: Date;
  context: SecurityContext;
  details: Record<string, any>;
  outcome: 'allowed' | 'blocked' | 'monitored';
}

export enum SecurityEventType {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization', 
  CONTENT_VIOLATION = 'content_violation',
  NETWORK_ACCESS = 'network_access',
  PROMPT_INJECTION = 'prompt_injection',
  DATA_ACCESS = 'data_access',
  SYSTEM_EVENT = 'system_event'
}

/**
 * Enterprise Security Framework Implementation
 * Zero-trust security based on Info Assistant patterns
 */
export class EnterpriseSecurityFramework implements IEnterpriseSecurityFramework {
  private contentSafetyClient: any; // Azure AI Content Safety Client
  private cosmosClient: any; // For audit logging
  private keyVaultClient: any; // For security configuration

  // Content safety patterns adapted from Info Assistant
  private readonly PROMPT_INJECTION_PATTERNS = [
    /ignore\s+previous\s+instructions/i,
    /system\s*:\s*you\s+are\s+now/i,
    /forget\s+everything\s+above/i,
    /act\s+as\s+if\s+you\s+are/i,
    /pretend\s+to\s+be/i,
    /roleplay\s+as/i,
    /\[system\]/i,
    /\[\/system\]/i,
    /__system__/i,
    /assistant\s*:\s*i\s+will/i
  ];

  private readonly DLP_PATTERNS = {
    creditCard: /\b\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}\b/g,
    socialSecurity: /\b\d{3}-\d{2}-\d{4}\b/g,
    email: /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g,
    phone: /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
    apiKey: /[a-zA-Z0-9]{32,}/g
  };

  /**
   * Validate input safety with comprehensive checks
   */
  async validateInputSafety(
    content: string,
    context: SecurityContext
  ): Promise<ContentSafetyResult> {
    const violations: SafetyViolation[] = [];
    
    try {
      // 1. Check for prompt injection attempts
      const injectionResult = await this.detectPromptInjection(content, context);
      if (injectionResult.isInjection) {
        violations.push({
          type: ViolationType.PROMPT_INJECTION,
          severity: 'high',
          description: `Potential prompt injection detected: ${injectionResult.injectionType}`,
          location: 'user_input',
          confidence: injectionResult.confidence
        });
      }

      // 2. Azure AI Content Safety integration
      const contentSafetyResult = await this.checkAzureContentSafety(content);
      violations.push(...contentSafetyResult.violations);

      // 3. Data leakage prevention
      const dlpResult = await this.preventDataLeakage(content, context);
      if (dlpResult.hasViolation) {
        violations.push(...dlpResult.violations.map(v => ({
          type: ViolationType.DATA_LEAKAGE,
          severity: 'medium' as const,
          description: `Potential data leakage: ${v.type}`,
          location: v.location,
          confidence: v.confidence
        })));
      }

      // Calculate overall risk level
      const riskLevel = this.calculateRiskLevel(violations);

      // Log security event
      await this.auditSecurityEvent({
        eventType: SecurityEventType.CONTENT_VIOLATION,
        severity: this.mapRiskToSeverity(riskLevel),
        timestamp: new Date(),
        context,
        details: {
          contentLength: content.length,
          violationsCount: violations.length,
          inputSafety: true
        },
        outcome: violations.length > 0 ? 'blocked' : 'allowed'
      });

      return {
        isSafe: violations.length === 0 || riskLevel === RiskLevel.SAFE,
        violations,
        riskLevel,
        recommendations: this.generateSafetyRecommendations(violations),
        filteredContent: dlpResult.redactedContent
      };

    } catch (error) {
      // Log error and fail securely
      await this.auditSecurityEvent({
        eventType: SecurityEventType.SYSTEM_EVENT,
        severity: 'error',
        timestamp: new Date(),
        context,
        details: {
          error: error.message,
          function: 'validateInputSafety'
        },
        outcome: 'blocked'
      });

      throw error;
    }
  }

  /**
   * Validate response safety before delivery
   */
  async validateResponseSafety(
    response: string,
    context: SecurityContext
  ): Promise<ContentSafetyResult> {
    const violations: SafetyViolation[] = [];

    // 1. Check for data leakage in response
    const dlpResult = await this.preventDataLeakage(response, context);
    if (dlpResult.hasViolation) {
      violations.push(...dlpResult.violations.map(v => ({
        type: ViolationType.DATA_LEAKAGE,
        severity: 'high' as const,
        description: `Data leakage in response: ${v.type}`,
        location: v.location,
        confidence: v.confidence
      })));
    }

    // 2. Azure AI Content Safety for response
    const contentSafetyResult = await this.checkAzureContentSafety(response);
    violations.push(...contentSafetyResult.violations);

    const riskLevel = this.calculateRiskLevel(violations);

    await this.auditSecurityEvent({
      eventType: SecurityEventType.CONTENT_VIOLATION,
      severity: this.mapRiskToSeverity(riskLevel),
      timestamp: new Date(),
      context,
      details: {
        responseLength: response.length,
        violationsCount: violations.length,
        responseSafety: true
      },
      outcome: violations.length > 0 ? 'blocked' : 'allowed'
    });

    return {
      isSafe: violations.length === 0,
      violations,
      riskLevel,
      recommendations: this.generateSafetyRecommendations(violations),
      filteredContent: dlpResult.redactedContent
    };
  }

  /**
   * Network security enforcement (Info Assistant VNet patterns)
   */
  async enforceNetworkSecurity(
    request: SecurityRequest
  ): Promise<NetworkSecurityResult> {
    const restrictions: NetworkRestriction[] = [];
    
    // Check IP allowlist/blocklist
    const ipRestriction = await this.validateIpAddress(request.sourceIp);
    restrictions.push(ipRestriction);
    
    // Determine network zone
    const networkZone = this.determineNetworkZone(request.sourceIp);
    
    // Apply zone-based policies
    const isAllowed = await this.applyNetworkPolicies(networkZone, request);
    
    return {
      isAllowed,
      networkZone,
      accessPolicy: `zone_${networkZone}_policy`,
      restrictions
    };
  }

  /**
   * Identity and access validation with Entra ID
   */
  async validateIdentityAccess(
    token: string,
    requiredRoles: string[],
    resource: string
  ): Promise<AccessValidationResult> {
    // This would integrate with Azure AD/Entra ID validation
    // Placeholder implementation
    
    const userClaims: UserClaims = {
      userId: 'user123',
      tenantId: 'tenant123',
      email: 'user@company.com',
      name: 'Test User',
      roles: ['reader', 'contributor'],
      groups: ['enterprise-users']
    };

    const isAuthorized = requiredRoles.every(role => 
      userClaims.roles.includes(role)
    );

    return {
      isAuthorized,
      userClaims,
      grantedPermissions: userClaims.roles,
      deniedReasons: isAuthorized ? undefined : ['Insufficient role permissions']
    };
  }

  /**
   * Prompt injection detection with advanced patterns
   */
  async detectPromptInjection(
    userInput: string,
    context: SecurityContext
  ): Promise<InjectionDetectionResult> {
    let maxConfidence = 0;
    let detectedType = InjectionType.INSTRUCTION_INJECTION;
    const detectionRules: string[] = [];

    // Check against known injection patterns
    for (const pattern of this.PROMPT_INJECTION_PATTERNS) {
      if (pattern.test(userInput)) {
        detectionRules.push(pattern.toString());
        maxConfidence = Math.max(maxConfidence, 0.8);
        
        // Classify injection type based on pattern
        if (pattern.toString().includes('system')) {
          detectedType = InjectionType.SYSTEM_PROMPT_OVERRIDE;
        } else if (pattern.toString().includes('roleplay|pretend|act')) {
          detectedType = InjectionType.ROLE_MANIPULATION;
        }
      }
    }

    // Additional heuristic checks
    if (userInput.includes('DAN') || userInput.includes('jailbreak')) {
      maxConfidence = Math.max(maxConfidence, 0.9);
      detectedType = InjectionType.JAILBREAK_ATTEMPT;
      detectionRules.push('jailbreak_heuristic');
    }

    const isInjection = maxConfidence > 0.5;
    
    if (isInjection) {
      await this.auditSecurityEvent({
        eventType: SecurityEventType.PROMPT_INJECTION,
        severity: 'warning',
        timestamp: new Date(),
        context,
        details: {
          injectionType: detectedType,
          confidence: maxConfidence,
          detectionRules
        },
        outcome: 'blocked'
      });
    }

    return {
      isInjection,
      injectionType: detectedType,
      confidence: maxConfidence,
      sanitizedInput: isInjection ? this.sanitizeInput(userInput) : undefined,
      detectionRules
    };
  }

  /**
   * Data loss prevention with pattern matching
   */
  async preventDataLeakage(
    content: string,
    context: SecurityContext
  ): Promise<DLPResult> {
    const violations: DLPViolation[] = [];
    let redactedContent = content;
    
    // Check for various PII patterns
    Object.entries(this.DLP_PATTERNS).forEach(([type, pattern]) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          violations.push({
            type: type as DLPViolationType,
            pattern: pattern.toString(),
            location: content.indexOf(match).toString(),
            confidence: 0.9
          });
          
          // Redact the sensitive data
          redactedContent = redactedContent.replace(match, '[REDACTED]');
        });
      }
    });

    const riskScore = violations.reduce((score, v) => score + v.confidence, 0) / Math.max(violations.length, 1);

    if (violations.length > 0) {
      await this.auditSecurityEvent({
        eventType: SecurityEventType.DATA_ACCESS,
        severity: riskScore > 0.8 ? 'error' : 'warning',
        timestamp: new Date(),
        context,
        details: {
          violations: violations.length,
          riskScore,
          contentLength: content.length
        },
        outcome: 'monitored'
      });
    }

    return {
      hasViolation: violations.length > 0,
      violations,
      redactedContent: violations.length > 0 ? redactedContent : undefined,
      riskScore
    };
  }

  /**
   * Audit security events to Cosmos DB
   */
  async auditSecurityEvent(event: SecurityEvent): Promise<void> {
    // Store audit event in Cosmos DB with proper partitioning
    const auditRecord = {
      id: `${event.context.requestId}_${Date.now()}`,
      partitionKey: event.context.tenantId, // Partition by tenant
      ...event,
      _ts: Math.floor(Date.now() / 1000)
    };

    // This would write to Cosmos DB audit container
    console.log('Security audit event:', auditRecord);
  }

  // Private helper methods
  private async checkAzureContentSafety(content: string): Promise<{ violations: SafetyViolation[] }> {
    // Integrate with Azure AI Content Safety service
    // Placeholder implementation
    return { violations: [] };
  }

  private calculateRiskLevel(violations: SafetyViolation[]): RiskLevel {
    if (violations.length === 0) return RiskLevel.SAFE;
    
    const maxSeverity = violations.reduce((max, v) => {
      const severityWeight = { low: 1, medium: 2, high: 3, critical: 4 };
      return Math.max(max, severityWeight[v.severity]);
    }, 0);

    if (maxSeverity >= 4) return RiskLevel.CRITICAL;
    if (maxSeverity >= 3) return RiskLevel.HIGH;
    if (maxSeverity >= 2) return RiskLevel.MEDIUM;
    return RiskLevel.LOW;
  }

  private mapRiskToSeverity(risk: RiskLevel): 'info' | 'warning' | 'error' | 'critical' {
    switch (risk) {
      case RiskLevel.CRITICAL: return 'critical';
      case RiskLevel.HIGH: return 'error';
      case RiskLevel.MEDIUM: return 'warning';
      default: return 'info';
    }
  }

  private generateSafetyRecommendations(violations: SafetyViolation[]): string[] {
    const recommendations: string[] = [];
    
    violations.forEach(v => {
      switch (v.type) {
        case ViolationType.PROMPT_INJECTION:
          recommendations.push('Review and sanitize user input for prompt injection attempts');
          break;
        case ViolationType.DATA_LEAKAGE:
          recommendations.push('Implement data redaction policies');
          break;
        case ViolationType.PERSONAL_INFO:
          recommendations.push('Enable PII detection and removal');
          break;
      }
    });

    return [...new Set(recommendations)]; // Remove duplicates
  }

  private async validateIpAddress(sourceIp: string): Promise<NetworkRestriction> {
    // Check against IP allowlist/blocklist
    return {
      type: 'ip_range',
      rule: 'default_policy',
      enforced: true
    };
  }

  private determineNetworkZone(sourceIp: string): NetworkZone {
    // Determine network zone based on IP address
    if (sourceIp.startsWith('10.') || sourceIp.startsWith('172.') || sourceIp.startsWith('192.168.')) {
      return NetworkZone.PRIVATE;
    }
    return NetworkZone.PUBLIC;
  }

  private async applyNetworkPolicies(zone: NetworkZone, request: SecurityRequest): Promise<boolean> {
    // Apply zone-based network policies
    return zone === NetworkZone.PRIVATE || zone === NetworkZone.TRUSTED;
  }

  private sanitizeInput(input: string): string {
    // Remove potential injection attempts
    let sanitized = input;
    
    this.PROMPT_INJECTION_PATTERNS.forEach(pattern => {
      sanitized = sanitized.replace(pattern, '[FILTERED]');
    });
    
    return sanitized;
  }
}
