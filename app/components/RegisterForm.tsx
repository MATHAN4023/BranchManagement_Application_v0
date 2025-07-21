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

interface ErrorMessage {
  field: string
  message: string
}

const subscriptionPlans = [
  { id: 'basic', name: 'Basic Plan', price: '₹999/month' },
  { id: 'standard', name: 'Standard Plan', price: '₹1999/month' },
  { id: 'premium', name: 'Premium Plan', price: '₹2999/month' },
]

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    brandName: "",
    password: "",
    confirmPassword: "",
    subscriptionPlan: "standard",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<ErrorMessage[]>([])
  const { t } = useLanguage()
  const { toast } = useToast()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors([])

    if (formData.password !== formData.confirmPassword) {
      setErrors([{ field: "confirmPassword", message: t("passwordsDoNotMatch") }])
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          user_type: "brand_admin",
          brand: {
            name: formData.brandName,
            subscription_plan: formData.subscriptionPlan,
          },
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: t("registrationSuccessful"),
          description: t("pleaseCheckYourEmailForVerification"),
        })
        router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`)
      } else {
        setErrors(data.errors || [{ field: "", message: data.message }])
      }
    } catch (error) {
      setErrors([{ field: "", message: t("unexpectedError") }])
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      title: "Streamlined Operations",
      description: "Automate and optimize your business processes with our comprehensive management tools.",
    },
    {
      title: "Real-time Analytics",
      description: "Get instant insights into your business performance with detailed analytics and reporting.",
    },
    {
      title: "Team Collaboration",
      description: "Enable seamless communication and collaboration across your organization.",
    },
    {
      title: "Resource Management",
      description: "Efficiently manage your resources, inventory, and personnel all in one place.",
    },
    {
      title: "Customer Satisfaction",
      description: "Improve customer experience with integrated CRM and support features.",
    },
  ]

  return (
    <div className="min-h-screen grid lg:grid-cols-[60%_40%]">
      <div className="hidden lg:flex flex-col bg-gray-50 p-12 justify-between">
        <div className="space-y-12">
          <div>
            <h2 className="text-lg font-semibold text-gray-500">Redcubix Workplace</h2>
            <h1 className="text-4xl font-bold text-[#1A2B6B] mt-2">Transform Your Business with Redcubix Workplace</h1>
            <p className="text-gray-600 mt-4 text-lg">
              Join thousands of businesses that trust Redcubix to manage their operations efficiently.
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
      </div>

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-[360px] space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Register Account</h1>
            <p className="mt-2 text-gray-600">Create your account to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.length > 0 && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {errors.map((error, index) => (
                  <div key={index}>
                    {error.field && <span className="font-semibold">{error.field}: </span>}
                    {error.message}
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label htmlFor="brandName">Brand Name</Label>
                <Input
                  id="brandName"
                  name="brandName"
                  placeholder="Enter your brand name"
                  value={formData.brandName}
                  onChange={handleChange}
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
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

              <div>
                <Label htmlFor="confirmPassword">Re-Enter Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white h-11" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Register"}
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1A2B6B] hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

