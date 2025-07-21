import { Breadcrumb } from './Breadcrumb'
import { usePathname } from 'next/navigation'

interface HeaderProps {
  user: { name: string; email: string }
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  const showBreadcrumb = pathname.startsWith('/dashboard')

  return (
    <header className="bg-white border-b z-10">
      <div className="flex h-16 items-center px-4">
        {showBreadcrumb && <Breadcrumb />}
      </div>
    </header>
  )
}

