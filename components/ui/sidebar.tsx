'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft } from 'lucide-react'

import { useIsMobile } from "@/components/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useSidebar, SidebarProvider } from './sidebar-context'

export function Sidebar({ children }: { children: React.ReactNode }) {
  const { isOpen } = useSidebar()

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-screen transition-transform bg-white border-r",
      isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"
    )}>
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </div>
  )
}

export function SidebarHeader({ children }: { children: React.ReactNode }) {
  return <div className="border-b">{children}</div>
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
  const Comp = asChild ? 'div' : 'button'
  return (
    <Comp
      className={cn(
        "flex items-center w-full px-2 py-2 text-sm font-medium rounded-md",
        isActive
          ? "bg-gray-100 text-gray-900"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}

export function SidebarGroup({ children }: { children: React.ReactNode }) {
  return <div className="space-y-2">{children}</div>
}

export function SidebarGroupLabel({ children }: { children: React.ReactNode }) {
  return <p className="px-2 py-1 text-sm font-medium text-gray-600">{children}</p>
}

export function SidebarGroupContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarGroupAction({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarInput({ ...props }: React.ComponentPropsWithoutRef<typeof Input>) {
  return <Input className="w-full" {...props} />
}

export function SidebarInset({ children }: { children: React.ReactNode }) {
  return <div className="p-4 rounded-md bg-gray-50">{children}</div>
}

export function SidebarRail({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col h-full">{children}</div>
}

export function SidebarSeparator({ children }: { children: React.ReactNode }) {
  return <Separator className="my-4" />
}

export function SidebarTrigger({ children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button variant="ghost" size="icon" {...props}>
      {children}
    </Button>
  )
}

export function SidebarMenuSub({ children }: { children: React.ReactNode }) {
  return <ul className="pl-4">{children}</ul>
}

export function SidebarMenuSubItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

export function SidebarMenuSubButton({ children, ...props }: React.ComponentPropsWithoutRef<"button">) {
  return (
    <Button variant="ghost" className="w-full text-left" {...props}>
      {children}
    </Button>
  )
}

export function SidebarMenuAction({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}

export function SidebarMenuBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
      {children}
    </span>
  )
}

export function SidebarMenuSkeleton({ children }: { children: React.ReactNode }) {
  return <Skeleton className="h-7 w-full" />
}


export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
}

