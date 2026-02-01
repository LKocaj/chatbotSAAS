'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Globe,
  Phone,
  Apple,
  Mic,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock analytics data
const stats = {
  totalConversations: 2847,
  conversationChange: 12.5,
  totalLeads: 342,
  leadChange: 8.3,
  conversionRate: 12.0,
  conversionChange: 2.1,
  avgResponseTime: 1.8,
  responseChange: -0.3,
}

const dailyData = [
  { day: 'Mon', conversations: 145, leads: 18 },
  { day: 'Tue', conversations: 132, leads: 15 },
  { day: 'Wed', conversations: 178, leads: 22 },
  { day: 'Thu', conversations: 165, leads: 20 },
  { day: 'Fri', conversations: 189, leads: 25 },
  { day: 'Sat', conversations: 98, leads: 12 },
  { day: 'Sun', conversations: 76, leads: 8 },
]

const channelData = [
  { channel: 'Website', conversations: 1856, leads: 223, percentage: 52 },
  { channel: 'SMS', conversations: 624, leads: 78, percentage: 17 },
  { channel: 'WhatsApp', conversations: 289, leads: 32, percentage: 8 },
  { channel: 'Messenger', conversations: 78, leads: 9, percentage: 2 },
  { channel: 'iMessage', conversations: 412, leads: 48, percentage: 12 },
  { channel: 'Voice', conversations: 318, leads: 41, percentage: 9 },
]

const recentLeads = [
  { name: 'John Smith', email: 'john@example.com', score: 'hot', source: 'website', time: '10 min ago' },
  { name: 'Sarah Johnson', phone: '+1 555-987-6543', score: 'warm', source: 'sms', time: '25 min ago' },
  { name: 'Mike Davis', email: 'mike.d@company.com', score: 'hot', source: 'website', time: '1 hour ago' },
  { name: 'Emily Brown', phone: '+1 555-123-7890', score: 'cold', source: 'whatsapp', time: '2 hours ago' },
  { name: 'Alex Wilson', email: 'alex.w@business.net', score: 'warm', source: 'website', time: '3 hours ago' },
]

const leadScoreColors = {
  hot: 'bg-red-100 text-red-800',
  warm: 'bg-orange-100 text-orange-800',
  cold: 'bg-blue-100 text-blue-800',
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d')

  const maxConversations = Math.max(...dailyData.map((d) => d.conversations))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">
            Track your chatbot performance and lead generation
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={timeRange === '7d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('7d')}
          >
            7 days
          </Button>
          <Button
            variant={timeRange === '30d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('30d')}
          >
            30 days
          </Button>
          <Button
            variant={timeRange === '90d' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange('90d')}
          >
            90 days
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">{stats.conversationChange}%</span>
              <span className="ml-1">from last period</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leads Captured</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">{stats.leadChange}%</span>
              <span className="ml-1">from last period</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">{stats.conversionChange}%</span>
              <span className="ml-1">from last period</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgResponseTime}s</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDownRight className="h-3 w-3 text-green-600 mr-1" />
              <span className="text-green-600">{Math.abs(stats.responseChange)}s</span>
              <span className="ml-1">faster</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Daily Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Activity</CardTitle>
            <CardDescription>Conversations and leads over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Simple bar chart */}
              <div className="flex items-end justify-between h-48 gap-2">
                {dailyData.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full flex flex-col items-center gap-1 h-40 justify-end">
                      <div
                        className="w-full bg-primary/20 rounded-t"
                        style={{
                          height: `${(day.leads / Math.max(...dailyData.map(d => d.leads))) * 100}%`,
                          minHeight: '4px',
                        }}
                      />
                      <div
                        className="w-full bg-primary rounded-t"
                        style={{
                          height: `${(day.conversations / maxConversations) * 100}%`,
                          minHeight: '4px',
                        }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded" />
                  <span>Conversations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary/20 rounded" />
                  <span>Leads</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Channel Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Breakdown</CardTitle>
            <CardDescription>Performance by communication channel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channelData.map((channel) => (
                <div key={channel.channel} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {channel.channel === 'Website' && <Globe className="h-4 w-4" />}
                      {channel.channel === 'SMS' && <Phone className="h-4 w-4" />}
                      {channel.channel === 'WhatsApp' && <MessageSquare className="h-4 w-4 text-green-600" />}
                      {channel.channel === 'Messenger' && <MessageSquare className="h-4 w-4 text-blue-600" />}
                      {channel.channel === 'iMessage' && <Apple className="h-4 w-4 text-gray-800" />}
                      {channel.channel === 'Voice' && <Mic className="h-4 w-4 text-purple-600" />}
                      <span className="font-medium">{channel.channel}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {channel.conversations.toLocaleString()} conv · {channel.leads} leads
                    </div>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${channel.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leads</CardTitle>
          <CardDescription>Latest leads captured by your chatbots</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Score</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Source</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead, index) => (
                  <tr key={index} className="border-b last:border-0 hover:bg-muted/50">
                    <td className="py-3 px-4 font-medium">{lead.name}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {lead.email || lead.phone}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={leadScoreColors[lead.score as keyof typeof leadScoreColors]} variant="secondary">
                        {lead.score}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize">{lead.source}</span>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">{lead.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
