import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's organization
    const membership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
      include: { organization: true },
    })

    if (!membership) {
      return NextResponse.json({
        totalChatbots: 0,
        totalConversations: 0,
        totalLeads: 0,
        conversionRate: 0,
      })
    }

    // Get chatbot stats
    const chatbots = await prisma.chatbot.findMany({
      where: { organizationId: membership.organizationId },
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

    // Calculate conversion rate
    const conversionRate =
      totalConversations > 0
        ? Math.round((totalLeads / totalConversations) * 100)
        : 0

    return NextResponse.json({
      totalChatbots,
      totalConversations,
      totalLeads,
      conversionRate,
      plan: membership.organization.plan,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    )
  }
}
