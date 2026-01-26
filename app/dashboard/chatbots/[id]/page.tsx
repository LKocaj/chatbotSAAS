'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  ArrowLeft,
  Copy,
  Check,
  Globe,
  Phone,
  MessageSquare,
  Palette,
  Code,
  Settings,
  ExternalLink,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock chatbot data
const mockChatbot = {
  id: '1',
  name: 'Website Support Bot',
  status: 'active',
  channels: ['website', 'sms'],
  welcomeMessage: "Hi! 👋 I'm here to help. How can I assist you today?",
  primaryColor: '#3b82f6',
  position: 'bottom-right',
  companyName: 'Acme Inc',
  tenantId: 'tenant_abc123',
}

export default function ChatbotSettingsPage() {
  const params = useParams()
  const [chatbot, setChatbot] = useState(mockChatbot)
  const [copied, setCopied] = useState(false)
  const [saving, setSaving] = useState(false)

  // Widget customization
  const [primaryColor, setPrimaryColor] = useState(mockChatbot.primaryColor)
  const [position, setPosition] = useState<'bottom-right' | 'bottom-left'>('bottom-right')
  const [welcomeMessage, setWelcomeMessage] = useState(mockChatbot.welcomeMessage)

  const widgetUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://api.leadchat.ai'
  const embedCode = `<script src="${widgetUrl}/widget/${chatbot.tenantId}.js" async></script>`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            href="/dashboard/chatbots"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Chatbots
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{chatbot.name}</h1>
            <Badge className="bg-green-100 text-green-800" variant="secondary">
              Active
            </Badge>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="widget" className="space-y-6">
        <TabsList>
          <TabsTrigger value="widget">
            <Palette className="mr-2 h-4 w-4" />
            Widget
          </TabsTrigger>
          <TabsTrigger value="channels">
            <Globe className="mr-2 h-4 w-4" />
            Channels
          </TabsTrigger>
          <TabsTrigger value="knowledge">
            <MessageSquare className="mr-2 h-4 w-4" />
            Knowledge
          </TabsTrigger>
          <TabsTrigger value="embed">
            <Code className="mr-2 h-4 w-4" />
            Embed Code
          </TabsTrigger>
        </TabsList>

        {/* Widget Customization */}
        <TabsContent value="widget" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how your chat widget looks
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex gap-3">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Position</Label>
                  <div className="flex gap-3">
                    <Button
                      variant={position === 'bottom-right' ? 'default' : 'outline'}
                      onClick={() => setPosition('bottom-right')}
                      className="flex-1"
                    >
                      Bottom Right
                    </Button>
                    <Button
                      variant={position === 'bottom-left' ? 'default' : 'outline'}
                      onClick={() => setPosition('bottom-left')}
                      className="flex-1"
                    >
                      Bottom Left
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="welcomeMessage">Welcome Message</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={welcomeMessage}
                    onChange={(e) => setWelcomeMessage(e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your widget will look on your site
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted rounded-lg h-[400px] overflow-hidden">
                  {/* Mock website content */}
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted-foreground/20 rounded w-3/4" />
                    <div className="h-4 bg-muted-foreground/20 rounded w-1/2" />
                    <div className="h-4 bg-muted-foreground/20 rounded w-2/3" />
                  </div>

                  {/* Widget Preview */}
                  <div
                    className={cn(
                      'absolute bottom-4',
                      position === 'bottom-right' ? 'right-4' : 'left-4'
                    )}
                  >
                    {/* Chat bubble button */}
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>

                    {/* Greeting bubble */}
                    <div
                      className={cn(
                        'absolute bottom-16 bg-white rounded-lg shadow-lg p-3 max-w-[200px]',
                        position === 'bottom-right' ? 'right-0' : 'left-0'
                      )}
                    >
                      <p className="text-sm">{welcomeMessage.slice(0, 50)}...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Channels */}
        <TabsContent value="channels" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Website */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Website Widget</CardTitle>
                      <CardDescription>Embed on your website</CardDescription>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800" variant="secondary">
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Copy the embed code from the "Embed Code" tab and paste it into your website.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="#" onClick={() => document.querySelector('[value="embed"]')?.dispatchEvent(new MouseEvent('click'))}>
                    Get Embed Code
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* SMS */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Phone className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">SMS</CardTitle>
                      <CardDescription>Twilio integration</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Not Connected</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your Twilio account to enable SMS conversations.
                </p>
                <Button variant="outline" size="sm">
                  Connect Twilio
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">WhatsApp</CardTitle>
                      <CardDescription>WhatsApp Business API</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Not Connected</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect WhatsApp Business to chat with customers on WhatsApp.
                </p>
                <Button variant="outline" size="sm">
                  Connect WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Messenger */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Messenger</CardTitle>
                      <CardDescription>Facebook Messenger</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">Not Connected</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect your Facebook Page to chat on Messenger.
                </p>
                <Button variant="outline" size="sm">
                  Connect Facebook
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Knowledge Base */}
        <TabsContent value="knowledge" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>
                Train your chatbot with information about your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  defaultValue={chatbot.companyName}
                  placeholder="Your company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services">Services / Products</Label>
                <Textarea
                  id="services"
                  placeholder="Describe what your company offers..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="faqs">FAQs</Label>
                <Textarea
                  id="faqs"
                  placeholder="Add common questions and answers..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Embed Code */}
        <TabsContent value="embed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Embed Code</CardTitle>
              <CardDescription>
                Copy this code and paste it into your website's HTML, just before the closing &lt;/body&gt; tag
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{embedCode}</code>
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Installation Instructions</h4>
                <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                  <li>Copy the embed code above</li>
                  <li>Open your website's HTML file or CMS editor</li>
                  <li>Paste the code just before the closing <code className="bg-blue-100 px-1 rounded">&lt;/body&gt;</code> tag</li>
                  <li>Save and publish your changes</li>
                  <li>The chat widget will appear on your website</li>
                </ol>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <a href={`${widgetUrl}/demo?tenant=${chatbot.tenantId}`} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Test Widget
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
