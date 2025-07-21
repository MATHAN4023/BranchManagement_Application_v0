'use client'

import { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'

export default function LoginPage() {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log('Current user name is:', session?.user?.name || 'Not logged in')
    console.log('=== Login Status ===')
    console.log('Authentication Status:', status)
    console.log('Session Data:', session)
  }, [session, status])

  // ... rest of your login component code
} 