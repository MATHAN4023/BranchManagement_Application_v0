'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { useLanguage } from '../contexts/LanguageContext'
import { Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage()

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी (Hindi)' },
  ]

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <Link href="/" className="text-2xl font-bold">
        {t('redcubixWorkplace')}
      </Link>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/login">{t('login')}</Link>
        </Button>
        <Button asChild>
          <Link href="/register">{t('register')}</Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-4 w-4" />
              <span className="sr-only">Switch language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.code} onClick={() => setLanguage(lang.code)}>
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}

