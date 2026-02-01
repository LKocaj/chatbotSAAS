import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import {
  MessageSquare,
  LayoutDashboard,
  Bot,
  Inbox,
  BarChart3,
  Settings,
  LogOut,
  BookOpen,
  Plug,
} from 'lucide-react'
import { UserNav } from '@/components/dashboard/user-nav'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">LeadChat</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            <NavItem href="/dashboard" icon={LayoutDashboard}>
              Overview
            </NavItem>
            <NavItem href="/dashboard/chatbots" icon={Bot}>
              Chatbots
            </NavItem>
            <NavItem href="/dashboard/conversations" icon={Inbox}>
              Conversations
            </NavItem>
            <NavItem href="/dashboard/analytics" icon={BarChart3}>
              Analytics
            </NavItem>
            <NavItem href="/dashboard/knowledge" icon={BookOpen}>
              Knowledge Base
            </NavItem>
            <NavItem href="/dashboard/integrations" icon={Plug}>
              Integrations
            </NavItem>
            <NavItem href="/dashboard/settings" icon={Settings}>
              Settings
            </NavItem>
          </nav>

          {/* User section */}
          <div className="border-t p-4">
            <UserNav user={session.user} />
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pl-64">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}

function NavItem({
  href,
  icon: Icon,
  children
}: {
  href: string
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      <Icon className="h-4 w-4" />
      <span>{children}</span>
    </Link>
  )
}
