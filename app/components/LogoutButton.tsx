import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { LogOut } from 'lucide-react'
import { cn } from "@/lib/utils"

interface LogoutButtonProps {
  isCollapsed: boolean
}

export function LogoutButton({ isCollapsed }: LogoutButtonProps) {
  const router = useRouter()

  const handleLogout = () => {
    // Clear the user token from localStorage
    localStorage.removeItem('userToken')
    // Redirect to the home page
    router.push('/')
  }

  return (
    <Button 
      variant="ghost" 
      className={cn(
        "w-full text-red-500 hover:text-red-700 hover:bg-red-100 transition-colors",
        isCollapsed ? "justify-center" : "justify-start"
      )}
      onClick={handleLogout}
    >
      <LogOut className={cn("h-4 w-4", isCollapsed ? "" : "mr-2")} />
      {!isCollapsed && "Logout"}
    </Button>
  )
}

