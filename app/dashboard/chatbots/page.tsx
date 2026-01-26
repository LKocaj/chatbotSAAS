'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, MessageSquare, MoreVertical, Globe, Phone, Settings, BarChart3, AlertCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface Chatbot {
  id: string
  name: string
  status: 'ACTIVE' | 'INACTIVE' | 'DRAFT'
  channels: string[]
  messagesThisMonth: number
  leadsThisMonth: number
  createdAt: string
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  DRAFT: 'bg-yellow-100 text-yellow-800',
}

const statusLabels: Record<string, string> = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  DRAFT: 'draft',
}

const channelIcons: Record<string, React.ReactNode> = {
  website: <Globe className="h-4 w-4" />,
  sms: <Phone className="h-4 w-4" />,
  whatsapp: <MessageSquare className="h-4 w-4 text-green-600" />,
  messenger: <MessageSquare className="h-4 w-4 text-blue-600" />,
}

export default function ChatbotsPage() {
  const [chatbots, setChatbots] = useState<Chatbot[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchChatbots() {
      try {
        const res = await fetch('/api/chatbots')
        if (!res.ok) {
          throw new Error('Failed to fetch chatbots')
        }
        const data = await res.json()
        setChatbots(data.chatbots || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load chatbots')
      } finally {
        setLoading(false)
      }
    }
    fetchChatbots()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chatbot?')) return

    try {
      const res = await fetch(`/api/chatbots/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      setChatbots(chatbots.filter(bot => bot.id !== id))
    } catch {
      alert('Failed to delete chatbot')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <p className="text-destructive">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Chatbots</h1>
          <p className="text-muted-foreground">
            Manage your AI chatbots across all channels
          </p>
        </div>
        <Link href="/dashboard/chatbots/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Chatbot
          </Button>
        </Link>
      </div>

      {chatbots.length === 0 ? (
        <Card className="py-16">
          <CardContent className="text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No chatbots yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first chatbot to start capturing leads 24/7
            </p>
            <Link href="/dashboard/chatbots/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Chatbot
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {chatbots.map((bot) => (
            <Card key={bot.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{bot.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={statusColors[bot.status] || statusColors.DRAFT} variant="secondary">
                          {statusLabels[bot.status] || 'draft'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/chatbots/${bot.id}`}>
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/chatbots/${bot.id}/analytics`}>
                          <BarChart3 className="mr-2 h-4 w-4" />
                          Analytics
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDelete(bot.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Channels */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Channels</p>
                    <div className="flex gap-2 flex-wrap">
                      {bot.channels.map((channel) => (
                        <div
                          key={channel}
                          className="flex items-center gap-1 px-2 py-1 bg-muted rounded-md text-sm"
                        >
                          {channelIcons[channel] || <Globe className="h-4 w-4" />}
                          <span className="capitalize">{channel}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-2xl font-bold">{bot.messagesThisMonth.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Messages</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{bot.leadsThisMonth}</p>
                      <p className="text-sm text-muted-foreground">Leads</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Card */}
          <Link href="/dashboard/chatbots/new">
            <Card className="h-full min-h-[240px] border-dashed hover:border-primary hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center h-full">
                <div className="p-3 bg-primary/10 rounded-full mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <p className="font-medium">Create New Chatbot</p>
                <p className="text-sm text-muted-foreground">Add another AI assistant</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      )}
    </div>
  )
}
