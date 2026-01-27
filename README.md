# OnCall Chat

AI Chat That Never Sleeps

## Features

- **Multi-Channel Support**: Website widget, SMS, WhatsApp, Facebook Messenger
- **AI-Powered Conversations**: GPT-4 powered responses with lead qualification
- **Appointment Booking**: Integration with Calendly, Cal.com, Google Calendar
- **Analytics Dashboard**: Track conversations, leads, and conversion rates
- **CRM Integrations**: Connect to your existing tools

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Auth**: NextAuth.js
- **Database**: PostgreSQL + Prisma
- **Backend**: Connects to FastAPI chatbot service

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Existing chatbot backend running

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Update `.env.local` with your credentials:
```
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
CHATBOT_API_URL="http://localhost:8000"
```

4. Set up the database:
```bash
npm run db:push
npm run db:generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
├── app/
│   ├── (auth)/           # Login/signup pages
│   ├── api/              # API routes
│   ├── dashboard/        # Protected dashboard
│   └── page.tsx          # Landing page
├── components/
│   ├── ui/               # shadcn/ui components
│   └── dashboard/        # Dashboard components
├── lib/
│   ├── auth.ts           # NextAuth config
│   ├── db.ts             # Prisma client
│   └── utils.ts          # Utilities
├── prisma/
│   └── schema.prisma     # Database schema
└── types/
    └── next-auth.d.ts    # Type extensions
```

## Pricing

- **Starter**: $99/mo - 1 chatbot, website widget, 1k messages
- **Pro**: $249/mo - 3 chatbots, all channels, 5k messages
- **Enterprise**: $499/mo - Unlimited, white-label, priority support

## License

Private - All rights reserved
