import Stripe from 'stripe'

let stripeClient: Stripe | null = null

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('Missing STRIPE_SECRET_KEY environment variable')
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-02-24.acacia',
      typescript: true,
    })
  }

  return stripeClient
}

// Price IDs from Stripe Dashboard
export const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER || 'price_starter',
  pro: process.env.STRIPE_PRICE_PRO || 'price_pro',
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || 'price_enterprise',
}

export const PLAN_LIMITS = {
  FREE: {
    chatbots: 1,
    messagesPerMonth: 100,
    channels: ['website'],
  },
  STARTER: {
    chatbots: 1,
    messagesPerMonth: 1000,
    channels: ['website'],
  },
  PRO: {
    chatbots: 3,
    messagesPerMonth: 5000,
    channels: ['website', 'sms', 'whatsapp'],
  },
  ENTERPRISE: {
    chatbots: Infinity,
    messagesPerMonth: Infinity,
    channels: ['website', 'sms', 'whatsapp', 'messenger'],
  },
}

export async function createCustomer(email: string, name?: string) {
  return getStripe().customers.create({
    email,
    name,
  })
}

export async function createCheckoutSession(
  customerId: string,
  priceId: string,
  successUrl: string,
  cancelUrl: string
) {
  return getStripe().checkout.sessions.create({
    customer: customerId,
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    allow_promotion_codes: true,
  })
}

export async function createBillingPortalSession(
  customerId: string,
  returnUrl: string
) {
  return getStripe().billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })
}

export async function getSubscription(subscriptionId: string) {
  return getStripe().subscriptions.retrieve(subscriptionId)
}

export async function cancelSubscription(subscriptionId: string) {
  return getStripe().subscriptions.cancel(subscriptionId)
}

export function getPlanFromPriceId(priceId: string): keyof typeof PLAN_LIMITS {
  if (priceId === PRICE_IDS.starter) return 'STARTER'
  if (priceId === PRICE_IDS.pro) return 'PRO'
  if (priceId === PRICE_IDS.enterprise) return 'ENTERPRISE'
  return 'FREE'
}
