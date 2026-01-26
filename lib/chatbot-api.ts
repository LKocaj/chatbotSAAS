/**
 * API client for connecting to the FastAPI chatbot backend
 * Located at: /Users/lkocaj/Documents/Projects/chatbot
 */

const CHATBOT_API_URL = process.env.CHATBOT_API_URL || 'http://localhost:8000'

interface TenantConfig {
  name: string
  slug: string
  companyName: string
  chatbotName: string
  welcomeMessage: string
  primaryColor: string
  widgetPosition: string
  knowledgeBase: {
    services?: string
    serviceArea?: string
    pricingInfo?: string
    faqs?: Array<{ question: string; answer: string }>
  }
  behavior?: {
    tone?: string
    customInstructions?: string
  }
  booking?: {
    enabled: boolean
    bookingUrl?: string
  }
  integrations?: {
    intakeTenantId?: string
    intakeApiKey?: string
    slackWebhookUrl?: string
  }
  channelConfigs?: {
    sms?: {
      enabled: boolean
      twilioAccountSid?: string
      twilioAuthToken?: string
      phoneNumber?: string
    }
    whatsapp?: {
      enabled: boolean
      twilioAccountSid?: string
      twilioAuthToken?: string
      phoneNumber?: string
    }
    messenger?: {
      enabled: boolean
      pageId?: string
      pageAccessToken?: string
    }
  }
}

interface TenantResponse {
  id: string
  name: string
  slug: string
  status: string
  createdAt: string
  updatedAt: string
}

interface ConversationSummary {
  id: string
  sessionId: string
  channel: string
  leadName?: string
  leadEmail?: string
  leadPhone?: string
  leadScore?: string
  messageCount: number
  createdAt: string
  updatedAt: string
}

interface ConversationDetail extends ConversationSummary {
  messages: Array<{
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    createdAt: string
  }>
}

interface AnalyticsData {
  totalConversations: number
  totalLeads: number
  conversionRate: number
  avgResponseTime: number
  conversationsByChannel: Record<string, number>
  leadsByScore: Record<string, number>
  dailyStats: Array<{
    date: string
    conversations: number
    leads: number
  }>
}

class ChatbotApiClient {
  private baseUrl: string
  private apiKey?: string

  constructor(baseUrl: string = CHATBOT_API_URL, apiKey?: string) {
    this.baseUrl = baseUrl
    this.apiKey = apiKey
  }

  private async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    }

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Unknown error' }))
      throw new Error(error.message || `API error: ${response.status}`)
    }

    return response.json()
  }

  // Health check
  async healthCheck(): Promise<{ status: string }> {
    return this.fetch('/health')
  }

  // Tenant Management
  async createTenant(config: TenantConfig): Promise<TenantResponse> {
    return this.fetch('/api/v1/tenants', {
      method: 'POST',
      body: JSON.stringify(config),
    })
  }

  async getTenant(tenantId: string): Promise<TenantResponse> {
    return this.fetch(`/api/v1/tenants/${tenantId}`)
  }

  async updateTenant(
    tenantId: string,
    config: Partial<TenantConfig>
  ): Promise<TenantResponse> {
    return this.fetch(`/api/v1/tenants/${tenantId}`, {
      method: 'PUT',
      body: JSON.stringify(config),
    })
  }

  async deleteTenant(tenantId: string): Promise<void> {
    await this.fetch(`/api/v1/tenants/${tenantId}`, {
      method: 'DELETE',
    })
  }

  // Widget Configuration
  async getWidgetConfig(tenantId: string): Promise<Record<string, unknown>> {
    return this.fetch(`/widget/${tenantId}/config`)
  }

  // Conversations
  async getConversations(
    tenantId: string,
    options?: {
      limit?: number
      offset?: number
      channel?: string
      leadScore?: string
    }
  ): Promise<{ conversations: ConversationSummary[]; total: number }> {
    const params = new URLSearchParams()
    if (options?.limit) params.set('limit', options.limit.toString())
    if (options?.offset) params.set('offset', options.offset.toString())
    if (options?.channel) params.set('channel', options.channel)
    if (options?.leadScore) params.set('lead_score', options.leadScore)

    return this.fetch(
      `/api/v1/tenants/${tenantId}/conversations?${params.toString()}`
    )
  }

  async getConversation(
    tenantId: string,
    conversationId: string
  ): Promise<ConversationDetail> {
    return this.fetch(
      `/api/v1/tenants/${tenantId}/conversations/${conversationId}`
    )
  }

  // Analytics
  async getAnalytics(
    tenantId: string,
    options?: {
      startDate?: string
      endDate?: string
    }
  ): Promise<AnalyticsData> {
    const params = new URLSearchParams()
    if (options?.startDate) params.set('start_date', options.startDate)
    if (options?.endDate) params.set('end_date', options.endDate)

    return this.fetch(
      `/api/v1/tenants/${tenantId}/analytics?${params.toString()}`
    )
  }

  // Channel Configuration
  async configureSmsChannel(
    tenantId: string,
    config: {
      twilioAccountSid: string
      twilioAuthToken: string
      phoneNumber: string
    }
  ): Promise<{ success: boolean; webhookUrl: string }> {
    return this.fetch(`/api/v1/tenants/${tenantId}/channels/sms`, {
      method: 'POST',
      body: JSON.stringify(config),
    })
  }

  async configureWhatsappChannel(
    tenantId: string,
    config: {
      twilioAccountSid: string
      twilioAuthToken: string
      phoneNumber: string
    }
  ): Promise<{ success: boolean; webhookUrl: string }> {
    return this.fetch(`/api/v1/tenants/${tenantId}/channels/whatsapp`, {
      method: 'POST',
      body: JSON.stringify(config),
    })
  }

  async configureMessengerChannel(
    tenantId: string,
    config: {
      pageId: string
      pageAccessToken: string
    }
  ): Promise<{ success: boolean; webhookUrl: string; verifyToken: string }> {
    return this.fetch(`/api/v1/tenants/${tenantId}/channels/messenger`, {
      method: 'POST',
      body: JSON.stringify(config),
    })
  }

  // Test connection
  async testSmsConnection(
    tenantId: string,
    phoneNumber: string
  ): Promise<{ success: boolean; message: string }> {
    return this.fetch(`/api/v1/tenants/${tenantId}/channels/sms/test`, {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    })
  }
}

// Singleton instance
export const chatbotApi = new ChatbotApiClient()

// Factory function for creating client with custom config
export function createChatbotApiClient(
  baseUrl?: string,
  apiKey?: string
): ChatbotApiClient {
  return new ChatbotApiClient(baseUrl, apiKey)
}

export type {
  TenantConfig,
  TenantResponse,
  ConversationSummary,
  ConversationDetail,
  AnalyticsData,
}
