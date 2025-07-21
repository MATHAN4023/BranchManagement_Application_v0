'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Phone } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center min-h-[calc(100vh-64px)]">
      <h1 className="text-5xl md:text-6xl font-bold tracking-tight max-w-4xl mb-8">
        {t('heroTitle')}
        <br />
        {t('heroSubtitle')}
      </h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Button size="lg" className="text-lg px-8" asChild>
          <Link href="/pricing">{t('getStartedNow')}</Link>
        </Button>
        <Button size="lg" variant="outline" className="text-lg px-8">
          <Phone className="mr-2 h-5 w-5" />
          {t('contactSales')}
        </Button>
      </div>

      <p className="text-xl text-muted-foreground max-w-2xl">
        {t('heroDescription')}
      </p>
    </div>
  )
}

