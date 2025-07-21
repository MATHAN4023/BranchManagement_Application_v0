import { Suspense } from "react"
import { OTPVerificationForm } from "../components/OTPVerificationForm"

export default function VerifyOTPPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
        <OTPVerificationForm />
      </Suspense>
    </main>
  )
}

