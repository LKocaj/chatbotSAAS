import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { getStripe, createCustomer, createCheckoutSession, PRICE_IDS } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { plan, organizationId } = await request.json()

    if (!plan || !organizationId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get price ID for the plan
    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS]
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
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

    // Get or create Stripe customer
    let customerId = org.stripeCustomerId

    if (!customerId) {
      const customer = await createCustomer(
        session.user.email,
        session.user.name || org.name
      )
      customerId = customer.id

      // Save customer ID to organization
      await prisma.organization.update({
        where: { id: org.id },
        data: { stripeCustomerId: customerId },
      })
    }

    // Create checkout session
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
    const checkoutSession = await createCheckoutSession(
      customerId,
      priceId,
      `${baseUrl}/dashboard/settings?success=true`,
      `${baseUrl}/dashboard/settings?canceled=true`
    )

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
