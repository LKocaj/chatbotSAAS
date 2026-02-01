'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Mic, Copy, Check, Info, Phone } from 'lucide-react'

const VOICE_OPTIONS = [
  { value: 'Google.en-US-Neural2-F', label: 'Female (US English) — Neural2' },
  { value: 'Google.en-US-Neural2-D', label: 'Male (US English) — Neural2' },
  { value: 'Google.en-GB-Neural2-F', label: 'Female (British English) — Neural2' },
  { value: 'Google.en-GB-Neural2-D', label: 'Male (British English) — Neural2' },
  { value: 'Google.es-US-Neural2-A', label: 'Female (Spanish US) — Neural2' },
  { value: 'Google.fr-FR-Neural2-A', label: 'Female (French) — Neural2' },
]

export default function VoiceChannelPage() {
  const params = useParams()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const [accountSid, setAccountSid] = useState('')
  const [authToken, setAuthToken] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [ttsVoice, setTtsVoice] = useState('Google.en-US-Neural2-F')
  const [transferNumber, setTransferNumber] = useState('')

  const webhookUrl = `${process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://api.leadchat.ai'}/webhooks/voice/inbound/${params.id}`

  const copyWebhookUrl = () => {
    navigator.clipboard.writeText(webhookUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // TODO: Call chatbotApi.configureVoiceChannel()
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
          <Mic className="h-8 w-8 text-purple-600" />
          <div>
            <h1 className="text-3xl font-bold">Voice AI Configuration</h1>
            <p className="text-muted-foreground">AI-powered phone conversations</p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <CardTitle className="text-purple-900 flex items-center gap-2">
            <Info className="h-5 w-5" />
            How Voice AI Works
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-purple-800 space-y-2">
          <p>Voice AI handles phone calls using the same AI brain as your chatbot. When someone calls your number:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li>Twilio answers and greets the caller with your welcome message</li>
            <li>The caller speaks — Twilio transcribes speech to text in real-time</li>
            <li>Your AI chatbot generates a response</li>
            <li>The response is spoken back using neural text-to-speech</li>
            <li>If they ask for a human, the call is transferred to your team</li>
          </ol>
          <p className="font-medium mt-2">Features: Lead capture via voice, appointment booking, real-time transcription, multilingual support, human handoff with call transfer.</p>
        </CardContent>
      </Card>

      {/* Webhook URL */}
      <Card>
        <CardHeader>
          <CardTitle>Voice Webhook URL</CardTitle>
          <CardDescription>
            Set this as the "A Call Comes In" webhook URL for your Twilio phone number
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={webhookUrl} readOnly className="font-mono text-sm" />
            <Button variant="outline" onClick={copyWebhookUrl}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            In Twilio Console → Phone Numbers → Your Number → Voice & Fax → "A Call Comes In" → Webhook → paste this URL
          </p>
        </CardContent>
      </Card>

      {/* Twilio Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>Twilio Voice Credentials</CardTitle>
          <CardDescription>
            Enter your Twilio account details for voice calling
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accountSid">Account SID</Label>
            <Input
              id="accountSid"
              value={accountSid}
              onChange={(e) => setAccountSid(e.target.value)}
              placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="authToken">Auth Token</Label>
            <Input
              id="authToken"
              type="password"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              placeholder="Your Twilio auth token"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Twilio Phone Number</Label>
            <Input
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1234567890"
            />
            <p className="text-xs text-muted-foreground">Must be a Twilio number with voice capabilities</p>
          </div>
        </CardContent>
      </Card>

      {/* Voice Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Voice Settings</CardTitle>
          <CardDescription>
            Customize how your AI sounds on the phone
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ttsVoice">AI Voice</Label>
            <select
              id="ttsVoice"
              value={ttsVoice}
              onChange={(e) => setTtsVoice(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {VOICE_OPTIONS.map((v) => (
                <option key={v.value} value={v.value}>{v.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="transferNumber">Human Handoff Number</Label>
            <Input
              id="transferNumber"
              value={transferNumber}
              onChange={(e) => setTransferNumber(e.target.value)}
              placeholder="+1234567890"
            />
            <p className="text-xs text-muted-foreground">
              When a caller asks for a human, the call will be transferred to this number
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={saving || !accountSid || !authToken || !phoneNumber}>
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save & Enable Voice AI'}
        </Button>
      </div>
    </div>
  )
}
