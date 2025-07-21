'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { Language } from '../translations'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी (Hindi)' },
]

export default function SecondaryNavigation() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b">
      <Link href="/" className="flex items-center space-x-2">
        <div className="text-xl font-bold">{t('redcubixWorkplace')}</div>
      </Link>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center">
              <Globe className="mr-2 h-4 w-4" />
              {languages.find(lang => lang.code === language)?.name || 'Language'}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.code} onSelect={() => setLanguage(lang.code as Language)}>
                {lang.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="default" asChild>
          <Link href="/login">{t('login')}</Link>
        </Button>
      </div>
    </nav>
  )
}

