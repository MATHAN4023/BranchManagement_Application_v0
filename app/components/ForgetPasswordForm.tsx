"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, MailIcon } from "lucide-react"

export function ForgetPasswordForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/reset-password-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Handle specific error codes
        if (response.status === 404) {
          throw new Error("This email address is not registered. Please check your email or sign up.")
        }
        if (response.status === 400) {
          throw new Error(data.message || "Invalid email address")
        }
        throw new Error(data.message || "Failed to send reset password link")
      }

      // Only show success if the API call was successful
      setIsEmailSent(true)
      
    } catch (error) {
      setError(error instanceof Error 
        ? error.message 
        : "We couldn't send the reset link. Please verify your email address and try again."
      )
      setIsEmailSent(false) // Make sure to reset success state on error
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendLink = () => {
    setIsEmailSent(false)
    setError(null)
    setEmail("")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left section - 60% */}
      <div className="hidden lg:flex lg:w-[60%] bg-slate-50 items-center justify-center">
        <div className="max-w-md p-8">
          <h1 className="text-4xl font-bold text-[#1A2B6B]">Forgot Password?</h1>
          <p className="mt-4 text-gray-600 text-lg">
            Don't worry! It happens. Please enter your email address and we'll send you a link to reset your password.
          </p>
        </div>
      </div>

      {/* Right section - 40% */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          {!isEmailSent ? (
            <>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
                <p className="mt-2 text-gray-600">
                  Enter your email address below
                </p>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError(null)
                    }}
                    placeholder="Enter your email"
                    required
                    className={error ? "border-red-500" : ""}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black hover:bg-gray-800 text-white h-11"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending Link..." : "Send Reset Link"}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link href="/login" className="text-[#1A2B6B] hover:underline font-medium">
                    Back to Login
                  </Link>
                </p>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <MailIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <Alert className="border-green-500 text-green-700">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <AlertTitle>Check Your Email</AlertTitle>
                <AlertDescription>
                  We've sent a password reset link to <span className="font-medium">{email}</span>. 
                  Please check your inbox and follow the instructions to reset your password.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Didn't receive the email?
                </p>
                <Button
                  onClick={handleResendLink}
                  variant="outline"
                  className="text-[#1A2B6B]"
                >
                  Send another link
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

