'use client'

import { useState } from 'react'
import { X, HelpCircle, ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/providers/language-provider'

export function FAQSection() {
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null)
  const { isSimple } = useLanguage()
  const t = (simple: string, technical: string) => isSimple ? simple : technical

  const faqs = [
    {
      q: t('How fast can I get started?', 'How long does setup take?'),
      a: t(
        'Most people get going in under 30 minutes. Just add a small piece of code to your website and set up your chatbot.',
        'Most customers are up and running in under 30 minutes. Just add our widget code to your site and configure your chatbot.'
      ),
      details: {
        headline: t('Super easy to get started', 'Quick and painless onboarding'),
        steps: [
          t('Create an account and your first chatbot', 'Sign up and create your first chatbot'),
          t('Make it look and sound like your brand', 'Customize appearance and responses'),
          t('Paste the code into your website', 'Copy the embed code to your website'),
          t('You\'re live! Start chatting with visitors', 'Go live and start engaging visitors'),
        ],
      },
    },
    {
      q: t('Can I control what the chatbot says?', 'Can I customize the chatbot responses?'),
      a: t(
        'Yes! You teach the AI about your business, products, and how you talk. It learns from what you give it.',
        'Yes! You can train the AI on your specific products, services, FAQs, and brand voice. The bot learns from your knowledge base.'
      ),
      details: {
        headline: t('You\'re in charge of your AI', 'Full control over your AI assistant'),
        steps: [
          t('Add your documents, FAQs, and product details', 'Upload documents, FAQs, and product info'),
          t('Tell it how your brand speaks', 'Define your brand voice and tone'),
          t('Build custom chat flows', 'Set up custom conversation flows'),
          t('Keep improving it over time', 'Review and refine responses over time'),
        ],
      },
    },
    {
      q: t('Where can my chatbot talk to people?', 'What channels are supported?'),
      a: t(
        'Your website, text messages, WhatsApp, and Facebook Messenger — all from one screen.',
        'We support website chat widgets, SMS, WhatsApp Business, and Facebook Messenger — all managed from one dashboard.'
      ),
      details: {
        headline: t('Be wherever your customers are', 'Meet customers where they are'),
        steps: [
          t('Chat bubble on your website', 'Website chat widget with custom styling'),
          t('Text message support (SMS)', 'SMS integration for text-based support'),
          t('WhatsApp messaging', 'WhatsApp Business API connection'),
          t('Facebook Messenger', 'Facebook Messenger integration'),
        ],
      },
    },
    {
      q: t('Can I try it for free?', 'Is there a free trial?'),
      a: t(
        'Yes! Try everything free for 14 days. No credit card needed.',
        'Yes, all plans include a 14-day free trial with full access to features. No credit card required.'
      ),
      details: {
        headline: t('Try it free, no strings attached', 'Try everything risk-free'),
        steps: [
          t('14 days with all features unlocked', '14 days of full feature access'),
          t('No credit card needed to sign up', 'No credit card required to start'),
          t('Make as many chatbots as you want', 'Unlimited chatbots during trial'),
          t('We\'re here to help the whole time', 'Full support from our team'),
        ],
      },
    },
  ]

  return (
    <section id="faq" className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-4">FAQ</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            {t('Got questions?', 'Common questions')}
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelectedFAQ(index)}
              className="w-full text-left p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-200 group cursor-pointer"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-5 h-5 text-[#00d4ff]" />
                  </div>
                  <h3 className="font-medium">{item.q}</h3>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedFAQ !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFAQ(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Modal Content */}
          <div
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0a12] p-8 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedFAQ(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content */}
            {(() => {
              const faq = faqs[selectedFAQ]
              return (
                <>
                  <div className="w-14 h-14 rounded-2xl bg-[#00d4ff]/10 flex items-center justify-center mb-6">
                    <HelpCircle className="w-7 h-7 text-[#00d4ff]" />
                  </div>

                  <h3 className="text-2xl font-semibold mb-2">{faq.q}</h3>
                  <p className="text-xl text-white/70 mb-6">{faq.details.headline}</p>
                  <p className="text-white/50 leading-relaxed mb-8">{faq.a}</p>

                  {/* Steps/Details */}
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-wider text-white/50 mb-4">
                      What you get
                    </h4>
                    <ul className="space-y-3">
                      {faq.details.steps.map((step, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#00d4ff]/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-[#00d4ff]">{i + 1}</span>
                          </div>
                          <span className="text-white/70">{step}</span>
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
