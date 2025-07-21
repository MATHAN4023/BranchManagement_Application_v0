"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { PlusCircle } from "lucide-react"

interface Field {
  name: string
  label: string
  type: string
  required?: boolean
}

interface AddItemDrawerProps {
  title: string
  description: string
  fields: Field[]
  onSubmit: (data: any) => void
}

export function AddItemDrawer({ title, description, fields, onSubmit }: AddItemDrawerProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [formData, setFormData] = React.useState({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({})
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          {title}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                name={field.name}
                type={field.type}
                required={field.required}
                onChange={handleInputChange}
              />
            </div>
          ))}
          <Button type="submit" className="w-full mt-4">
            Add {title}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}

