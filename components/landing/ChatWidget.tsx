'use client'

import Script from 'next/script'

export function ChatWidget() {
  const widgetUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'https://chatbot-production-596b.up.railway.app'
  const tenantId = 'oncall-chat'

  return (
    <Script
      src={`${widgetUrl}/widget/${tenantId}.js`}
      strategy="lazyOnload"
    />
  )
}
