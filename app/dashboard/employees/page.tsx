"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PlusCircle, MoreHorizontal, Search, LayoutGrid, LayoutList } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, Mail, Phone, MapPin, Building, CreditCard, Heart, Shield } from "lucide-react"

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "department", header: "Department" },
  { accessorKey: "designation", header: "Designation" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "employee_code", header: "Employee Code" },
  { accessorKey: "date_of_birth", header: "Date of Birth" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "state", header: "State" },
  { accessorKey: "pincode", header: "Pincode" },
  { accessorKey: "aadhar_number", header: "Aadhar Number" },
  { accessorKey: "pan_number", header: "PAN Number" },
  { accessorKey: "bank_account", header: "Bank Account" },
  { accessorKey: "bank_ifsc", header: "Bank IFSC" },
  { accessorKey: "salary_amount", header: "Salary" },
  { accessorKey: "salary_period", header: "Salary Period" },
  { accessorKey: "payment_mode", header: "Payment Mode" },
  { accessorKey: "joining_date", header: "Joining Date" },
  { accessorKey: "emergency_contact", header: "Emergency Contact" },
  { accessorKey: "emergency_phone", header: "Emergency Phone" },
  { accessorKey: "emergency_relation", header: "Emergency Relation" },
  { accessorKey: "user_role", header: "User Role" },
]

const initialData = [
  {
    name: "Mathan",
    department: "Operations",
    designation: "Branch Manager",
    employee_code: "EMP001",
    date_of_birth: "1990-01-15",
    email: "jane@premiumcarwash.com",
    phone: "9876543213",
    address: "789 2nd Cross",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560078",
    aadhar_number: "123456789012",
    pan_number: "ABCDE1234F",
    bank_account: "1234567890",
    bank_ifsc: "HDFC0001234",
    salary_amount: 45000,
    salary_period: "monthly",
    payment_mode: "bank_transfer",
    joining_date: "2024-01-01",
    emergency_contact: "John Smith",
    emergency_phone: "9876543214",
    emergency_relation: "Spouse",
    create_user_profile: true,
    user_role: "branch_manager",
  },
]

export default function EmployeesPage() {
  const router = useRouter()
  const [data, setData] = useState(initialData)
  const [selectedEmployee, setSelectedEmployee] = useState<typeof initialData[0] | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [status, setStatus] = useState<"active" | "inactive">("active")

  const handleViewDetails = (employee: typeof initialData[0]) => {
    setSelectedEmployee(employee)
    setShowDetails(true)
  }

  const handleEdit = (employee: typeof initialData[0]) => {
    router.push(`/dashboard/employees/${employee.employee_code}/edit`)
  }

  const handleStatusChange = (employee: typeof initialData[0]) => {
    // Here you would typically update the status via your API
    console.log("Changing status for:", employee)
    setStatus(status === "active" ? "inactive" : "active")
  }

  const filteredData = data.filter(employee => {
    const searchLower = searchQuery.toLowerCase()
    return (
      employee.name.toLowerCase().includes(searchLower) ||
      employee.email.toLowerCase().includes(searchLower) ||
      employee.department.toLowerCase().includes(searchLower) ||
      employee.designation.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <p className="text-sm text-gray-500">Manage your team members and their account permissions here.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/employees/add" className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Employee
          </Link>
        </Button>
      </div>

      {/* Search and View Options */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search employees..."
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
                    Company Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Access
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((employee, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/avatars/avatar-${index + 1}.png`} alt={employee.name} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          <div className="text-sm text-gray-500">{employee.phone}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Premium Car Wash</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.designation}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className={status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                        {status === "active" ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{employee.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="bg-gray-100 text-gray-800">
                        {employee.user_role}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(employee)}>
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(employee)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleStatusChange(employee)}
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
          {filteredData.map((employee, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={`/avatars/avatar-${index + 1}.png`} alt={employee.name} />
                      <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{employee.name}</h3>
                      <p className="text-sm text-gray-500">{employee.designation}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(employee)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEdit(employee)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleStatusChange(employee)}
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
                    {employee.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    {employee.phone}
                  </div>
                  <div className="flex items-center text-sm">
                    <Building className="h-4 w-4 mr-2 text-gray-400" />
                    {employee.department}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <Badge variant="outline" className={status === "active" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"}>
                    {status === "active" ? "Active" : "Inactive"}
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100 text-gray-800">
                    {employee.user_role}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Employee Details Modal */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder-avatar.png" alt={selectedEmployee?.name} />
                <AvatarFallback>{selectedEmployee?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold">{selectedEmployee?.name}</h2>
                <p className="text-gray-500">{selectedEmployee?.designation}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setShowDetails(false)}
              className="h-6 w-6 rounded-full"
            >
              {/* <X className="h-4 w-4" /> */}
            </Button>
          </div>

          {selectedEmployee && (
            <div className="mt-6">
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="flex w-full space-x-2 bg-gray-50/50 p-1 rounded-lg mb-6">
                  <TabsTrigger value="personal" className="flex-1 py-2">
                    <Shield className="w-4 h-4 mr-2" />
                    Personal
                  </TabsTrigger>
                  <TabsTrigger value="employment" className="flex-1 py-2">
                    <Building className="w-4 h-4 mr-2" />
                    Employment
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="flex-1 py-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Contact
                  </TabsTrigger>
                  <TabsTrigger value="financial" className="flex-1 py-2">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Financial
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <InfoCard
                          icon={<Mail className="h-5 w-5 text-blue-500" />}
                          label="Email"
                          value={selectedEmployee.email}
                        />
                        <InfoCard
                          icon={<Phone className="h-5 w-5 text-green-500" />}
                          label="Phone"
                          value={selectedEmployee.phone}
                        />
                        <InfoCard
                          icon={<CalendarDays className="h-5 w-5 text-purple-500" />}
                          label="Date of Birth"
                          value={selectedEmployee.date_of_birth}
                        />
                        <InfoCard
                          icon={<Shield className="h-5 w-5 text-indigo-500" />}
                          label="Employee Code"
                          value={selectedEmployee.employee_code}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="employment">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <InfoCard
                          icon={<Building className="h-5 w-5 text-orange-500" />}
                          label="Department"
                          value={selectedEmployee.department}
                        />
                        <InfoCard
                          icon={<Building className="h-5 w-5 text-yellow-500" />}
                          label="Designation"
                          value={selectedEmployee.designation}
                        />
                        <InfoCard
                          icon={<CalendarDays className="h-5 w-5 text-emerald-500" />}
                          label="Joining Date"
                          value={selectedEmployee.joining_date}
                        />
                        <InfoCard
                          icon={<Shield className="h-5 w-5 text-rose-500" />}
                          label="User Role"
                          value={selectedEmployee.user_role}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Address Information</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <InfoCard
                              icon={<MapPin className="h-5 w-5 text-cyan-500" />}
                              label="Address"
                              value={selectedEmployee.address}
                            />
                            <InfoCard
                              icon={<MapPin className="h-5 w-5 text-teal-500" />}
                              label="City"
                              value={selectedEmployee.city}
                            />
                            <InfoCard
                              icon={<MapPin className="h-5 w-5 text-sky-500" />}
                              label="State"
                              value={selectedEmployee.state}
                            />
                            <InfoCard
                              icon={<MapPin className="h-5 w-5 text-blue-500" />}
                              label="Pincode"
                              value={selectedEmployee.pincode}
                            />
                          </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-500 mb-4">Emergency Contact</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <InfoCard
                              icon={<Heart className="h-5 w-5 text-red-500" />}
                              label="Name"
                              value={selectedEmployee.emergency_contact}
                            />
                            <InfoCard
                              icon={<Phone className="h-5 w-5 text-red-500" />}
                              label="Phone"
                              value={selectedEmployee.emergency_phone}
                            />
                            <InfoCard
                              icon={<Heart className="h-5 w-5 text-red-500" />}
                              label="Relation"
                              value={selectedEmployee.emergency_relation}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="financial">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-2 gap-6">
                        <InfoCard
                          icon={<CreditCard className="h-5 w-5 text-violet-500" />}
                          label="Bank Account"
                          value={selectedEmployee.bank_account}
                        />
                        <InfoCard
                          icon={<CreditCard className="h-5 w-5 text-fuchsia-500" />}
                          label="IFSC Code"
                          value={selectedEmployee.bank_ifsc}
                        />
                        <InfoCard
                          icon={<CreditCard className="h-5 w-5 text-pink-500" />}
                          label="Salary Amount"
                          value={`₹${selectedEmployee.salary_amount}`}
                        />
                        <InfoCard
                          icon={<CreditCard className="h-5 w-5 text-rose-500" />}
                          label="Payment Mode"
                          value={selectedEmployee.payment_mode}
                        />
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

// Helper component for displaying details
function DetailItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  )
}

// Add this new component for info cards
function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
      </div>
    </div>
  )
}
