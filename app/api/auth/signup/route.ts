import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

async function notifySlack(name: string, email: string) {
  const text = `🚀 New OnCall Chat signup: *${name}* (${email})`
  const webhooks = [
    process.env.SLACK_WEBHOOK_URL,
    process.env.SLACK_LEADS_WEBHOOK_URL,
  ].filter(Boolean) as string[]

  for (const url of webhooks) {
    try {
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
    } catch {
      console.error('Slack notification failed for webhook')
    }
  }
}

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, password } = signupSchema.parse(body)

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12)

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    })

    // Create default organization for user
    const orgSlug = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '-')
    await prisma.organization.create({
      data: {
        name: `${name}'s Workspace`,
        slug: `${orgSlug}-${Date.now()}`,
        ownerId: user.id,
        members: {
          create: {
            userId: user.id,
            role: 'OWNER',
          },
        },
      },
    })

    // Fire-and-forget — don't block signup on Slack
    notifySlack(name, email)

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}
