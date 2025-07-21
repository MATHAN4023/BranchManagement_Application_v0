"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, ShoppingBag, Building2, Settings } from "lucide-react"
import NavItem from "./NavItem"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

interface DrawerProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  user: { name: string; email: string }
}

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Branch Admin", href: "/dashboard/branch-admin", icon: Users },
  { name: "Employees", href: "/dashboard/employees", icon: Users },
  { name: "Vendors", href: "/dashboard/vendors", icon: ShoppingBag },
  { name: "Branch Management", href: "/dashboard/branch-management", icon: Building2 },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Drawer({ isOpen, setIsOpen, user }: DrawerProps) {
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [isOpen, setIsOpen])

  return (
    <div
      ref={drawerRef}
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:inset-0 flex flex-col`}
    >
      <div className="flex items-center justify-center h-16 bg-gray-800">
        <span className="text-xl font-semibold">Redcubix Workspace</span>
      </div>
      <nav className="mt-5 flex-grow">
        {menuItems.map((item) => (
          <NavItem
            key={item.name}
            href={item.href}
            icon={item.icon}
            isActive={pathname === item.href}
            isDrawerOpen={isOpen}
          >
            {item.name}
          </NavItem>
        ))}
      </nav>
      <Separator className="my-2 bg-gray-700" />
      <div className="p-4 flex items-center space-x-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder-user.jpg" alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-gray-400">{user.email}</span>
        </div>
      </div>
    </div>
  )
}

