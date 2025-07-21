"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface Employee {
  id: string
  name: string
  email: string
  phone: string
  position: string
  department: string
}

export function EditEmployeeForm({ employeeId }: { employeeId: string }) {
  const router = useRouter()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEmployee() {
      try {
        const response = await fetch(`/api/employees/${employeeId}`)
        if (!response.ok) throw new Error('Failed to fetch employee')
        const data = await response.json()
        setEmployee(data)
      } catch (error) {
        toast.error("Error fetching employee data")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [employeeId])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!employee) return

    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      })

      if (!response.ok) throw new Error('Failed to update employee')
      
      toast.success("Employee updated successfully")
      router.push('/employees')
      router.refresh()
    } catch (error) {
      toast.error("Error updating employee")
    }
  }

  if (loading) return <div>Loading...</div>
  if (!employee) return <div>Employee not found</div>

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">Name</label>
        <Input
          id="name"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <Input
          id="email"
          type="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <Input
          id="phone"
          value={employee.phone}
          onChange={(e) => setEmployee({ ...employee, phone: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="position" className="block text-sm font-medium">Position</label>
        <Input
          id="position"
          value={employee.position}
          onChange={(e) => setEmployee({ ...employee, position: e.target.value })}
          required
        />
      </div>
      <div>
        <label htmlFor="department" className="block text-sm font-medium">Department</label>
        <Input
          id="department"
          value={employee.department}
          onChange={(e) => setEmployee({ ...employee, department: e.target.value })}
          required
        />
      </div>
      <div className="flex space-x-4">
        <Button type="submit">Save Changes</Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
} 