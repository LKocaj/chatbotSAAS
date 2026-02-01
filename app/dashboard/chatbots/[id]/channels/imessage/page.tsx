'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Apple, ExternalLink, Copy, Check, Info } from 'lucide-react'

export default function IMessageChannelPage() {
  const params = useParams()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const [apiUrl, setApiUrl] = useState('')
  const [apiToken, setApiToken] = useState('')
  const [businessId, setBusinessId] = useState('')
  const [webhookSecret, setWebhookSecret] = useState('')

  const webhookUrl = `${process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://api.leadchat.ai'}/webhooks/apple/messages/${params.id}`

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // TODO: Call chatbotApi.configureAppleBusinessChannel()
      await new Promise((r) => setTimeout(r, 1000))
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href={`/dashboard/chatbots/${params.id}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chatbot Settings
        </Link>
        <div className="flex items-center gap-3">
          <Apple className="h-8 w-8" />
          <div>
            <h1 className="text-3xl font-bold">iMessage Configuration</h1>
            <p className="text-muted-foreground">Apple Messages for Business</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-blue-900 flex items-center gap-2">
            <Info className="h-5 w-5" />
            How Apple Messages for Business Works
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-800 space-y-2">
          <p>Apple Messages for Business lets customers reach you directly through iMessage from Search, Maps, Safari, and Siri on any Apple device.</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Register at <a href="https://register.apple.com/business-chat" target="_blank" rel="noopener noreferrer" className="underline">Apple Business Register</a></li>
            <li>Choose a Messaging Service Provider (MSP) like Sinch, Zendesk, or LivePerson</li>
            <li>Get your API credentials from the MSP</li>
            <li>Enter them below and paste our webhook URL into your MSP dashboard</li>
          </ol>
          <p className="font-medium mt-2">Supported features: Rich links, list pickers, time pickers (appointment booking), Apple Pay, typing indicators, and read receipts.</p>
        </CardContent>
      </Card>

      {/* Webhook URL */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook URL</CardTitle>
          <CardDescription>
            Configure this URL in your MSP dashboard to receive incoming iMessages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={webhookUrl} readOnly className="font-mono text-sm" />
            <Button variant="outline" onClick={copyWebhookUrl}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>MSP API Credentials</CardTitle>
          <CardDescription>
            Enter the credentials from your Apple Messages for Business MSP
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="apiUrl">API URL</Label>
            <Input
              id="apiUrl"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="https://api.your-msp.com/v1"
            />
            <p className="text-xs text-muted-foreground">The base URL for your MSP's messaging API</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="apiToken">API Token</Label>
            <Input
              id="apiToken"
              type="password"
              value={apiToken}
              onChange={(e) => setApiToken(e.target.value)}
              placeholder="Bearer token from your MSP"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessId">Business ID</Label>
            <Input
              id="businessId"
              value={businessId}
              onChange={(e) => setBusinessId(e.target.value)}
              placeholder="Your Apple Business Chat ID"
            />
            <p className="text-xs text-muted-foreground">Found in your Apple Business Register dashboard</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="webhookSecret">Webhook Secret (Optional)</Label>
            <Input
              id="webhookSecret"
              type="password"
              value={webhookSecret}
              onChange={(e) => setWebhookSecret(e.target.value)}
              placeholder="For webhook signature verification"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={saving || !apiUrl || !apiToken || !businessId}>
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save & Enable iMessage'}
            </Button>
            <Button variant="outline" asChild>
              <a href="https://register.apple.com/business-chat" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Apple Business Register
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
