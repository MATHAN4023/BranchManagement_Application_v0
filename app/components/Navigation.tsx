import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-background border-b">
      <div className="text-2xl font-bold text-primary">PURSUE Production</div>
      <div>
        <Button variant="ghost" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </nav>
  )
}

