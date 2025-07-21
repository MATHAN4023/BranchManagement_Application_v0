'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumb() {
  const pathname = usePathname()
  const pathSegments = pathname.split('/').filter(segment => segment !== '')

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/dashboard" className="text-gray-600 hover:text-black">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`
          const isLast = index === pathSegments.length - 1
          const title = segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')
          return (
            <li key={segment} className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-500 mx-2" />
              {isLast ? (
                <span className="text-black font-medium">{title}</span>
              ) : (
                <Link href={href} className="text-gray-600 hover:text-black">
                  {title}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

