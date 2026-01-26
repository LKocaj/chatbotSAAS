'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  Key,
  Plus,
  Copy,
  Check,
  Trash2,
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ApiKey {
  id: string
  name: string
  keyPrefix: string
  createdAt: string
  lastUsedAt: string | null
}

// Mock API keys
const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production',
    keyPrefix: 'lc_live_abc1',
    createdAt: '2024-01-15T10:00:00Z',
    lastUsedAt: '2024-01-26T09:30:00Z',
  },
  {
    id: '2',
    name: 'Development',
    keyPrefix: 'lc_test_xyz9',
    createdAt: '2024-01-20T14:00:00Z',
    lastUsedAt: null,
  },
]

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKey, setNewKey] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setApiKeys(mockApiKeys)
      setLoading(false)
    }, 500)
  }, [])

  const handleCreateKey = async () => {
    if (!newKeyName.trim()) return

    setCreating(true)

    try {
      const res = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName }),
      })

      const data = await res.json()

      if (res.ok) {
        // Show the new key (only shown once)
        setNewKey(data.key)
        setApiKeys((prev) => [data.apiKey, ...prev])
      }
    } catch (error) {
      console.error('Failed to create API key:', error)
      // For demo, simulate success
      const demoKey = `lc_live_${Math.random().toString(36).substring(2, 15)}`
      setNewKey(demoKey)
      setApiKeys((prev) => [
        {
          id: Date.now().toString(),
          name: newKeyName,
          keyPrefix: demoKey.substring(0, 12),
          createdAt: new Date().toISOString(),
          lastUsedAt: null,
        },
        ...prev,
      ])
    } finally {
      setCreating(false)
      setNewKeyName('')
    }
  }

  const handleDeleteKey = async (keyId: string) => {
    // Simulate API call
    setApiKeys((prev) => prev.filter((k) => k.id !== keyId))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/dashboard/settings"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Settings
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">API Keys</h1>
            <p className="text-muted-foreground">
              Manage API keys for programmatic access
            </p>
          </div>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create API Key</DialogTitle>
                <DialogDescription>
                  Create a new API key for programmatic access to your chatbots
                </DialogDescription>
              </DialogHeader>

              {newKey ? (
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-yellow-800">
                          Save this key now!
                        </p>
                        <p className="text-sm text-yellow-700">
                          You won't be able to see it again after closing this dialog.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Your API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newKey}
                        readOnly
                        className="font-mono text-sm"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(newKey)}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      onClick={() => {
                        setNewKey(null)
                        setCreateDialogOpen(false)
                      }}
                    >
                      Done
                    </Button>
                  </DialogFooter>
                </div>
              ) : (
                <>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="keyName">Key Name</Label>
                      <Input
                        id="keyName"
                        placeholder="e.g., Production, Development"
                        value={newKeyName}
                        onChange={(e) => setNewKeyName(e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground">
                        A descriptive name to identify this key
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setCreateDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleCreateKey}
                      disabled={creating || !newKeyName.trim()}
                    >
                      {creating ? 'Creating...' : 'Create Key'}
                    </Button>
                  </DialogFooter>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* API Keys List */}
      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>
            Use these keys to authenticate API requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apiKeys.length === 0 ? (
            <div className="text-center py-8">
              <Key className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">No API keys yet</p>
              <Button onClick={() => setCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First API Key
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div
                  key={key.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-lg">
                      <Key className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{key.name}</p>
                      <p className="text-sm text-muted-foreground font-mono">
                        {key.keyPrefix}••••••••••••
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">
                        Created {formatDate(key.createdAt)}
                      </p>
                      {key.lastUsedAt && (
                        <p className="text-muted-foreground">
                          Last used {formatDate(key.lastUsedAt)}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteKey(key.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Example */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
          <CardDescription>
            How to use your API key
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Authentication Header</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`Authorization: Bearer YOUR_API_KEY`}</code>
              </pre>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Example Request</p>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`curl -X GET "https://api.leadchat.ai/api/v1/chatbots" \\
  -H "Authorization: Bearer lc_live_xxxxx" \\
  -H "Content-Type: application/json"`}</code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
