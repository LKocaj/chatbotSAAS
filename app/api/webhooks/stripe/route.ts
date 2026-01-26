import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { prisma } from '@/lib/db'
import { getStripe, getPlanFromPriceId } from '@/lib/stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('Missing STRIPE_WEBHOOK_SECRET')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${message}`)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription)
        break

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription)
        break

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice)
        break

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object as Stripe.Invoice)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook handler error: ${message}`)
    return NextResponse.json(
      { error: `Webhook handler failed: ${message}` },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const customerId = session.customer as string
  const subscriptionId = session.subscription as string

  if (!customerId || !subscriptionId) {
    console.error('Missing customer or subscription ID in checkout session')
    return
  }

  // Get subscription details to determine the plan
  const subscription = await getStripe().subscriptions.retrieve(subscriptionId)
  const priceId = subscription.items.data[0]?.price.id
  const plan = priceId ? getPlanFromPriceId(priceId) : 'STARTER'

  // Find organization by Stripe customer ID and update
  const org = await prisma.organization.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (org) {
    await prisma.organization.update({
      where: { id: org.id },
      data: {
        stripeSubscriptionId: subscriptionId,
        plan,
      },
    })
    console.log(`Organization ${org.id} upgraded to ${plan}`)
  } else {
    console.warn(`No organization found for Stripe customer: ${customerId}`)
  }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string
  const subscriptionId = subscription.id
  const priceId = subscription.items.data[0]?.price.id
  const status = subscription.status

  const org = await prisma.organization.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (!org) {
    console.warn(`No organization found for Stripe customer: ${customerId}`)
    return
  }

  // Determine plan based on price
  const plan = priceId ? getPlanFromPriceId(priceId) : org.plan

  // If subscription is active, update the plan
  if (status === 'active' || status === 'trialing') {
    await prisma.organization.update({
      where: { id: org.id },
      data: {
        stripeSubscriptionId: subscriptionId,
        plan,
      },
    })
    console.log(`Organization ${org.id} subscription updated to ${plan}`)
  } else if (status === 'past_due' || status === 'unpaid') {
    // Optionally restrict features for past due accounts
    console.warn(`Organization ${org.id} subscription is ${status}`)
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const customerId = subscription.customer as string

  const org = await prisma.organization.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (!org) {
    console.warn(`No organization found for Stripe customer: ${customerId}`)
    return
  }

  // Downgrade to FREE plan
  await prisma.organization.update({
    where: { id: org.id },
    data: {
      stripeSubscriptionId: null,
      plan: 'FREE',
    },
  })

  console.log(`Organization ${org.id} downgraded to FREE (subscription cancelled)`)
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string
  const subscriptionId = invoice.subscription as string

  console.log(`Payment succeeded for customer ${customerId}, subscription ${subscriptionId}`)

  // Could add logic here to:
  // - Send thank you email
  // - Reset monthly usage counters
  // - Update billing history
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  const customerId = invoice.customer as string

  const org = await prisma.organization.findFirst({
    where: { stripeCustomerId: customerId },
  })

  if (!org) {
    console.warn(`No organization found for Stripe customer: ${customerId}`)
    return
  }

  console.warn(`Payment failed for organization ${org.id}`)

  // Could add logic here to:
  // - Send payment failure email
  // - Add grace period
  // - Restrict features after X failed attempts
}
