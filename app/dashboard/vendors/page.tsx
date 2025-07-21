"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, MoreHorizontal, Search, LayoutGrid, LayoutList, Building2, Mail, Phone, MapPin } from "lucide-react"
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

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "vendor_type", header: "Vendor Type" },
  { accessorKey: "gstin", header: "GSTIN" },
  { accessorKey: "contact_person", header: "Contact Person" },
  { accessorKey: "mobile", header: "Mobile" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "address_line", header: "Address Line 1" },
  { accessorKey: "address_line_2", header: "Address Line 2" },
  { accessorKey: "pincode", header: "Pincode" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "credit_days", header: "Credit Days" },
]

const initialData = [
  {
    name: "ABC Supplies",
    vendor_type: "supplies",
    gstin: "29ABCDE1234F1Z5",
    contact_person: "John Smith",
    mobile: "9876543210",
    phone: "080123456789",
    email: "contact@abcsupplies.com",
    address_line: "789 Industrial Area",
    address_line_2: "Phase 1",
    pincode: "560058",
    state: "Karnataka",
    city: "Bangalore",
    credit_days: 30
  },
]

export default function VendorsPage() {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [selectedVendor, setSelectedVendor] = useState<typeof initialData[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [status, setStatus] = useState<"active" | "inactive">("active")

  const handleViewDetails = (vendor: typeof initialData[0]) => {
    setSelectedVendor(vendor)
    setShowDetails(true)
  }

  const handleEdit = (vendor: typeof initialData[0]) => {
    router.push(`/dashboard/vendors/${vendor.gstin}/edit`)
  }

  const handleStatusChange = (vendor: typeof initialData[0]) => {
    console.log("Changing status for:", vendor)
    setStatus(status === "active" ? "inactive" : "active")
  }

  const filteredData = data.filter(vendor => {
    const searchLower = searchQuery.toLowerCase()
    return (
      vendor.name.toLowerCase().includes(searchLower) ||
      vendor.contact_person.toLowerCase().includes(searchLower) ||
      vendor.email.toLowerCase().includes(searchLower) ||
      vendor.vendor_type.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Vendors</h1>
          <p className="text-sm text-gray-500">Manage your vendors and their information here.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/vendors/add" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Vendor
          </Link>
        </Button>
      </div>

      {/* Search and View Options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search vendors..."
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
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Person
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    GSTIN
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((vendor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                          <div className="text-sm text-gray-500">{vendor.city}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.vendor_type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.contact_person}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                        {status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.email}</div>
                      <div className="text-sm text-gray-500">{vendor.mobile}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vendor.gstin}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(vendor)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(vendor)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(vendor)}
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
          {filteredData.map((vendor, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{vendor.name}</h3>
                      <p className="text-sm text-gray-500">{vendor.vendor_type}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(vendor)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(vendor)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleStatusChange(vendor)}
                        className={status === "active" ? "text-red-600" : "text-green-600"}
                      >
                        {status === "active" ? "Set as Inactive" : "Set as Active"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Building2 className="h-4 w-4 mr-2 text-gray-400" />
                    {vendor.contact_person}
                  </div>
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    {vendor.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {vendor.mobile}
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {vendor.city}, {vendor.state}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="outline" className={status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                    {status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    {vendor.credit_days} Days Credit
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Vendor Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedVendor && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback>{selectedVendor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedVendor.name}</h2>
                    <p className="text-gray-500">{selectedVendor.vendor_type}</p>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="contact">Contact & Address</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <dl className="grid grid-cols-2 gap-4">
                        <div>
                          <dt className="text-sm font-medium text-gray-500">GSTIN</dt>
                          <dd className="text-sm text-gray-900">{selectedVendor.gstin}</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Credit Period</dt>
                          <dd className="text-sm text-gray-900">{selectedVendor.credit_days} Days</dd>
                        </div>
                        <div>
                          <dt className="text-sm font-medium text-gray-500">Status</dt>
                          <dd>
                            <Badge variant="outline" className={status === "active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}>
                              {status === "active" ? "Active" : "Inactive"}
                            </Badge>
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="contact" className="space-y-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h4>
                          <dl className="grid grid-cols-2 gap-4">
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Contact Person</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.contact_person}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Mobile</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.mobile}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Phone</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.phone}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Email</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.email}</dd>
                            </div>
                          </dl>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Address</h4>
                          <dl className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Address Line 1</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.address_line}</dd>
                            </div>
                            <div className="col-span-2">
                              <dt className="text-sm font-medium text-gray-500">Address Line 2</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.address_line_2}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">City</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.city}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">State</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.state}</dd>
                            </div>
                            <div>
                              <dt className="text-sm font-medium text-gray-500">Pincode</dt>
                              <dd className="text-sm text-gray-900">{selectedVendor.pincode}</dd>
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

