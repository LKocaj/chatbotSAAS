import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const updateChatbotSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  welcomeMessage: z.string().optional(),
  primaryColor: z.string().optional(),
  position: z.string().optional(),
  channels: z.array(z.string()).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'DRAFT']).optional(),
  knowledgeBase: z.record(z.any()).optional(),
})

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Get user's organization
    const membership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    })

    if (!membership) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 })
    }

    const chatbot = await prisma.chatbot.findFirst({
      where: {
        id,
        organizationId: membership.organizationId,
      },
    })

    if (!chatbot) {
      return NextResponse.json({ error: 'Chatbot not found' }, { status: 404 })
    }

    return NextResponse.json(chatbot)
  } catch (error) {
    console.error('Error fetching chatbot:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chatbot' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const data = updateChatbotSchema.parse(body)

    // Get user's organization
    const membership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    })

    if (!membership) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 })
    }

    // Verify chatbot belongs to user's org
    const existingChatbot = await prisma.chatbot.findFirst({
      where: {
        id,
        organizationId: membership.organizationId,
      },
    })

    if (!existingChatbot) {
      return NextResponse.json({ error: 'Chatbot not found' }, { status: 404 })
    }

    const chatbot = await prisma.chatbot.update({
      where: { id },
      data,
    })

    return NextResponse.json(chatbot)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Error updating chatbot:', error)
    return NextResponse.json(
      { error: 'Failed to update chatbot' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    // Get user's organization
    const membership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
    })

    if (!membership) {
      return NextResponse.json({ error: 'No organization found' }, { status: 400 })
    }

    // Verify chatbot belongs to user's org
    const chatbot = await prisma.chatbot.findFirst({
      where: {
        id,
        organizationId: membership.organizationId,
      },
    })

    if (!chatbot) {
      return NextResponse.json({ error: 'Chatbot not found' }, { status: 404 })
    }

    await prisma.chatbot.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting chatbot:', error)
    return NextResponse.json(
      { error: 'Failed to delete chatbot' },
      { status: 500 }
    )
  }
}
