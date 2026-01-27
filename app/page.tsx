import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { FAQSection } from '@/components/landing/FAQSection'
import { ChatWidget } from '@/components/landing/ChatWidget'

function Stars() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Static stars layer 1 - small */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1px 1px at 20px 30px, white, transparent),
            radial-gradient(1px 1px at 40px 70px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 50px 160px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 90px 40px, white, transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 160px 120px, white, transparent),
            radial-gradient(1px 1px at 200px 50px, rgba(255,255,255,0.5), transparent),
            radial-gradient(1px 1px at 220px 150px, white, transparent),
            radial-gradient(1px 1px at 270px 90px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1px 1px at 300px 200px, white, transparent),
            radial-gradient(1px 1px at 350px 60px, rgba(255,255,255,0.6), transparent),
            radial-gradient(1px 1px at 400px 130px, white, transparent),
            radial-gradient(1px 1px at 450px 30px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1px 1px at 500px 180px, white, transparent),
            radial-gradient(1px 1px at 550px 100px, rgba(255,255,255,0.5), transparent)
          `,
          backgroundSize: '600px 250px',
        }}
      />
      {/* Static stars layer 2 - medium */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1.5px 1.5px at 100px 200px, white, transparent),
            radial-gradient(1.5px 1.5px at 250px 50px, rgba(255,255,255,0.9), transparent),
            radial-gradient(1.5px 1.5px at 400px 150px, white, transparent),
            radial-gradient(1.5px 1.5px at 550px 250px, rgba(255,255,255,0.8), transparent),
            radial-gradient(1.5px 1.5px at 700px 100px, white, transparent),
            radial-gradient(1.5px 1.5px at 150px 350px, rgba(255,255,255,0.7), transparent),
            radial-gradient(1.5px 1.5px at 350px 300px, white, transparent),
            radial-gradient(1.5px 1.5px at 600px 50px, rgba(255,255,255,0.9), transparent)
          `,
          backgroundSize: '800px 400px',
        }}
      />
      {/* Twinkling stars */}
      <div
        className="absolute inset-0 animate-pulse"
        style={{
          background: `
            radial-gradient(2px 2px at 75px 100px, #00ffd0, transparent),
            radial-gradient(2px 2px at 300px 300px, #ff99b1, transparent),
            radial-gradient(2px 2px at 500px 80px, #ffeb99, transparent),
            radial-gradient(2px 2px at 180px 400px, #00d4ff, transparent),
            radial-gradient(2px 2px at 650px 200px, white, transparent),
            radial-gradient(2px 2px at 420px 450px, #00ffd0, transparent)
          `,
          backgroundSize: '800px 550px',
          animation: 'twinkle 4s ease-in-out infinite',
        }}
      />
      {/* Shooting star (optional subtle touch) */}
      <div
        className="absolute w-[100px] h-[1px] bg-gradient-to-r from-white to-transparent opacity-0"
        style={{
          top: '15%',
          left: '20%',
          transform: 'rotate(-45deg)',
          animation: 'shootingStar 8s ease-in-out infinite',
        }}
      />
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0a0a12] via-[#050510] to-[#030308] text-white overflow-x-hidden">
      {/* Starry background */}
      <Stars />

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-[#0a0a12]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            OnCall Chat
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-white/60 hover:text-white transition">
              Features
            </Link>
            <Link href="#pricing" className="text-sm text-white/60 hover:text-white transition">
              Pricing
            </Link>
            <Link href="#faq" className="text-sm text-white/60 hover:text-white transition">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm text-white/70 hover:text-white transition"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Nebula glows - softer, cozy colors */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#4a3f8a]/15 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-[#2a5298]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-[400px] h-[400px] bg-[#614385]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#00ffd0] animate-pulse" />
              <span className="text-sm text-white/70">AI Chat That Converts</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
              Your AI team,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ffd0] via-[#00d4ff] to-[#00ffd0]">
                everywhere at once
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
              Deploy intelligent chatbots across web, SMS, WhatsApp, and Messenger. Support customers, close sales, and automate workflows — all from one platform.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition flex items-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#features"
                className="px-8 py-4 text-white/70 font-medium hover:text-white transition"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Stats Row */}
          <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '500K+', label: 'Conversations handled', color: 'text-[#00ffd0]' },
              { value: '4', label: 'Channels supported', color: 'text-[#ff99b1]' },
              { value: '< 1s', label: 'Response time', color: 'text-[#ffeb99]' },
              { value: '24/7', label: 'Always available', color: 'text-[#00d4ff]' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                <p className={`text-3xl md:text-4xl font-semibold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-white/40 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeaturesSection />

      {/* Why Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2a5298]/5 to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#00d4ff] text-sm font-medium uppercase tracking-wider mb-4">Why OnCall Chat</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              The numbers speak for themselves
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stat: '67%',
                label: 'of consumers prefer chatbots for quick answers',
                color: '#00ffd0',
              },
              {
                stat: '30%',
                label: 'reduction in customer service costs',
                color: '#ff99b1',
              },
              {
                stat: '3x',
                label: 'faster response times vs. human-only support',
                color: '#ffeb99',
              },
              {
                stat: '24/7',
                label: 'availability without adding headcount',
                color: '#00d4ff',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center"
              >
                <p
                  className="text-4xl md:text-5xl font-bold mb-3"
                  style={{ color: item.color }}
                >
                  {item.stat}
                </p>
                <p className="text-white/50 text-sm leading-relaxed">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '💰',
                title: 'Increase Revenue',
                description: 'Capture leads 24/7, qualify prospects instantly, and book appointments while you sleep.',
              },
              {
                icon: '⚡',
                title: 'Boost Productivity',
                description: 'Free your team from repetitive questions. Let AI handle the FAQs so humans can focus on high-value work.',
              },
              {
                icon: '😊',
                title: 'Happier Customers',
                description: 'Instant responses, no hold times, consistent answers. Customers get help when they need it.',
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-white/40 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 relative overflow-hidden">
        {/* Background gradient - subtle purple glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#614385]/5 to-transparent pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#ff99b1] text-sm font-medium uppercase tracking-wider mb-4">How It Works</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Up and running in minutes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Connect',
                description: 'Add the widget to your site or connect SMS, WhatsApp, and Messenger.',
                color: '#00ffd0',
              },
              {
                step: '02',
                title: 'Train',
                description: 'Upload your knowledge base — FAQs, product info, policies, and more.',
                color: '#ff99b1',
              },
              {
                step: '03',
                title: 'Automate',
                description: 'Let AI handle support, sales, and scheduling across every channel.',
                color: '#ffeb99',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <span
                  className="text-6xl font-bold opacity-20"
                  style={{ color: item.color }}
                >
                  {item.step}
                </span>
                <h3 className="text-xl font-medium mt-4 mb-2">{item.title}</h3>
                <p className="text-white/40 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-[#ffeb99] text-sm font-medium uppercase tracking-wider mb-4">Pricing</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              Simple, predictable pricing
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$99',
                description: 'For small businesses',
                features: ['1 chatbot', 'Website widget', '1,000 messages/mo', 'Email support'],
                accent: '#00ffd0',
                popular: false,
              },
              {
                name: 'Professional',
                price: '$249',
                description: 'For growing teams',
                features: ['3 chatbots', 'All channels', '5,000 messages/mo', 'Priority support', 'Analytics'],
                accent: '#ff99b1',
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '$499',
                description: 'For organizations',
                features: ['Unlimited chatbots', 'White-label', 'Unlimited messages', 'Dedicated support', 'Custom integrations'],
                accent: '#ffeb99',
                popular: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border ${
                  plan.popular
                    ? 'bg-white/[0.03] border-white/10'
                    : 'bg-white/[0.01] border-white/5'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="px-3 py-1 text-xs font-medium rounded-full text-black"
                      style={{ backgroundColor: plan.accent }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-semibold">{plan.price}</span>
                  <span className="text-white/40">/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="w-4 h-4" style={{ color: plan.accent }} />
                      <span className="text-white/60 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/signup"
                  className={`block w-full py-3 text-center text-sm font-medium rounded-full transition ${
                    plan.popular
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Gradient background - aurora-like */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#4a3f8a]/30 via-[#2a5298]/20 to-[#614385]/30" />
            <div className="absolute inset-0 bg-[#0a0a12]/70" />

            <div className="relative px-8 py-16 md:px-16 md:py-24 text-center">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6">
                Ready to transform your customer experience?
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto mb-10">
                Join thousands of businesses using OnCall Chat to automate support, boost sales, and delight customers 24/7.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-white/90 transition"
              >
                Start Your Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-lg font-semibold">
                OnCall Chat
              </Link>
              <div className="hidden md:flex items-center gap-6 text-sm text-white/40">
                <Link href="#features" className="hover:text-white transition">Features</Link>
                <Link href="#pricing" className="hover:text-white transition">Pricing</Link>
                <Link href="#faq" className="hover:text-white transition">FAQ</Link>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/privacy" className="hover:text-white transition">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
              <span>© {new Date().getFullYear()} OnCall Chat</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Live Chat Widget Demo */}
      <ChatWidget />
    </div>
  )
}
