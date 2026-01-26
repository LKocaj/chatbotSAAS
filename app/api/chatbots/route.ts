import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'

const createChatbotSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  welcomeMessage: z.string().optional(),
  channels: z.array(z.string()).min(1, 'At least one channel is required'),
  companyName: z.string().optional(),
  services: z.string().optional(),
  faqs: z.string().optional(),
})

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
      return NextResponse.json({ chatbots: [] })
    }

    // Get chatbots for this organization
    const chatbots = await prisma.chatbot.findMany({
      where: { organizationId: membership.organizationId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ chatbots })
  } catch (error) {
    console.error('Error fetching chatbots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chatbots' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const data = createChatbotSchema.parse(body)

    // Get user's organization
    const membership = await prisma.organizationMember.findFirst({
      where: { userId: session.user.id },
      include: { organization: true },
    })

    if (!membership) {
      return NextResponse.json(
        { error: 'No organization found' },
        { status: 400 }
      )
    }

    // Generate a unique tenant ID for the chatbot backend
    const tenantId = `tenant_${uuidv4().replace(/-/g, '').slice(0, 12)}`

    // Create the chatbot
    const chatbot = await prisma.chatbot.create({
      data: {
        name: data.name,
        description: data.description,
        welcomeMessage: data.welcomeMessage || "Hi! 👋 I'm here to help. How can I assist you today?",
        channels: data.channels,
        tenantId,
        organizationId: membership.organizationId,
        knowledgeBase: {
          companyName: data.companyName,
          services: data.services,
          faqs: data.faqs,
        },
      },
    })

    // TODO: Create tenant in FastAPI backend
    // await createTenantInBackend(tenantId, { ...data })

    return NextResponse.json(chatbot, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Error creating chatbot:', error)
    return NextResponse.json(
      { error: 'Failed to create chatbot' },
      { status: 500 }
    )
  }
}
