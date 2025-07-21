import { useEffect } from 'react'
import { useSession, SessionProvider } from 'next-auth/react'
import { logUserDetails } from '@/utils/userLogger'
import { headers } from 'next/headers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.user) {
      logUserDetails(session.user)
    }
  }, [session])

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
} 