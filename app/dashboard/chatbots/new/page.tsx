'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, ArrowRight, Check, Globe, Phone, MessageSquare, Loader2, Apple, Mic } from 'lucide-react'
import { cn } from '@/lib/utils'

const steps = [
  { id: 1, name: 'Basics', description: 'Name and purpose' },
  { id: 2, name: 'Channels', description: 'Where to deploy' },
  { id: 3, name: 'Knowledge', description: 'Train your bot' },
  { id: 4, name: 'Review', description: 'Confirm and create' },
]

const channels = [
  {
    id: 'website',
    name: 'Website Widget',
    description: 'Embed a chat widget on your website',
    icon: Globe,
    available: true,
  },
  {
    id: 'sms',
    name: 'SMS',
    description: 'Text message conversations via Twilio',
    icon: Phone,
    available: true,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    description: 'WhatsApp Business API integration',
    icon: MessageSquare,
    available: true,
  },
  {
    id: 'messenger',
    name: 'Messenger',
    description: 'Facebook Messenger integration',
    icon: MessageSquare,
    available: true,
  },
  {
    id: 'apple_business',
    name: 'iMessage',
    description: 'Apple Messages for Business with rich links & Apple Pay',
    icon: Apple,
    available: true,
  },
  {
    id: 'voice',
    name: 'Voice AI',
    description: 'AI-powered phone calls with neural text-to-speech',
    icon: Mic,
    available: true,
  },
]

export default function CreateChatbotPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    welcomeMessage: "Hi! 👋 I'm here to help. How can I assist you today?",
    channels: ['website'] as string[],
    companyName: '',
    services: '',
    faqs: '',
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleChannel = (channelId: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channelId)
        ? prev.channels.filter((c) => c !== channelId)
        : [...prev.channels, channelId],
    }))
  }

  const handleCreate = async () => {
    setLoading(true)

    try {
      const res = await fetch('/api/chatbots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const data = await res.json()
        router.push(`/dashboard/chatbots/${data.id}`)
      }
    } catch (error) {
      console.error('Failed to create chatbot:', error)
    } finally {
      setLoading(false)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.name.trim().length > 0
      case 2:
        return formData.channels.length > 0
      case 3:
        return true // Knowledge is optional
      case 4:
        return true
      default:
        return false
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/chatbots"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Chatbots
        </Link>
        <h1 className="text-3xl font-bold">Create New Chatbot</h1>
        <p className="text-muted-foreground">
          Set up your AI assistant in a few simple steps
        </p>
      </div>

      {/* Progress Steps */}
      <nav className="mb-8">
        <ol className="flex items-center">
          {steps.map((step, index) => (
            <li key={step.id} className={cn('flex items-center', index < steps.length - 1 && 'flex-1')}>
              <div className="flex items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 font-medium',
                    currentStep > step.id
                      ? 'border-primary bg-primary text-primary-foreground'
                      : currentStep === step.id
                      ? 'border-primary text-primary'
                      : 'border-muted text-muted-foreground'
                  )}
                >
                  {currentStep > step.id ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-3 hidden sm:block">
                  <p className={cn(
                    'text-sm font-medium',
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  )}>
                    {step.name}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-4 h-0.5 flex-1',
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].name}</CardTitle>
          <CardDescription>{steps[currentStep - 1].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basics */}
          {currentStep === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="name">Chatbot Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Support Bot, Lead Assistant"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  This is for your reference only, not shown to visitors
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optional)</Label>
                <Textarea
                  id="description"
                  placeholder="What is this chatbot for?"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="welcomeMessage">Welcome Message</Label>
                <Textarea
                  id="welcomeMessage"
                  placeholder="The first message visitors will see"
                  value={formData.welcomeMessage}
                  onChange={(e) => updateFormData('welcomeMessage', e.target.value)}
                  rows={2}
                />
              </div>
            </>
          )}

          {/* Step 2: Channels */}
          {currentStep === 2 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {channels.map((channel) => {
                const Icon = channel.icon
                const isSelected = formData.channels.includes(channel.id)
                return (
                  <div
                    key={channel.id}
                    onClick={() => toggleChannel(channel.id)}
                    className={cn(
                      'relative flex cursor-pointer items-start space-x-4 rounded-lg border p-4 transition-colors',
                      isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-muted hover:border-muted-foreground/50'
                    )}
                  >
                    <div className={cn(
                      'rounded-lg p-2',
                      isSelected ? 'bg-primary/10' : 'bg-muted'
                    )}>
                      <Icon className={cn(
                        'h-5 w-5',
                        isSelected ? 'text-primary' : 'text-muted-foreground'
                      )} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{channel.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {channel.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="absolute right-4 top-4">
                        <Check className="h-5 w-5 text-primary" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* Step 3: Knowledge */}
          {currentStep === 3 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Your company name"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="services">Services / Products</Label>
                <Textarea
                  id="services"
                  placeholder="Describe what your company offers..."
                  value={formData.services}
                  onChange={(e) => updateFormData('services', e.target.value)}
                  rows={4}
                />
                <p className="text-sm text-muted-foreground">
                  The chatbot will use this to answer questions about your business
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="faqs">Common Questions & Answers</Label>
                <Textarea
                  id="faqs"
                  placeholder="Q: What are your hours?&#10;A: We're open Mon-Fri 9am-5pm&#10;&#10;Q: Do you offer free estimates?&#10;A: Yes, all estimates are free!"
                  value={formData.faqs}
                  onChange={(e) => updateFormData('faqs', e.target.value)}
                  rows={6}
                />
              </div>
            </>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="rounded-lg border p-4 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{formData.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Channels</p>
                  <div className="flex gap-2 mt-1">
                    {formData.channels.map((ch) => (
                      <span key={ch} className="px-2 py-1 bg-muted rounded text-sm capitalize">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Welcome Message</p>
                  <p className="text-sm">{formData.welcomeMessage}</p>
                </div>
                {formData.companyName && (
                  <div>
                    <p className="text-sm text-muted-foreground">Company</p>
                    <p className="font-medium">{formData.companyName}</p>
                  </div>
                )}
              </div>
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  After creating, you'll be able to customize the widget appearance,
                  configure channel integrations, and get your embed code.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {currentStep < 4 ? (
          <Button
            onClick={() => setCurrentStep((s) => s + 1)}
            disabled={!canProceed()}
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Create Chatbot
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
