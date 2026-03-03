import { evaApiClient } from './evaApiClient'
import type { KnowledgeSpace } from './types'

export class KnowledgeSpaceService {
  private useFallback = false

  async listKnowledgeSpaces(locale: 'en-CA' | 'fr-CA'): Promise<KnowledgeSpace[]> {
    if (this.useFallback || import.meta.env.DEV) {
      console.log('Using fallback knowledge spaces (dev mode or API unavailable)')
      return this.getFallbackKnowledgeSpaces(locale)
    }

    try {
      const spaces = await evaApiClient.get<KnowledgeSpace[]>(
        `/api/v1/knowledge-spaces?locale=${locale}`
      )
      return spaces
    } catch (error) {
      console.error('Failed to fetch knowledge spaces, using fallback:', error)
      this.useFallback = true
      return this.getFallbackKnowledgeSpaces(locale)
    }
  }

  async getKnowledgeSpace(id: string, locale: 'en-CA' | 'fr-CA'): Promise<KnowledgeSpace | null> {
    try {
      return await evaApiClient.get<KnowledgeSpace>(
        `/api/v1/knowledge-spaces/${id}?locale=${locale}`
      )
    } catch (error) {
      console.error(`Failed to fetch knowledge space ${id}:`, error)
      return this.getFallbackKnowledgeSpaces(locale).find(s => s.id === id) || null
    }
  }

  async createKnowledgeSpace(space: Omit<KnowledgeSpace, 'id'>): Promise<KnowledgeSpace> {
    return await evaApiClient.post<KnowledgeSpace>('/api/v1/knowledge-spaces', space)
  }

  async updateKnowledgeSpace(id: string, updates: Partial<KnowledgeSpace>): Promise<KnowledgeSpace> {
    return await evaApiClient.put<KnowledgeSpace>(`/api/v1/knowledge-spaces/${id}`, updates)
  }

  async deleteKnowledgeSpace(id: string): Promise<void> {
    await evaApiClient.delete<void>(`/api/v1/knowledge-spaces/${id}`)
  }

  private getFallbackKnowledgeSpaces(locale: 'en-CA' | 'fr-CA'): KnowledgeSpace[] {
    if (locale === 'fr-CA') {
      return [
        {
          id: 'general',
          name: 'Connaissances générales',
          description: 'Informations générales sur les services gouvernementaux',
          locale: 'fr-CA',
          documentCount: 1250,
          lastUpdated: new Date('2025-01-20'),
        },
        {
          id: 'hr-policies',
          name: 'Politiques RH',
          description: 'Politiques et procédures des ressources humaines',
          locale: 'fr-CA',
          documentCount: 342,
          lastUpdated: new Date('2025-01-15'),
        },
        {
          id: 'it-security',
          name: 'Sécurité TI',
          description: 'Directives et meilleures pratiques en matière de sécurité informatique',
          locale: 'fr-CA',
          documentCount: 567,
          lastUpdated: new Date('2025-01-18'),
        },
        {
          id: 'procurement',
          name: 'Approvisionnement',
          description: 'Règles et procédures d\'achat pour le gouvernement',
          locale: 'fr-CA',
          documentCount: 428,
          lastUpdated: new Date('2025-01-12'),
        },
      ]
    }

    return [
      {
        id: 'general',
        name: 'General Knowledge',
        description: 'General information about government services',
        locale: 'en-CA',
        documentCount: 1250,
        lastUpdated: new Date('2025-01-20'),
      },
      {
        id: 'hr-policies',
        name: 'HR Policies',
        description: 'Human resources policies and procedures',
        locale: 'en-CA',
        documentCount: 342,
        lastUpdated: new Date('2025-01-15'),
      },
      {
        id: 'it-security',
        name: 'IT Security',
        description: 'Information technology security guidelines and best practices',
        locale: 'en-CA',
        documentCount: 567,
        lastUpdated: new Date('2025-01-18'),
      },
      {
        id: 'procurement',
        name: 'Procurement',
        description: 'Government purchasing rules and procedures',
        locale: 'en-CA',
        documentCount: 428,
        lastUpdated: new Date('2025-01-12'),
      },
    ]
  }
}

export const knowledgeSpaceService = new KnowledgeSpaceService()
