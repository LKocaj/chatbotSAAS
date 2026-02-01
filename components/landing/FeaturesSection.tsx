'use client'

import { useState } from 'react'
import { MessageSquare, Zap, Globe, BarChart3, Users, Clock, X, ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)
  const { isSimple } = useLanguage()
  const t = (simple: string, technical: string) => isSimple ? simple : technical

  const features = [
    {
      icon: MessageSquare,
      title: t('Customer Help', 'Customer Support'),
      description: t(
        'Answer customer questions automatically with smart AI.',
        'Resolve inquiries instantly with AI that understands your products and policies.'
      ),
      accent: '#00ffd0',
      details: {
        headline: t('Fast, smart help that grows with you', 'Instant, intelligent support at scale'),
        body: t(
          'Our AI answers common questions, fixes problems, and sends tough ones to your team — all sounding like your brand.',
          'Our AI handles common questions, troubleshoots issues, and escalates complex cases to your team — all while maintaining your brand voice.'
        ),
        stats: [
          { value: '80%', label: t('Questions answered by AI', 'Queries resolved automatically') },
          { value: '< 3s', label: t('Response time', 'Average response time') },
          { value: '24/7', label: t('Always on', 'Always available') },
        ],
        capabilities: [
          t('Answers from your own documents and FAQs', 'RAG-powered knowledge base answers'),
          t('Sends hard questions to your team automatically', 'Smart escalation to human agents'),
          t('Works in 50+ languages', 'Multi-language support (50+ languages)'),
          t('Detects upset customers and prioritizes them', 'Sentiment detection & priority routing'),
          t('Collects customer satisfaction feedback', 'NPS & CSAT feedback collection'),
        ],
      },
    },
    {
      icon: Zap,
      title: t('Auto Sales', 'Sales Automation'),
      description: t(
        'Find good leads, answer their questions, and schedule meetings on autopilot.',
        'Qualify prospects, answer questions, and book demos automatically.'
      ),
      accent: '#ff99b1',
      details: {
        headline: t('Chat your way to more sales', 'Turn conversations into revenue'),
        body: t(
          'Talk to visitors as soon as they arrive, figure out who\'s a good fit, and book meetings right on your calendar.',
          'Engage visitors the moment they land, qualify leads with intelligent questions, and book meetings directly into your calendar.'
        ),
        stats: [
          { value: '3x', label: t('More good leads', 'More qualified leads') },
          { value: '45%', label: t('Faster sales', 'Faster deal cycles') },
          { value: '67%', label: t('Leads become meetings', 'Lead-to-meeting rate') },
        ],
        capabilities: [
          t('Automatically sorts good leads from bad', 'Lead qualification workflows'),
          t('Books meetings on your calendar instantly', 'Calendar integration for instant booking'),
          t('Suggests the right products to customers', 'AI product recommendations'),
          t('Connects to your sales tools (Salesforce, HubSpot, etc.)', 'CRM sync (Salesforce, HubSpot, webhooks)'),
          t('Follows up with leads who went quiet', 'Outbound follow-ups & re-engagement'),
        ],
      },
    },
    {
      icon: Globe,
      title: t('All Messages in One Place', 'Omni-Channel Inbox'),
      description: t(
        'See all your chats from every app in one simple dashboard.',
        'Web, SMS, WhatsApp, Messenger, iMessage, and Voice — all conversations in one place.'
      ),
      accent: '#ffeb99',
      details: {
        headline: t('One inbox for everything', 'One inbox, every channel'),
        body: t(
          'No more jumping between apps. See all your customer chats in one place with the full conversation history.',
          'Stop switching between apps. Manage all customer conversations from a single dashboard with full context and history across every channel.'
        ),
        stats: [
          { value: '6', label: t('Apps connected', 'Channels supported') },
          { value: '100%', label: t('Messages synced', 'Message sync') },
          { value: '0', label: t('Missed chats', 'Missed conversations') },
        ],
        capabilities: [
          t('Chat widget on your website', 'Website chat widget'),
          t('Text messaging (SMS)', 'SMS via Twilio'),
          t('WhatsApp messaging', 'WhatsApp Business API'),
          t('Facebook Messenger', 'Facebook Messenger'),
          t('iMessage for business', 'Apple Messages for Business (iMessage)'),
          t('Phone calls with AI voice', 'Voice AI — phone calls with neural TTS'),
        ],
      },
    },
    {
      icon: BarChart3,
      title: t('Reports & Stats', 'Analytics & Insights'),
      description: t(
        'See how your chatbot is doing and what your customers think.',
        'Track performance, customer sentiment, and team efficiency in real-time.'
      ),
      accent: '#00d4ff',
      details: {
        headline: t('Make smarter choices with real numbers', 'Data-driven decisions'),
        body: t(
          'See what\'s working, find problems, and improve your chatbot with easy-to-read reports.',
          'Understand what drives engagement, identify bottlenecks, and optimize your chatbot performance with actionable insights.'
        ),
        stats: [
          { value: '50+', label: t('Things we track', 'Metrics tracked') },
          { value: 'Real-time', label: t('Live updates', 'Dashboard updates') },
          { value: 'Daily', label: t('Auto reports', 'AI-powered reports') },
        ],
        capabilities: [
          t('See what customers are asking about', 'Conversation analytics'),
          t('Know if customers are happy or frustrated', 'Sentiment analysis'),
          t('Find your busiest times', 'Peak hour identification'),
          t('Track how your team is doing', 'Team performance metrics'),
        ],
      },
    },
    {
      icon: Users,
      title: t('Teamwork', 'Team Collaboration'),
      description: t(
        'Pass chats to your team without losing any info.',
        'Hand off to human agents seamlessly with full conversation context.'
      ),
      accent: '#00ffd0',
      details: {
        headline: t('AI and humans, better together', 'AI + humans, working together'),
        body: t(
          'When a chat needs a real person, your team jumps in with the full story — no one has to repeat themselves.',
          'When conversations need a human touch, your team steps in with complete context — no customer has to repeat themselves.'
        ),
        stats: [
          { value: '< 10s', label: t('Switch time', 'Handoff time') },
          { value: '100%', label: t('Nothing lost', 'Context preserved') },
          { value: '∞', label: t('Unlimited team size', 'Team members') },
        ],
        capabilities: [
          t('Take over a chat with one click', 'One-click conversation takeover'),
          t('Add private notes and tags', 'Internal notes & tagging'),
          t('Auto-assign chats to the right person', 'Assignment rules'),
          t('Get notified in Slack or Teams', 'Slack & Teams notifications'),
        ],
      },
    },
    {
      icon: Clock,
      title: t('Always On', '24/7 Availability'),
      description: t(
        'Help customers anytime, even nights and weekends.',
        'Serve customers around the clock, even when your team is offline.'
      ),
      accent: '#ff99b1',
      details: {
        headline: t('Never miss a customer', 'Never miss an opportunity'),
        body: t(
          'Your AI helper works all day, every day. Catch leads and help customers while you sleep.',
          'Your AI assistant works nights, weekends, and holidays. Capture leads and serve customers while you sleep.'
        ),
        stats: [
          { value: '99.9%', label: t('Always running', 'Uptime SLA') },
          { value: '168', label: t('Hours/week online', 'Hours/week coverage') },
          { value: '40%', label: t('After-hours chats', 'Off-hours inquiries') },
        ],
        capabilities: [
          t('Knows your customer\'s timezone', 'Automatic timezone detection'),
          t('Catches leads after hours', 'After-hours lead capture'),
          t('Sends follow-ups on schedule', 'Scheduled follow-ups'),
          t('Works on holidays too', 'Holiday coverage'),
        ],
      },
    },
  ]

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#00ffd0] text-sm font-medium uppercase tracking-wider mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {t('Everything your business needs', 'Built for every business need')}
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <button
                key={index}
                onClick={() => setSelectedFeature(index)}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300 text-left cursor-pointer"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${feature.accent}15`, color: feature.accent }}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-medium mb-2 group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{feature.description}</p>
                <span
                  className="inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2"
                  style={{ color: feature.accent }}
                >
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Modal */}
      {selectedFeature !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFeature(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0a12] p-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFeature(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            {(() => {
              const feature = features[selectedFeature]
              const Icon = feature.icon
              return (
                <>
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                    style={{ backgroundColor: `${feature.accent}15`, color: feature.accent }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-xl text-white/70 mb-8">{feature.details.headline}</p>
                  <p className="text-white/50 leading-relaxed mb-8">{feature.details.body}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {feature.details.stats.map((stat, i) => (
                      <div
                        key={i}
                        className="text-center p-4 rounded-xl bg-white/[0.02] border border-white/5"
                      >
                        <p className="text-2xl font-semibold" style={{ color: feature.accent }}>
                          {stat.value}
                        </p>
                        <p className="text-xs text-white/40 mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Capabilities */}
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-wider text-white/50 mb-4">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-3">
                      {feature.details.capabilities.map((cap, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <Check className="w-4 h-4 flex-shrink-0" style={{ color: feature.accent }} />
                          <span className="text-white/70">{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div className="mt-8 pt-6 border-t border-white/5">
                    <a
                      href="/signup"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition"
                    >
                      Get Started Free
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </section>
  )
}
