import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { createBillingPortalSession } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { organizationId } = await request.json()

    if (!organizationId) {
      return NextResponse.json(
        { error: 'Missing organization ID' },
        { status: 400 }
      )
    }

    // Get organization and verify user has access
    const org = await prisma.organization.findFirst({
      where: {
        id: organizationId,
        OR: [
          { ownerId: session.user.id },
          { members: { some: { userId: session.user.id, role: { in: ['OWNER', 'ADMIN'] } } } },
        ],
      },
    })

    if (!org) {
      return NextResponse.json({ error: 'Organization not found' }, { status: 404 })
    }

    if (!org.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No billing account found. Please subscribe to a plan first.' },
        { status: 400 }
      )
    }

    // Create billing portal session
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const portalSession = await createBillingPortalSession(
      org.stripeCustomerId,
      `${baseUrl}/dashboard/settings`
    )

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Portal error:', error)
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    )
  }
}
