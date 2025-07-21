'use client'

import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useLanguage } from '../contexts/LanguageContext'
import { useRouter } from 'next/navigation'

const plans = [
  {
    name: 'standard',
    price: '99',
    storage: '30 GB',
    fileStorage: '100 GB/team',
  },
  {
    name: 'premium',
    price: '199',
    storage: '50 GB',
    fileStorage: 'N/A',
  },
  {
    name: 'enterprise',
    price: null,
    storage: '100 GB',
    fileStorage: '1TB/team',
  }
]

export function PricingPage() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleSignUp = (plan: string) => {
    router.push(`/register?plan=${plan}`)
  }

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-4">{t('pricingTitle')}</h1>
      <p className="text-xl text-muted-foreground text-center mb-12">
        {t('pricingDescription')}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <h3 className="text-2xl font-semibold">{t(plan.name as 'standard' | 'premium' | 'enterprise')}</h3>
              {plan.price ? (
                <div className="mt-4">
                  <span className="text-4xl font-bold">₹{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{t('perUserPerMonth')}</span>
                  <p className="text-sm text-muted-foreground">{t('billedAnnually')}</p>
                </div>
              ) : (
                <p className="mt-4 text-lg">{t('customPricing')}</p>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.anyTeamSize')}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.customEmail')}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {plan.storage} {t('features.storage')}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.fileStorage')}: {plan.fileStorage}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.aiAssistant')}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.migrationAssistance')}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.desktopExperience')}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.mobileApps')}
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {t('features.identityManagement')}
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant={plan.price ? "default" : "outline"}
                onClick={() => handleSignUp(plan.name)}
              >
                {plan.price ? t('signUp') : t('contactUs')}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

