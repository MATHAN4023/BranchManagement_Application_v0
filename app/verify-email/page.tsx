import { Suspense } from 'react'
import { EmailVerification } from '../components/EmailVerification'

export default function VerifyEmailPage() {
  return (
    <main className="container mx-auto py-10">
      <Suspense fallback={<div className="flex items-center justify-center min-h-[calc(100vh-5rem)]">Loading...</div>}>
        <EmailVerification />
      </Suspense>
    </main>
  )
}

