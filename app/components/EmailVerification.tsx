"use client"

import type React from "react"
import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "../contexts/LanguageContext"
import { CheckCircle2 } from "lucide-react"

export function EmailVerification() {
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useLanguage()
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      })

      if (!response.ok) {
        throw new Error(t("invalidVerificationCode"))
      }

      const data = await response.json()
      localStorage.setItem("userToken", data.token)
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }))

      toast({
        title: t("emailVerificationSuccessful"),
        description: t("redirectingToDashboard"),
      })

      window.location.href = "/dashboard"
    } catch (error) {
      toast({
        title: t("verificationFailed"),
        description: error instanceof Error ? error.message : t("unexpectedError"),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      title: "Secure Verification",
      description: "Your verification process is protected with enterprise-grade security.",
    },
    {
      title: "Quick Process",
      description: "Verify your email and start using your account in minutes.",
    },
    {
      title: "24/7 Support",
      description: "Our support team is always here to help if you need assistance.",
    },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-[60%_40%]">
      <div className="hidden lg:flex flex-col bg-gray-50 p-12 justify-between">
        <div className="space-y-12">
          <div>
            <h2 className="text-lg font-semibold text-gray-500">Email Verification</h2>
            <h1 className="text-4xl font-bold text-[#1A2B6B] mt-2">Verify Your Email</h1>
            <p className="text-gray-600 mt-4 text-lg">
              We've sent a verification code to your email address. Please enter it below to complete your registration.
            </p>
          </div>

          <div className="space-y-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-gray-400 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mt-1 text-base">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-sm text-gray-500">Protected by industry-leading security protocols</p>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[360px] space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Enter Verification Code</h1>
            <p className="mt-2 text-gray-600">Please enter the verification code sent to {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="mt-1.5"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white h-11" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Didn't receive the code?{" "}
              <Button
                variant="link"
                className="text-[#1A2B6B] hover:underline font-medium p-0 h-auto"
                onClick={() => {
                  // Add resend code logic here
                  toast({
                    title: "Verification code resent",
                    description: "Please check your email for the new code.",
                  })
                }}
              >
                Resend Code
              </Button>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

