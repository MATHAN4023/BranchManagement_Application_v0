"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Sidebar } from "./Sidebar"
import { Header } from "./Header"
import { cn } from "@/lib/utils"
import type React from "react" // Added import for React

interface   LayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: "", email: "" })
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const userToken = localStorage.getItem("userToken")
    if (userToken) {
      setIsLoggedIn(true)
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
      setUser({
        name: storedUser.name || "",
        email: storedUser.email || "",
      })
    } else if (pathname.startsWith("/dashboard")) {
      router.push("/login")
    }
  }, [pathname, router])

  if (!isLoggedIn) {
    return null // Don't render anything if not logged in
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} user={user} />
      <div
        className={cn(
          "flex flex-col flex-1 overflow-hidden transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-16" : "ml-64",
        )}
      >
        <Header user={user} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white">
          <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  ) 
}

