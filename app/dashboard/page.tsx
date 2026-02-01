import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Bot, MessageSquare, Users, TrendingUp, Plus, Check } from 'lucide-react'
import Link from 'next/link'

async function getStats(userId: string) {
  const membership = await prisma.organizationMember.findFirst({
    where: { userId },
    include: { organization: true },
  })

  if (!membership) {
    return {
      totalChatbots: 0,
      totalConversations: 0,
      totalLeads: 0,
      conversionRate: 0,
      chatbots: [],
    }
  }

  const chatbots = await prisma.chatbot.findMany({
    where: { organizationId: membership.organizationId },
    orderBy: { createdAt: 'desc' },
  })

  const totalChatbots = chatbots.length
  const totalConversations = chatbots.reduce(
    (sum, bot) => sum + bot.messagesThisMonth,
    0
  )
  const totalLeads = chatbots.reduce(
    (sum, bot) => sum + bot.leadsThisMonth,
    0
  )

  const conversionRate =
    totalConversations > 0
      ? Math.round((totalLeads / totalConversations) * 100)
      : 0

  return {
    totalChatbots,
    totalConversations,
    totalLeads,
    conversionRate,
    chatbots: chatbots.slice(0, 1), // Get first chatbot for quick actions
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const stats = session?.user?.id
    ? await getStats(session.user.id)
    : { totalChatbots: 0, totalConversations: 0, totalLeads: 0, conversionRate: 0, chatbots: [] }

  const hasFirstChatbot = stats.totalChatbots > 0
  const firstChatbot = stats.chatbots[0]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user?.name?.split(' ')[0] || 'there'}
          </p>
        </div>
        <Link href="/dashboard/chatbots/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Chatbot
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Chatbots</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalChatbots}</div>
            <p className="text-xs text-muted-foreground">
              {stats.totalChatbots === 0 ? 'Create your first chatbot' : 'Active chatbots'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversations</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalConversations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              This month
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
            <p className="text-xs text-muted-foreground">
              This month
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
            <p className="text-xs text-muted-foreground">
              Lead to conversation
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Get Started</CardTitle>
            <CardDescription>
              Complete these steps to start capturing leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full font-medium ${
                  hasFirstChatbot
                    ? 'bg-green-100 text-green-700'
                    : 'bg-primary/10 text-primary'
                }`}>
                  {hasFirstChatbot ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <div className="flex-1">
                  <p className="font-medium">Create your first chatbot</p>
                  <p className="text-sm text-muted-foreground">
                    {hasFirstChatbot
                      ? `"${firstChatbot?.name}" is ready`
                      : 'Set up a chatbot for your website'}
                  </p>
                </div>
                <Link href="/dashboard/chatbots/new">
                  <Button size="sm" variant={hasFirstChatbot ? 'outline' : 'default'}>
                    {hasFirstChatbot ? 'Add Another' : 'Create'}
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full font-medium ${
                  hasFirstChatbot
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  2
                </div>
                <div className="flex-1">
                  <p className="font-medium">Configure channels</p>
                  <p className="text-sm text-muted-foreground">
                    Add SMS, WhatsApp, Messenger, iMessage, or Voice
                  </p>
                </div>
                {hasFirstChatbot && firstChatbot ? (
                  <Link href={`/dashboard/chatbots/${firstChatbot.id}`}>
                    <Button size="sm" variant="outline">
                      Configure
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    Configure
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-4">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full font-medium ${
                  hasFirstChatbot
                    ? 'bg-primary/10 text-primary'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  3
                </div>
                <div className="flex-1">
                  <p className="font-medium">Install on your website</p>
                  <p className="text-sm text-muted-foreground">
                    Copy the embed code to your site
                  </p>
                </div>
                {hasFirstChatbot && firstChatbot ? (
                  <Link href={`/dashboard/chatbots/${firstChatbot.id}#embed`}>
                    <Button size="sm" variant="outline">
                      Get Code
                    </Button>
                  </Link>
                ) : (
                  <Button size="sm" variant="outline" disabled>
                    Get Code
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest conversations and leads
            </CardDescription>
          </CardHeader>
          <CardContent>
            {stats.totalConversations > 0 ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  You've had {stats.totalConversations.toLocaleString()} conversations
                  and captured {stats.totalLeads} leads this month.
                </p>
                <Link href="/dashboard/conversations">
                  <Button variant="outline" className="w-full">
                    View Conversations
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No activity yet</p>
                <p className="text-sm text-muted-foreground">
                  Conversations will appear here once you deploy a chatbot
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
