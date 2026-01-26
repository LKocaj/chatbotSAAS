/**
 * Lead Intake Integration
 *
 * Use this to submit captured leads to the OnCall lead intake system,
 * which then syncs them to Airtable with the correct service mapping.
 */

const LEAD_INTAKE_API = process.env.LEAD_INTAKE_API_URL || 'https://lead-intake-system-production.up.railway.app'

export interface LeadData {
  name: string
  email?: string
  phone?: string
  company?: string
  message?: string
  // Additional context from the chatbot conversation
  conversationSummary?: string
  chatbotId?: string
}

/**
 * Submit a lead to the OnCall lead intake system.
 * This will create a lead in the Sales Pipeline Stages table in Airtable,
 * linked to the "AI Chatbots" service.
 */
export async function submitLead(lead: LeadData): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    const response = await fetch(`${LEAD_INTAKE_API}/api/v1/public/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        full_name: lead.name,
        email: lead.email,
        phone: lead.phone,
        company: lead.company,
        message: lead.message || lead.conversationSummary,
        source: 'chatbot_saas',  // Maps to AI Chatbots service in Airtable
        raw_payload: {
          chatbotId: lead.chatbotId,
          conversationSummary: lead.conversationSummary,
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Lead submission failed:', error)
      return { success: false, error }
    }

    const data = await response.json()
    return { success: true, leadId: data.id }
  } catch (error) {
    console.error('Lead submission error:', error)
    return { success: false, error: String(error) }
  }
}

/**
 * Example usage in your chatbot conversation handler:
 *
 * ```typescript
 * import { submitLead } from '@/lib/lead-intake'
 *
 * // When chatbot collects lead info during conversation:
 * const result = await submitLead({
 *   name: 'John Smith',
 *   email: 'john@example.com',
 *   phone: '+1-555-123-4567',
 *   company: 'Acme Corp',
 *   conversationSummary: 'Interested in AI chatbot for customer support',
 *   chatbotId: 'bot_123',
 * })
 *
 * if (result.success) {
 *   console.log('Lead created:', result.leadId)
 * }
 * ```
 */
