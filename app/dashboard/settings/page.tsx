'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  User,
  Building2,
  CreditCard,
  Key,
  Bell,
  Shield,
  Loader2,
  Check,
  ExternalLink,
  Plug,
} from 'lucide-react'

// Mock billing data
const currentPlan = {
  name: 'Pro',
  price: 249,
  interval: 'month',
  features: ['3 chatbots', 'All channels', '5,000 messages/month', 'Advanced analytics'],
  usage: {
    chatbots: { used: 2, limit: 3 },
    messages: { used: 3247, limit: 5000 },
  },
}

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: 99,
    features: ['1 chatbot', 'Website widget', '1,000 messages/month', 'Basic analytics'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 249,
    popular: true,
    features: ['3 chatbots', 'All channels', '5,000 messages/month', 'Advanced analytics', 'CRM integrations'],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 499,
    features: ['Unlimited chatbots', 'All channels', 'Unlimited messages', 'White-label', 'Priority support'],
  },
]

export default function SettingsPage() {
  const { data: session } = useSession()
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  // Profile state
  const [name, setName] = useState(session?.user?.name || '')
  const [email, setEmail] = useState(session?.user?.email || '')

  // Organization state
  const [orgName, setOrgName] = useState('My Workspace')

  const handleSaveProfile = async () => {
    setSaving(true)
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    setSuccess('Profile updated successfully')
    setTimeout(() => setSuccess(''), 3000)
  }

  const handleManageBilling = async () => {
    // Redirect to Stripe Customer Portal
    const res = await fetch('/api/billing/portal', { method: 'POST' })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, organization, and billing
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="organization">
            <Building2 className="mr-2 h-4 w-4" />
            Organization
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Plug className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {success && (
                <div className="flex items-center gap-2 p-3 bg-green-100 text-green-800 rounded-lg">
                  <Check className="h-4 w-4" />
                  {success}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveProfile} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <Button variant="outline">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Organization Tab */}
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Details</CardTitle>
              <CardDescription>
                Manage your organization settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input
                  id="orgName"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage who has access to your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{session?.user?.name || 'You'}</p>
                      <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                    </div>
                  </div>
                  <Badge>Owner</Badge>
                </div>
                <Button variant="outline">
                  Invite Team Member
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    You are currently on the {currentPlan.name} plan
                  </CardDescription>
                </div>
                <Badge className="text-lg px-4 py-1">
                  ${currentPlan.price}/month
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Usage */}
              <div className="space-y-4">
                <h4 className="font-medium">Usage This Month</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Chatbots</span>
                      <span>{currentPlan.usage.chatbots.used} / {currentPlan.usage.chatbots.limit}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${(currentPlan.usage.chatbots.used / currentPlan.usage.chatbots.limit) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Messages</span>
                      <span>{currentPlan.usage.messages.used.toLocaleString()} / {currentPlan.usage.messages.limit.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{
                          width: `${(currentPlan.usage.messages.used / currentPlan.usage.messages.limit) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleManageBilling}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Manage Billing
                </Button>
                <Button variant="outline">
                  View Invoices
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Available Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Available Plans</CardTitle>
              <CardDescription>
                Choose the plan that best fits your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg border p-6 ${
                      plan.popular ? 'border-primary' : ''
                    } ${currentPlan.name === plan.name ? 'bg-muted/50' : ''}`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">
                        Most Popular
                      </Badge>
                    )}
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-3xl font-bold mt-2">
                        ${plan.price}
                        <span className="text-sm font-normal text-muted-foreground">/month</span>
                      </p>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-600 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {currentPlan.name === plan.name ? (
                      <Button variant="outline" className="w-full" disabled>
                        Current Plan
                      </Button>
                    ) : (
                      <Button
                        variant={plan.popular ? 'default' : 'outline'}
                        className="w-full"
                      >
                        {plan.price > currentPlan.price ? 'Upgrade' : 'Downgrade'}
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>CRM Integrations</CardTitle>
              <CardDescription>
                Automatically sync captured leads to your CRM
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'hubspot', name: 'HubSpot', description: 'Sync leads as contacts and create deals automatically', connected: false },
                { id: 'salesforce', name: 'Salesforce', description: 'Create leads and opportunities in Salesforce', connected: false },
                { id: 'webhook', name: 'Custom Webhook', description: 'Send lead data to any URL via webhook', connected: false },
              ].map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                  <Button variant={integration.connected ? 'outline' : 'default'} size="sm">
                    {integration.connected ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Channels</CardTitle>
              <CardDescription>
                Manage API keys and credentials for messaging channels
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'twilio', name: 'Twilio (SMS & Voice)', description: 'Required for SMS, WhatsApp, and Voice AI channels', connected: false },
                { id: 'meta', name: 'Meta Business', description: 'Required for Facebook Messenger and WhatsApp', connected: false },
                { id: 'apple', name: 'Apple Messages for Business', description: 'Required for iMessage integration via MSP', connected: false },
              ].map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{integration.name}</p>
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                  </div>
                  <Button variant={integration.connected ? 'outline' : 'default'} size="sm">
                    {integration.connected ? 'Connected' : 'Configure'}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: 'leads', label: 'New lead notifications', description: 'Get notified when a new lead is captured' },
                { id: 'handoff', label: 'Handoff requests', description: 'Get notified when a customer requests to speak to a human' },
                { id: 'weekly', label: 'Weekly summary', description: 'Receive a weekly summary of chatbot performance' },
                { id: 'billing', label: 'Billing alerts', description: 'Get notified about billing and usage alerts' },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 rounded border-gray-300"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
