"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "../contexts/LanguageContext"
import { CheckCircle2 } from "lucide-react"

export function OTPVerificationForm() {
  const [otp, setOTP] = useState(["", "", "", "", "", ""])
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email")

  // Handle input change for OTP
  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return // Prevent multiple digits
    
    const newOTP = [...otp]
    newOTP[index] = value
    setOTP(newOTP)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  // Handle backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const otpString = otp.join("")
    if (otpString.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter all 6 digits of the OTP",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email, 
          otp: otpString,
          type: "reset_password" 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "OTP Verified",
          description: "Please proceed to reset your password",
        })
        router.push(`/reset-password?email=${encodeURIComponent(email)}&code=${data.token}`)
      } else {
        throw new Error(data.message || "Invalid OTP")
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/resend-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email,
          type: "reset_password" 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "OTP Resent",
          description: "A new OTP has been sent to your email",
        })
      } else {
        throw new Error(data.message || "Failed to resend OTP")
      }
    } catch (error) {
      toast({
        title: "Failed to Resend OTP",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsResending(false)
    }
  }

  const features = [
    {
      title: "Secure Verification",
      description: "Your OTP verification process is protected with enterprise-grade security.",
    },
    {
      title: "Time-Sensitive",
      description: "The OTP is valid for a limited time to ensure the security of your account.",
    },
    {
      title: "Easy Recovery",
      description: "Verify your identity quickly and securely to reset your password.",
    },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-[60%_40%]">
      <div className="hidden lg:flex flex-col bg-gray-50 p-12 justify-between">
        <div className="space-y-12">
          <div>
            <h2 className="text-lg font-semibold text-gray-500">OTP Verification</h2>
            <h1 className="text-4xl font-bold text-[#1A2B6B] mt-2">Verify Your Identity</h1>
            <p className="text-gray-600 mt-4 text-lg">
              We've sent a one-time password (OTP) to your email. Please enter it below to proceed with resetting your
              password.
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
            <h1 className="text-2xl font-semibold text-gray-900">Enter OTP</h1>
            <p className="mt-2 text-gray-600">Please enter the OTP sent to {email}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="otp-0">One-Time Password (OTP)</Label>
              <div className="mt-1.5 flex gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-lg"
                  />
                ))}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-black hover:bg-gray-800 text-white h-11" 
              disabled={isLoading || otp.join("").length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </Button>

            <div className="flex justify-between items-center">
              <Button
                type="button"
                variant="link"
                className="text-[#1A2B6B] hover:underline font-medium p-0 h-auto"
                onClick={handleResendOTP}
                disabled={isResending}
              >
                {isResending ? "Resending..." : "Resend OTP"}
              </Button>
              <Button
                type="button"
                variant="link"
                className="text-[#1A2B6B] hover:underline font-medium p-0 h-auto"
                onClick={() => router.push("/forget-password")}
              >
                Change Email
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

