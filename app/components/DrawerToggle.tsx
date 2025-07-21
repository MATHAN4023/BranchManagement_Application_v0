import { Menu, X } from 'lucide-react'

interface DrawerToggleProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

export default function DrawerToggle({ isOpen, setIsOpen }: DrawerToggleProps) {
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="text-gray-500 hover:text-gray-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
    >
      <span className="sr-only">Open sidebar</span>
      {isOpen ? (
        <X className="block h-6 w-6" aria-hidden="true" />
      ) : (
        <Menu className="block h-6 w-6" aria-hidden="true" />
      )}
    </button>
  )
}

