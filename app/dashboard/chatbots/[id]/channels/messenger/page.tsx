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
  Facebook,
  Check,
  AlertCircle,
  ExternalLink,
  Copy,
  Loader2,
  TestTube,
  Link2,
  Info,
} from 'lucide-react'

export default function MessengerChannelPage() {
  const params = useParams()
  const chatbotId = params.id as string

  const [loading, setLoading] = useState(false)
  const [testing, setTesting] = useState(false)
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [copied, setCopied] = useState(false)

  // Form state - Manual setup option
  const [pageAccessToken, setPageAccessToken] = useState('')
  const [pageId, setPageId] = useState('')
  const [appSecret, setAppSecret] = useState('')
  const [verifyToken, setVerifyToken] = useState('')

  // Webhook URL for Facebook Messenger
  const webhookUrl = `${process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://api.leadchat.ai'}/webhooks/messenger/${chatbotId}`

  // Generate random verify token if not set
  const generateVerifyToken = () => {
    const token = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('')
    setVerifyToken(token)
  }

  const handleConnect = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/chatbots/${chatbotId}/channels/messenger`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageAccessToken,
          pageId,
          appSecret,
          verifyToken,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to connect Messenger')
      }

      setConnected(true)
      setSuccess('Messenger channel connected successfully!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect')
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthConnect = () => {
    // Redirect to Facebook OAuth
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID
    const redirectUri = `${window.location.origin}/api/auth/callback/facebook`
    const scope = 'pages_messaging,pages_show_list,pages_manage_metadata'

    window.location.href = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${scope}&state=${chatbotId}`
  }

  const handleTest = async () => {
    setTesting(true)
    setError('')
    setSuccess('')

    try {
      const res = await fetch(`/api/chatbots/${chatbotId}/channels/messenger/test`, {
        method: 'POST',
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Test failed')
      }

      setSuccess('Connection verified! Your Messenger integration is working.')
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

  const copyVerifyToken = () => {
    navigator.clipboard.writeText(verifyToken)
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
          <div className="p-2 bg-blue-100 rounded-lg">
            <Facebook className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Facebook Messenger</h1>
            <p className="text-muted-foreground">
              Connect your Facebook Page to receive Messenger conversations
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
              <p className="font-medium text-green-800">Messenger Channel Connected</p>
              <p className="text-sm text-green-700">
                Your chatbot is ready to receive Messenger messages
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
            <p className="font-medium text-blue-800 mb-2">Requirements</p>
            <ul className="text-blue-700 space-y-1 list-disc list-inside">
              <li>A Facebook Page for your business</li>
              <li>Admin access to the Facebook Page</li>
              <li>A Facebook Developer App with Messenger product enabled</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Quick Connect (OAuth) - Disabled for now as it requires app setup */}
      {/* <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            Quick Connect
          </CardTitle>
          <CardDescription>
            Connect with Facebook to automatically configure Messenger
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleOAuthConnect} className="w-full">
            <Facebook className="mr-2 h-4 w-4" />
            Connect with Facebook
          </Button>
        </CardContent>
      </Card> */}

      {/* Manual Setup */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Configuration</CardTitle>
          <CardDescription>
            Enter your Facebook App credentials. You can find these in your{' '}
            <a
              href="https://developers.facebook.com/apps"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Facebook Developer Console
              <ExternalLink className="inline h-3 w-3 ml-1" />
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pageId">Facebook Page ID</Label>
            <Input
              id="pageId"
              placeholder="123456789012345"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Find this in your Page settings under "Page transparency"
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="pageAccessToken">Page Access Token</Label>
            <Input
              id="pageAccessToken"
              type="password"
              placeholder="Your Page Access Token"
              value={pageAccessToken}
              onChange={(e) => setPageAccessToken(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Generate this in your Facebook App's Messenger settings
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="appSecret">App Secret</Label>
            <Input
              id="appSecret"
              type="password"
              placeholder="Your App Secret"
              value={appSecret}
              onChange={(e) => setAppSecret(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              Found in your Facebook App's Settings → Basic
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="verifyToken">Verify Token</Label>
            <div className="flex gap-2">
              <Input
                id="verifyToken"
                placeholder="Your custom verify token"
                value={verifyToken}
                onChange={(e) => setVerifyToken(e.target.value)}
              />
              <Button variant="outline" onClick={generateVerifyToken} type="button">
                Generate
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              A custom string you'll use when setting up the webhook
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Webhook Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>
            Configure these settings in your Facebook App's Messenger Webhooks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Callback URL</Label>
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

          {verifyToken && (
            <div className="space-y-2">
              <Label>Verify Token (copy this too)</Label>
              <div className="flex gap-2">
                <Input value={verifyToken} readOnly className="font-mono text-sm" />
                <Button variant="outline" size="icon" onClick={copyVerifyToken}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg space-y-2">
            <p className="font-medium text-sm">Setup Instructions:</p>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>Go to Facebook Developers → Your App → Messenger → Settings</li>
              <li>Under "Webhooks", click "Add Callback URL"</li>
              <li>Paste the Callback URL above</li>
              <li>Enter the Verify Token (generate one if you haven't)</li>
              <li>Click "Verify and Save"</li>
              <li>Subscribe to: messages, messaging_postbacks, messaging_optins</li>
              <li>Select your Page under "Subscribed Pages"</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Connect Button */}
      <Button
        onClick={handleConnect}
        disabled={loading || !pageAccessToken || !pageId || !verifyToken}
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
          'Connect Messenger Channel'
        )}
      </Button>

      {/* Test Connection */}
      {connected && (
        <Card>
          <CardHeader>
            <CardTitle>Test Connection</CardTitle>
            <CardDescription>
              Verify your webhook is receiving events correctly
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              onClick={handleTest}
              disabled={testing}
            >
              {testing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube className="mr-2 h-4 w-4" />
                  Test Webhook Connection
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              After testing, send a message to your Page on Messenger to verify end-to-end functionality.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Get Started Button Info */}
      <Card>
        <CardHeader>
          <CardTitle>Optional: Get Started Button</CardTitle>
          <CardDescription>
            Configure a greeting and "Get Started" button for new conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            After connecting, you can set up a "Get Started" button that appears when users first
            open a conversation with your Page. This helps guide users on how to interact with your chatbot.
          </p>
          <Button variant="outline" disabled={!connected}>
            Configure Get Started Button
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
