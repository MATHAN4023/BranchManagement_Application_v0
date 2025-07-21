import Link from 'next/link'
import { type LucideIcon } from 'lucide-react'

interface NavItemProps {
  href: string
  icon: LucideIcon
  children: React.ReactNode
  isActive: boolean
  isDrawerOpen: boolean
}

export default function NavItem({ href, icon: Icon, children, isActive, isDrawerOpen }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'bg-gray-800 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" aria-hidden="true" />
      <span className={`transition-opacity duration-200 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 lg:opacity-100'}`}>
        {children}
      </span>
    </Link>
  )
}

