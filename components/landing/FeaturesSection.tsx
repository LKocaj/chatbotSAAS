'use client'

import { useState } from 'react'
import { MessageSquare, Zap, Globe, BarChart3, Users, Clock, X, ArrowRight, Check } from 'lucide-react'

const features = [
  {
    icon: MessageSquare,
    title: 'Customer Support',
    description: 'Resolve inquiries instantly with AI that understands your products and policies.',
    accent: '#00ffd0',
    details: {
      headline: 'Instant, intelligent support at scale',
      body: 'Our AI handles common questions, troubleshoots issues, and escalates complex cases to your team — all while maintaining your brand voice.',
      stats: [
        { value: '80%', label: 'Queries resolved automatically' },
        { value: '< 3s', label: 'Average response time' },
        { value: '24/7', label: 'Always available' },
      ],
      capabilities: [
        'RAG-powered knowledge base answers',
        'Smart escalation to human agents',
        'Multi-language support (50+ languages)',
        'Sentiment detection & priority routing',
        'NPS & CSAT feedback collection',
      ],
    },
  },
  {
    icon: Zap,
    title: 'Sales Automation',
    description: 'Qualify prospects, answer questions, and book demos automatically.',
    accent: '#ff99b1',
    details: {
      headline: 'Turn conversations into revenue',
      body: 'Engage visitors the moment they land, qualify leads with intelligent questions, and book meetings directly into your calendar.',
      stats: [
        { value: '3x', label: 'More qualified leads' },
        { value: '45%', label: 'Faster deal cycles' },
        { value: '67%', label: 'Lead-to-meeting rate' },
      ],
      capabilities: [
        'Lead qualification workflows',
        'Calendar integration for instant booking',
        'AI product recommendations',
        'CRM sync (Salesforce, HubSpot, webhooks)',
        'Outbound follow-ups & re-engagement',
      ],
    },
  },
  {
    icon: Globe,
    title: 'Omni-Channel Inbox',
    description: 'Web, SMS, WhatsApp, Messenger, iMessage, and Voice — all conversations in one place.',
    accent: '#ffeb99',
    details: {
      headline: 'One inbox, every channel',
      body: 'Stop switching between apps. Manage all customer conversations from a single dashboard with full context and history across every channel.',
      stats: [
        { value: '6', label: 'Channels supported' },
        { value: '100%', label: 'Message sync' },
        { value: '0', label: 'Missed conversations' },
      ],
      capabilities: [
        'Website chat widget',
        'SMS via Twilio',
        'WhatsApp Business API',
        'Facebook Messenger',
        'Apple Messages for Business (iMessage)',
        'Voice AI — phone calls with neural TTS',
      ],
    },
  },
  {
    icon: BarChart3,
    title: 'Analytics & Insights',
    description: 'Track performance, customer sentiment, and team efficiency in real-time.',
    accent: '#00d4ff',
    details: {
      headline: 'Data-driven decisions',
      body: 'Understand what drives engagement, identify bottlenecks, and optimize your chatbot performance with actionable insights.',
      stats: [
        { value: '50+', label: 'Metrics tracked' },
        { value: 'Real-time', label: 'Dashboard updates' },
        { value: 'Daily', label: 'AI-powered reports' },
      ],
      capabilities: [
        'Conversation analytics',
        'Sentiment analysis',
        'Peak hour identification',
        'Team performance metrics',
      ],
    },
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Hand off to human agents seamlessly with full conversation context.',
    accent: '#00ffd0',
    details: {
      headline: 'AI + humans, working together',
      body: 'When conversations need a human touch, your team steps in with complete context — no customer has to repeat themselves.',
      stats: [
        { value: '< 10s', label: 'Handoff time' },
        { value: '100%', label: 'Context preserved' },
        { value: '∞', label: 'Team members' },
      ],
      capabilities: [
        'One-click conversation takeover',
        'Internal notes & tagging',
        'Assignment rules',
        'Slack & Teams notifications',
      ],
    },
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Serve customers around the clock, even when your team is offline.',
    accent: '#ff99b1',
    details: {
      headline: 'Never miss an opportunity',
      body: 'Your AI assistant works nights, weekends, and holidays. Capture leads and serve customers while you sleep.',
      stats: [
        { value: '99.9%', label: 'Uptime SLA' },
        { value: '168', label: 'Hours/week coverage' },
        { value: '40%', label: 'Off-hours inquiries' },
      ],
      capabilities: [
        'Automatic timezone detection',
        'After-hours lead capture',
        'Scheduled follow-ups',
        'Holiday coverage',
      ],
    },
  },
]

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)

  return (
    <section id="features" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#00ffd0] text-sm font-medium uppercase tracking-wider mb-4">Features</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Built for every business need
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
