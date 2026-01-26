import Link from 'next/link'
import { Check } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Hero Section with Gradient */}
      <section className="relative min-h-screen">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-rose-50 to-sky-100" />

        {/* 3D Shape Decoration */}
        <div className="absolute top-20 right-0 w-1/2 h-[500px] opacity-80">
          <div className="relative w-full h-full">
            <div className="absolute top-10 right-20 w-64 h-64 bg-gradient-to-br from-sky-200 to-indigo-300 rounded-[40%_60%_70%_30%/60%_30%_70%_40%] blur-sm" />
            <div className="absolute top-32 right-40 w-48 h-48 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-[50%_50%_40%_60%/40%_60%_50%_50%] blur-sm" />
            <div className="absolute top-20 right-60 w-32 h-32 bg-gradient-to-br from-orange-200 to-rose-300 rounded-full blur-sm" />
          </div>
        </div>

        {/* Navigation */}
        <header className="relative z-10">
          <div className="container mx-auto px-6 py-6 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              LEADCHAT
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-sm font-medium hover:opacity-70 transition">
                Features
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:opacity-70 transition">
                Pricing
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:opacity-70 transition">
                Reviews
              </Link>
            </nav>
            <Link
              href="/signup"
              className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
            >
              Sign me up
            </Link>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pt-20 pb-32">
          <div className="max-w-xl">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Simplify<br />your work
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              AI-powered chatbots meet your business to deliver exceptional results.
            </p>
            <Link
              href="/signup"
              className="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
            >
              Sign me up
            </Link>
          </div>
        </div>

        {/* Subheadline */}
        <div className="relative z-10 container mx-auto px-6 pb-8">
          <p className="text-lg">Your all-in-one, AI-powered chatbot platform</p>
        </div>
      </section>

      {/* At Your Fingertips Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6">
                At your<br />fingertips
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Service has never been faster, better, or more attuned to your needs.
              </p>
              <Link
                href="#features"
                className="inline-block px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
              >
                Tell me more
              </Link>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-300 via-sky-300 to-emerald-200">
              {/* Abstract 3D shapes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-sky-400/50 to-indigo-400/50 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] animate-pulse" />
              </div>
              <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-300/60 to-teal-400/60 rounded-full" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-rose-300/50 to-orange-300/50 rounded-[60%_40%_30%_70%/60%_30%_70%_40%]" />
            </div>
          </div>
        </div>
      </section>

      {/* Gold Standard Service Section */}
      <section id="features" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-16">
            Gold standard service
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mb-24">
            {[
              { title: 'Efficient', subtitle: 'Streamlined to your specifications' },
              { title: 'Effective', subtitle: 'Tailored to your goals' },
              { title: 'Exceptional', subtitle: 'Committed to your success' },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                {/* 3D Icon placeholder */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-sky-200 to-indigo-300 opacity-80" />
                <p className="text-gray-600">{item.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Results Section */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-5xl font-bold tracking-tight leading-tight mb-6">
                Results in<br />minutes
              </h3>
              <p className="text-lg text-gray-600">
                Our platform does the heavy lifting, so you can do the heavy thinking.
                Automate execution, but stay in full control of strategy.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-sm border">
              {/* Simple Chart */}
              <div className="flex items-center gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-400" />
                  <span>With LeadChat Pro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-sky-400" />
                  <span>With LeadChat Basic</span>
                </div>
              </div>
              <div className="flex items-end justify-between h-48 gap-4">
                {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter, i) => (
                  <div key={quarter} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex gap-1 items-end h-32">
                      <div
                        className="flex-1 bg-orange-400 rounded-t"
                        style={{ height: `${40 + i * 20}%` }}
                      />
                      <div
                        className="flex-1 bg-sky-400 rounded-t"
                        style={{ height: `${30 + i * 15}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{quarter}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500 mt-4">Lead conversion rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Service<br />packages
            </h2>
            <div className="space-y-4">
              {[
                { name: 'Basic Package', price: '$99', features: ['1 chatbot', 'Website widget only', '1,000 messages/month'] },
                { name: 'Full Package', price: '$249', features: ['3 chatbots', 'All channels', '5,000 messages/month'] },
                { name: 'Enterprise Deal', price: '$499', features: ['Unlimited chatbots', 'White-label option', 'Priority support'] },
              ].map((plan) => (
                <div key={plan.name} className="bg-gray-50 rounded-2xl p-6 flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{plan.name}</h3>
                    <ul className="space-y-1">
                      {plan.features.map((feature) => (
                        <li key={feature} className="text-sm text-gray-600 flex items-center gap-2">
                          <span className="w-1 h-1 bg-gray-400 rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="text-xl font-semibold">{plan.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-16">
            Why teams choose us
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: 'This platform completely changed the way I work.',
                name: 'Elina Mudiraj',
                role: 'Marketing executive',
              },
              {
                quote: 'The platform does the work. It syncs everything to my files.',
                name: 'Talia Gorski',
                role: 'Solopreneur',
              },
              {
                quote: "Our team's close rate went up within the first month.",
                name: 'Jarrold Müller',
                role: 'Startup CEO',
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <p className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient */}
      <section className="relative py-32">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-rose-50 to-sky-100" />

        {/* 3D Shape Decorations */}
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-60">
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-sky-200 to-indigo-200 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-sm" />
        </div>

        <div className="relative z-10 container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Ready to change<br />the way you work?
            </h2>
            <Link
              href="/signup"
              className="px-8 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition whitespace-nowrap"
            >
              Sign me up
            </Link>
          </div>
        </div>
      </section>

      {/* See It In Action Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <h3 className="text-4xl font-bold tracking-tight">See it in action</h3>
            <div className="flex gap-4">
              <Link
                href="#features"
                className="px-6 py-2.5 border-2 border-black text-sm font-medium rounded-full hover:bg-gray-100 transition"
              >
                Explore our services
              </Link>
              <Link
                href="/signup"
                className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition"
              >
                Sign me up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-gradient-to-br from-orange-50 via-rose-50 to-sky-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-2xl font-bold tracking-tight mb-4">LEADCHAT</h4>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Address</h5>
              <p className="text-sm text-gray-600">
                123 Anywhere St.<br />
                Any City, State<br />
                Any Country<br />
                (123) 456 7890
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Social media</h5>
              <div className="space-y-2 text-sm text-gray-600">
                <p>Facebook</p>
                <p>Instagram</p>
                <p>TikTok</p>
              </div>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Email us</h5>
              <p className="text-sm text-gray-600">hello@leadchat.ai</p>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} LeadChat. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
