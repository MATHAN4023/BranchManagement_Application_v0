"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "../contexts/LanguageContext"
import { Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { useAuth } from "../contexts/AuthContext"

interface ErrorMessage {
  field: string
  message: string
}

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<ErrorMessage[]>([])
  const { t } = useLanguage()
  const { toast } = useToast()
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log('Login API Response:', data) // Keep this for debugging

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Extract user data - adjust these based on your actual API response structure
      const userData = {
        name: data.data?.user?.name || data.user?.name || data.name || '',
        email: data.data?.user?.email || data.user?.email || data.email || '',
        token: data.data?.token || data.token || data.access_token || ''
      }

      // Validate token
      if (!userData.token) {
        throw new Error('Token not found in response')
      }

      // Show success toast
      toast({
        title: "Login successful",
        description: "Redirecting to dashboard...",
      })

      // Perform login
      await login(userData)
      
      // Force navigation after login
      router.push('/dashboard')
      router.refresh()

    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = error instanceof Error ? error.message : t("unexpectedError")
      
      setErrors([{ field: "", message: errorMessage }])
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      title: "Secure Access",
      description: "Your data is protected with enterprise-grade security measures.",
    },
    {
      title: "Real-time Updates",
      description: "Get instant access to your business metrics and analytics.",
    },
    {
      title: "Multi-branch Management",
      description: "Manage all your locations from a single dashboard.",
    },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-[60%_40%]">
      <div className="hidden lg:flex flex-col bg-gray-50 p-12 justify-between">
        <div className="space-y-12">
          <div>
            <h2 className="text-lg font-semibold text-gray-500">Welcome Back</h2>
            <h1 className="text-4xl font-bold text-[#1A2B6B] mt-2">Login to Your Workspace</h1>
            <p className="text-gray-600 mt-4 text-lg">
              Access your dashboard and manage your business operations efficiently.
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

        <div>
          <p className="text-sm text-gray-500">Trusted by leading companies worldwide</p>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded-md" />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[360px] space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Login</h1>
            <p className="mt-2 text-gray-600">Enter your email below to login to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.length > 0 && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{errors[0].message}</div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forget-password" className="text-sm text-[#1A2B6B] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white h-11" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-[#1A2B6B] hover:underline font-medium">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

