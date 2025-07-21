'use client'

import React from 'react'
import { cn } from "@/lib/utils"
import { useSidebar } from './sidebar-context'

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen w-64 transition-transform",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="h-full overflow-y-auto bg-white border-r">
        {children}
      </div>
    </div>
  )
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="p-4 border-b">{children}</div>
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div className="p-4">{children}</div>
}

export function SidebarFooter({ children }: { children: React.ReactNode }) {
  return <div className="p-4 border-t mt-auto">{children}</div>
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <nav className="space-y-2">{children}</nav>
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarMenuButton({ children, isActive, asChild, ...props }: React.ComponentPropsWithoutRef<"button"> & { isActive?: boolean, asChild?: boolean }) {
  const Comp = asChild ? React.Fragment : 'button'
  return (
    <Comp className={cn(
      "flex items-center w-full px-2 py-2 text-sm font-medium rounded-md",
      isActive
        ? "bg-gray-100 text-gray-900"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
    )} {...props}>
      {children}
    </Comp>
  )
}

