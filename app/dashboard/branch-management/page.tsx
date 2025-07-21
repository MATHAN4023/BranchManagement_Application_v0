"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, MoreHorizontal, Search, LayoutGrid, LayoutList, Building2, Mail, Phone, MapPin, Globe } from "lucide-react"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

const initialData = [
  {
    name: "JP Nagar Branch",
    branch_type: "company_owned",
    gstin: "29ABCDE1234F1Z5",
    email: "jpnagar@example.com",
    phone: "9876543210",
    address: "123 5th Block, JP Nagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560078",
    latitude: 12.91126,
    longitude: 77.59151,
    operational_settings: {
      appointment_buffer: 15,
      max_concurrent_appointments: 5,
      enable_online_booking: true
    }
  },
]

export default function BranchManagementPage() {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [selectedBranch, setSelectedBranch] = useState<typeof initialData[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [status, setStatus] = useState<"active" | "inactive">("active")

  const handleViewDetails = (branch: typeof initialData[0]) => {
    setSelectedBranch(branch)
    setShowDetails(true)
  }

  const handleEdit = (branch: typeof initialData[0]) => {
    router.push(`/dashboard/branch-management/${branch.gstin}/edit`)
  }

  const handleStatusChange = (branch: typeof initialData[0]) => {
    console.log("Changing status for:", branch)
    setStatus(status === "active" ? "inactive" : "active")
  }

  const filteredData = data.filter(branch => {
    const searchLower = searchQuery.toLowerCase()
    return (
      branch.name.toLowerCase().includes(searchLower) ||
      branch.email.toLowerCase().includes(searchLower) ||
      branch.city.toLowerCase().includes(searchLower) ||
      branch.branch_type.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Branch Management</h1>
          <p className="text-sm text-gray-500">Manage your branches and their operational settings here.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/branch-management/add" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Branch
          </Link>
        </Button>
      </div>

      {/* Search and View Options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
          >
            <LayoutList className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        // List View
        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Online Booking
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((branch, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{branch.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{branch.name}</div>
                          <div className="text-sm text-gray-500">{branch.gstin}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="capitalize">
                        {branch.branch_type.replace('_', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{branch.city}</div>
                      <div className="text-sm text-gray-500">{branch.state}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                        {status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{branch.email}</div>
                      <div className="text-sm text-gray-500">{branch.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Switch 
                        checked={branch.operational_settings.enable_online_booking}
                        disabled
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(branch)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(branch)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(branch)}
                            className={status === "active" ? "text-red-600" : "text-green-600"}
                          >
                            {status === "active" ? "Set as Inactive" : "Set as Active"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((branch, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{branch.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{branch.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{branch.branch_type.replace('_', ' ')}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(branch)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(branch)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleStatusChange(branch)}
                        className={status === "active" ? "text-red-600" : "text-green-600"}
                      >
                        {status === "active" ? "Set as Inactive" : "Set as Active"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {branch.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {branch.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {branch.address}
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 mr-2 text-gray-400" />
                    {branch.city}, {branch.state}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="outline" className={status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                    {status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Online Booking</span>
                    <Switch 
                      checked={branch.operational_settings.enable_online_booking}
                      disabled
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Branch Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedBranch && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>{selectedBranch.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedBranch.name}</h2>
                    <p className="text-gray-500 capitalize">{selectedBranch.branch_type.replace('_', ' ')}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="operational">Operational Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Email</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.email}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Phone</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.phone}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">GSTIN</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.gstin}</dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Location</h4>
                          <dl className="space-y-2">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Address</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.address}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">City</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.city}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">State</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.state}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Pincode</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.pincode}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="operational" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Operational Settings</h4>
                          <dl className="grid grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Appointment Buffer</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.operational_settings.appointment_buffer} minutes</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Max Concurrent Appointments</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.operational_settings.max_concurrent_appointments}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Online Booking</dt>
                              <dd>
                                <Switch 
                                  checked={selectedBranch.operational_settings.enable_online_booking}
                                  disabled
                                />
                              </dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-4">GPS Coordinates</h4>
                          <dl className="grid grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Latitude</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.latitude}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Longitude</dt>
                              <dd className="text-sm text-gray-900">{selectedBranch.longitude}</dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

