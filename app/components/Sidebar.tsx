"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, ShoppingBag, Building2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import React from "react"
import { useAuth } from "../contexts/AuthContext"

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Branch Admin", href: "/dashboard/branch-admin", icon: Users },
  { name: "Employees", href: "/dashboard/employees", icon: Users },
  { name: "Vendors", href: "/dashboard/vendors", icon: ShoppingBag },
  { name: "Branch Management", href: "/dashboard/branch-management", icon: Building2 },
]

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gray-900 text-white border-r border-gray-700 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 bg-gray-800 border-b border-gray-700">
        {!isCollapsed && <span className="text-xl font-semibold text-white">Redcubix</span>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="h-8 w-8 text-gray-400 hover:text-white"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <nav className="space-y-1 px-2 py-4">
          {menuItems.map((item) => (
            <TooltipProvider key={item.name}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-2 py-2 text-sm font-medium rounded-md",
                      pathname === item.href
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      isCollapsed && "justify-center",
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10} className="bg-gray-800 text-white">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </ScrollArea>
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 bg-gray-800">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage 
                src="/placeholder-user.jpg" 
                alt={user?.name || "User"} 
              />
              <AvatarFallback>
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {user?.name || "Guest User"}
                </span>
                <span className="text-xs text-gray-400">
                  {user?.email || "No email"}
                </span>
              </div>
            )}
          </div>
          <Separator className="my-4 bg-gray-700" />
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-gray-700"
            onClick={logout}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronRight className="h-4 w-4 mr-2" />
                Logout
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

