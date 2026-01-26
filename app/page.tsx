import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MessageSquare, Phone, Globe, Zap, BarChart3, Clock, Check } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <MessageSquare className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">LeadChat</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="#channels" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Channels
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm mb-6">
              <span className="text-primary font-medium">New</span>
              <span className="mx-2 text-muted-foreground">|</span>
              <span className="text-muted-foreground">WhatsApp & Messenger integration now live</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              24/7 AI Chat That
              <span className="text-primary"> Books Appointments</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Deploy intelligent chatbots across Website, SMS, WhatsApp, and Messenger.
              Capture leads and convert visitors into customers automatically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Watch Demo
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required. 14-day free trial.
            </p>
          </div>
        </section>

        {/* Channels Section */}
        <section id="channels" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">One Bot, Every Channel</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Deploy your AI chatbot anywhere your customers are. Same intelligence, consistent experience.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              <div className="flex flex-col items-center p-6 rounded-lg bg-background border">
                <Globe className="h-10 w-10 text-primary mb-3" />
                <span className="font-medium">Website</span>
                <span className="text-sm text-muted-foreground">Widget</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-background border">
                <Phone className="h-10 w-10 text-green-500 mb-3" />
                <span className="font-medium">SMS</span>
                <span className="text-sm text-muted-foreground">Twilio</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-background border">
                <MessageSquare className="h-10 w-10 text-green-600 mb-3" />
                <span className="font-medium">WhatsApp</span>
                <span className="text-sm text-muted-foreground">Business API</span>
              </div>
              <div className="flex flex-col items-center p-6 rounded-lg bg-background border">
                <MessageSquare className="h-10 w-10 text-blue-600 mb-3" />
                <span className="font-medium">Messenger</span>
                <span className="text-sm text-muted-foreground">Meta</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Powerful features to capture, qualify, and convert leads on autopilot.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Instant Responses</CardTitle>
                  <CardDescription>
                    AI-powered responses in under 2 seconds. Never miss a lead, even at 3am.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Lead Qualification</CardTitle>
                  <CardDescription>
                    Automatically score and qualify leads based on conversation context.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Clock className="h-10 w-10 text-primary mb-2" />
                  <CardTitle>Appointment Booking</CardTitle>
                  <CardDescription>
                    Integrate with Calendly, Cal.com, or Google Calendar. Book meetings automatically.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Start free, scale as you grow. No hidden fees.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Starter</CardTitle>
                  <CardDescription>For small businesses getting started</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$99</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>1 chatbot</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Website widget</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>1,000 messages/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Basic analytics</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              {/* Pro Plan */}
              <Card className="border-primary relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For growing businesses</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$249</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>3 chatbots</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>All channels (Web, SMS, WhatsApp)</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>5,000 messages/month</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>CRM integrations</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6">
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              {/* Enterprise Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large teams and agencies</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$499</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Unlimited chatbots</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>All channels + Messenger</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Unlimited messages</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>White-label option</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span>Priority support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Capture More Leads?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join hundreds of businesses using LeadChat to automate conversations and grow revenue.
            </p>
            <Link href="/signup">
              <Button size="lg">Start Your Free Trial</Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="font-bold">LeadChat</span>
            </div>
            <div className="flex space-x-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="mailto:support@leadchat.ai" className="hover:text-foreground">Support</Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              &copy; {new Date().getFullYear()} LeadChat. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
