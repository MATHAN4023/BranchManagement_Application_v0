import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface UserProfileIconProps {
  username: string
  email: string
}

export function UserProfileIcon({ username, email }: UserProfileIconProps) {
  const [isClient, setIsClient] = useState(false)
  const initials = username.split(' ').map(n => n[0]).join('').toUpperCase()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={10}>
          {username}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

