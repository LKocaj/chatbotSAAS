'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  MessageCircle,
  Check,
  AlertCircle,
  ExternalLink,
  Copy,
  Loader2,
  TestTube,
  Shield,
  Info,
} from 'lucide-react'

export default function WhatsAppChannelPage() {
  const params = useParams()
  const chatbotId = params.id as string

  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [copied, setCopied] = useState(false)

  // Form state
  const [accountSid, setAccountSid] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [whatsappNumber, setWhatsappNumber] = useState('')
  const [testPhone, setTestPhone] = useState('')

  // Webhook URL for Twilio WhatsApp
  const webhookUrl = `${process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://api.leadchat.ai'}/webhooks/twilio/whatsapp/${chatbotId}`

  const handleConnect = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/chatbots/${chatbotId}/channels/whatsapp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          twilioAccountSid: accountSid,
          twilioAuthToken: authToken,
          whatsappNumber,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to connect WhatsApp')
      }

      setConnected(true)
      setSuccess('WhatsApp channel connected successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect')
    } finally {
      setLoading(false)
    }
  }

  const handleTest = async () => {
    if (!testPhone) {
      setError('Please enter a WhatsApp number to test')
      return
    }

    setTesting(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/chatbots/${chatbotId}/channels/whatsapp/test`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: testPhone }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Test failed')
      }

      setSuccess('Test message sent! Check your WhatsApp.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test failed')
    } finally {
      setTesting(false)
    }
  }

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href={`/dashboard/chatbots/${chatbotId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chatbot Settings
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <MessageCircle className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">WhatsApp Integration</h1>
            <p className="text-muted-foreground">
              Connect WhatsApp Business via Twilio
            </p>
          </div>
        </div>
      </div>

      {/* Status */}
      {connected && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="flex items-center gap-3 py-4">
            <Check className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">WhatsApp Channel Connected</p>
              <p className="text-sm text-green-700">
                Your chatbot is ready to receive WhatsApp messages
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error/Success Messages */}
      {error && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <p>{error}</p>
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-100 text-green-800 rounded-lg">
          <Check className="h-5 w-5" />
          <p>{success}</p>
        </div>
      )}

      {/* Requirements Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-start gap-3 py-4">
          <Info className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-800 mb-2">WhatsApp Business Requirements</p>
            <ul className="text-blue-700 space-y-1 list-disc list-inside">
              <li>A verified WhatsApp Business account</li>
              <li>Twilio account with WhatsApp enabled</li>
              <li>Approved WhatsApp sender (phone number)</li>
              <li>Business verification completed with Meta</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Twilio Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>Twilio Credentials</CardTitle>
          <CardDescription>
            Enter your Twilio account credentials. You can find these in your{' '}
            <a
              href="https://console.twilio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Twilio Console
              <ExternalLink className="inline h-3 w-3 ml-1" />
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountSid">Account SID</Label>
            <Input
              id="accountSid"
              placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={accountSid}
              onChange={(e) => setAccountSid(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authToken">Auth Token</Label>
            <Input
              id="authToken"
              type="password"
              placeholder="Your Twilio Auth Token"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsappNumber">WhatsApp Business Number</Label>
            <Input
              id="whatsappNumber"
              placeholder="whatsapp:+1234567890"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Your Twilio WhatsApp-enabled number (include "whatsapp:" prefix)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>
            Configure this webhook URL in your Twilio WhatsApp sandbox or production settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Webhook URL</Label>
            <div className="flex gap-2">
              <Input value={webhookUrl} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={copyWebhook}>
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="font-medium text-sm">Setup Instructions:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Go to Twilio Console → Messaging → Try it out → Send a WhatsApp message</li>
              <li>Or for production: Messaging → Senders → WhatsApp senders</li>
              <li>Select your WhatsApp number</li>
              <li>Under "Endpoint Configuration"</li>
              <li>Set "WHEN A MESSAGE COMES IN" webhook to the URL above</li>
              <li>Set HTTP method to POST</li>
              <li>Save your configuration</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Template Messages Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Template Messages
          </CardTitle>
          <CardDescription>
            WhatsApp requires pre-approved templates for business-initiated messages
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>User-initiated conversations:</strong> When a user messages your chatbot first,
              you have a 24-hour window to respond freely.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Business-initiated messages:</strong> To message users outside the 24-hour window,
              you need approved message templates. Set these up in your{' '}
              <a
                href="https://console.twilio.com/us1/develop/sms/senders/whatsapp-templates"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Twilio Console
                <ExternalLink className="inline h-3 w-3 ml-1" />
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Connect Button */}
      <Button
        onClick={handleConnect}
        disabled={loading || !accountSid || !authToken || !whatsappNumber}
        className="w-full"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Connecting...
          </>
        ) : connected ? (
          <>
            <Check className="mr-2 h-4 w-4" />
            Update Configuration
          </>
        ) : (
          'Connect WhatsApp Channel'
        )}
      </Button>

      {/* Test Connection */}
      {connected && (
        <Card>
          <CardHeader>
            <CardTitle>Test Connection</CardTitle>
            <CardDescription>
              Send a test message to verify everything is working
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testPhone">Your WhatsApp Number</Label>
              <Input
                id="testPhone"
                placeholder="+1234567890"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter without the "whatsapp:" prefix
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleTest}
              disabled={testing || !testPhone}
            >
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <TestTube className="mr-2 h-4 w-4" />
                  Send Test Message
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Sandbox Note */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="flex items-start gap-3 py-4">
          <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-orange-800">Testing with Twilio Sandbox?</p>
            <p className="text-orange-700 mt-1">
              If you're using the Twilio Sandbox for WhatsApp, users must first send "join [your-sandbox-keyword]"
              to +1 415 523 8886 before they can receive messages from your chatbot.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
