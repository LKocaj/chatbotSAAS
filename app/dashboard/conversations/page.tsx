'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Search,
  MessageSquare,
  Phone,
  Globe,
  User,
  Clock,
  Star,
  Filter,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

interface Conversation {
  id: string
  sessionId: string
  channel: 'website' | 'sms' | 'whatsapp' | 'messenger'
  chatbotName: string
  leadName?: string
  leadEmail?: string
  leadPhone?: string
  leadScore: 'hot' | 'warm' | 'cold' | null
  lastMessage: string
  messageCount: number
  createdAt: string
  updatedAt: string
  messages: Message[]
}

// Mock conversations
const mockConversations: Conversation[] = [
  {
    id: '1',
    sessionId: 'sess_abc123',
    channel: 'website',
    chatbotName: 'Website Support Bot',
    leadName: 'John Smith',
    leadEmail: 'john@example.com',
    leadPhone: '+1 (555) 123-4567',
    leadScore: 'hot',
    lastMessage: 'Yes, I would like to schedule an appointment for next week.',
    messageCount: 12,
    createdAt: '2024-01-26T10:30:00Z',
    updatedAt: '2024-01-26T10:45:00Z',
    messages: [
      { id: '1', role: 'assistant', content: "Hi! 👋 I'm here to help. How can I assist you today?", timestamp: '10:30 AM' },
      { id: '2', role: 'user', content: 'Hi, I need help with your services', timestamp: '10:31 AM' },
      { id: '3', role: 'assistant', content: "Of course! I'd be happy to help. Could you tell me what service you're interested in?", timestamp: '10:31 AM' },
      { id: '4', role: 'user', content: "I'm looking for HVAC repair", timestamp: '10:32 AM' },
      { id: '5', role: 'assistant', content: "We offer comprehensive HVAC repair services. To better assist you, could you share your name and the best way to reach you?", timestamp: '10:32 AM' },
      { id: '6', role: 'user', content: "I'm John Smith, you can reach me at john@example.com", timestamp: '10:33 AM' },
      { id: '7', role: 'assistant', content: "Thanks John! Would you like to schedule an appointment with one of our technicians?", timestamp: '10:33 AM' },
      { id: '8', role: 'user', content: 'Yes, I would like to schedule an appointment for next week.', timestamp: '10:45 AM' },
    ],
  },
  {
    id: '2',
    sessionId: 'sess_def456',
    channel: 'sms',
    chatbotName: 'SMS Lead Capture',
    leadName: 'Sarah Johnson',
    leadPhone: '+1 (555) 987-6543',
    leadScore: 'warm',
    lastMessage: 'Thanks for the info, I will think about it.',
    messageCount: 8,
    createdAt: '2024-01-26T09:15:00Z',
    updatedAt: '2024-01-26T09:30:00Z',
    messages: [
      { id: '1', role: 'user', content: 'Hi, do you offer free estimates?', timestamp: '9:15 AM' },
      { id: '2', role: 'assistant', content: 'Yes! All our estimates are completely free. What service are you interested in?', timestamp: '9:15 AM' },
      { id: '3', role: 'user', content: 'Plumbing repair', timestamp: '9:18 AM' },
      { id: '4', role: 'assistant', content: "We'd be happy to help with your plumbing needs. Can I get your name to set up an estimate?", timestamp: '9:18 AM' },
      { id: '5', role: 'user', content: "Sarah Johnson", timestamp: '9:20 AM' },
      { id: '6', role: 'assistant', content: 'Thanks Sarah! When would be a good time for our technician to visit?', timestamp: '9:20 AM' },
      { id: '7', role: 'user', content: 'Thanks for the info, I will think about it.', timestamp: '9:30 AM' },
    ],
  },
  {
    id: '3',
    sessionId: 'sess_ghi789',
    channel: 'whatsapp',
    chatbotName: 'Website Support Bot',
    leadScore: 'cold',
    lastMessage: 'Just browsing, thanks',
    messageCount: 3,
    createdAt: '2024-01-26T08:00:00Z',
    updatedAt: '2024-01-26T08:05:00Z',
    messages: [
      { id: '1', role: 'assistant', content: 'Hi! How can I help you today?', timestamp: '8:00 AM' },
      { id: '2', role: 'user', content: 'What services do you offer?', timestamp: '8:02 AM' },
      { id: '3', role: 'assistant', content: 'We offer HVAC, plumbing, and electrical services. Would you like more information about any of these?', timestamp: '8:02 AM' },
      { id: '4', role: 'user', content: 'Just browsing, thanks', timestamp: '8:05 AM' },
    ],
  },
]

const channelIcons: Record<string, React.ReactNode> = {
  website: <Globe className="h-4 w-4" />,
  sms: <Phone className="h-4 w-4" />,
  whatsapp: <MessageSquare className="h-4 w-4 text-green-600" />,
  messenger: <MessageSquare className="h-4 w-4 text-blue-600" />,
}

const leadScoreColors = {
  hot: 'bg-red-100 text-red-800',
  warm: 'bg-orange-100 text-orange-800',
  cold: 'bg-blue-100 text-blue-800',
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setConversations(mockConversations)
      setSelectedId(mockConversations[0]?.id || null)
      setLoading(false)
    }, 500)
  }, [])

  const selectedConversation = conversations.find((c) => c.id === selectedId)

  const filteredConversations = conversations.filter((conv) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      conv.leadName?.toLowerCase().includes(query) ||
      conv.leadEmail?.toLowerCase().includes(query) ||
      conv.leadPhone?.includes(query) ||
      conv.lastMessage.toLowerCase().includes(query)
    )
  })

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffHours < 24) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    } else if (diffHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-120px)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Conversations</h1>
        <p className="text-muted-foreground">
          View and manage all conversations across your chatbots
        </p>
      </div>

      <div className="flex flex-1 gap-4 min-h-0">
        {/* Conversation List */}
        <div className="w-96 flex flex-col border rounded-lg bg-card">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* List */}
          <ScrollArea className="flex-1">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <MessageSquare className="mx-auto h-8 w-8 mb-2" />
                <p>No conversations found</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={cn(
                      'p-4 cursor-pointer hover:bg-muted/50 transition-colors',
                      selectedId === conv.id && 'bg-muted'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-muted rounded-full">
                        {conv.leadName ? (
                          <User className="h-4 w-4" />
                        ) : (
                          channelIcons[conv.channel]
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium truncate">
                            {conv.leadName || 'Anonymous'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatTime(conv.updatedAt)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {conv.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            {channelIcons[conv.channel]}
                            <span className="capitalize">{conv.channel}</span>
                          </span>
                          {conv.leadScore && (
                            <Badge className={cn('text-xs', leadScoreColors[conv.leadScore])} variant="secondary">
                              {conv.leadScore}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>

        {/* Conversation Detail */}
        <div className="flex-1 border rounded-lg bg-card flex flex-col">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      <User className="h-5 w-5" />
                    </div>
                    <div>
                      <h2 className="font-semibold">
                        {selectedConversation.leadName || 'Anonymous Visitor'}
                      </h2>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {channelIcons[selectedConversation.channel]}
                        <span>{selectedConversation.chatbotName}</span>
                        <span>•</span>
                        <span>{selectedConversation.messageCount} messages</span>
                      </div>
                    </div>
                  </div>
                  {selectedConversation.leadScore && (
                    <Badge className={leadScoreColors[selectedConversation.leadScore]} variant="secondary">
                      <Star className="h-3 w-3 mr-1" />
                      {selectedConversation.leadScore} lead
                    </Badge>
                  )}
                </div>

                {/* Lead Info */}
                {(selectedConversation.leadEmail || selectedConversation.leadPhone) && (
                  <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                    <p className="text-sm font-medium mb-2">Contact Information</p>
                    <div className="flex gap-4 text-sm">
                      {selectedConversation.leadEmail && (
                        <span>{selectedConversation.leadEmail}</span>
                      )}
                      {selectedConversation.leadPhone && (
                        <span>{selectedConversation.leadPhone}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {selectedConversation.messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        'flex',
                        msg.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[70%] rounded-lg px-4 py-2',
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        )}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={cn(
                          'text-xs mt-1',
                          msg.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        )}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Actions */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    Take Over Conversation
                  </Button>
                  <Button variant="outline">
                    Export
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageSquare className="mx-auto h-12 w-12 mb-4" />
                <p>Select a conversation to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
