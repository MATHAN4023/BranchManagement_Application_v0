"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { 
  PlusCircle, Search, Filter, Clock, MoreVertical, 
  XCircle 
} from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const columns = [
  { 
    id: "status",
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div className="w-6">
          {status === 'active' && <Clock className="h-4 w-4 text-blue-500" />}
        </div>
      )
    },
  },
  { 
    accessorKey: "name", 
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <img
            src={`https://ui-avatars.com/api/?name=${row.original.name}&background=random`}
            alt={row.original.name}
            className="rounded-full"
          />
        </div>
        <div>
          <div className="font-medium text-sm">{row.original.name}</div>
          <div className="text-xs text-gray-500">{row.original.email}</div>
        </div>
      </div>
    )
  },
  { 
    accessorKey: "email", 
    header: "Email",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {row.original.email}
      </div>
    )
  },
  { 
    accessorKey: "phone", 
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {row.original.phone}
      </div>
    )
  },
  { 
    accessorKey: "user_type", 
    header: "User Type",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">
          {row.original.user_type.replace('_', ' ')}
        </span>
      </div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

const initialData = [
  {
    name: "Branch Admin",
    email: "branch.admin@example.com",
    phone: "9876543211",
    password: "Test@123",
    user_type: "branch_admin",
  },
]

export default function BranchAdminPage() {
  const [data, setData] = useState(initialData)
  const [selectedFilters, setSelectedFilters] = useState([
    "Active", "Branch Admin"
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Branch Admins</h1>
          <span className="text-sm text-gray-500">{data.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
          </Button>
          <Button variant="ghost" size="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
          </Button>
          <Button className="bg-blue-100 hover:bg-blue-200 text-blue-600" asChild>
            <Link href="/dashboard/branch-admin/add" className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Add Branch Admin
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search branch admins..." 
            className="pl-10 border-gray-200"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {selectedFilters.map((filter) => (
            <span key={filter} className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
              {filter}
              <XCircle className="h-4 w-4 cursor-pointer" />
            </span>
          ))}
          <Button variant="outline" size="sm">
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>User Type</span>
        <span>Actions</span>
      </div>

      <DataTable 
        columns={columns} 
        data={data}
        className="border-t border-gray-200"
      />
    </div>
  )
}

