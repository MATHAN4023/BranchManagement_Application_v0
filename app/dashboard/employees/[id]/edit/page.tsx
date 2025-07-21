"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Building2, MapPin, CreditCard, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function EditEmployeePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    designation: "",
    employee_code: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    aadhar_number: "",
    pan_number: "",
    bank_account: "",
    bank_ifsc: "",
    salary_amount: "",
    salary_period: "",
    payment_mode: "",
    joining_date: "",
    emergency_contact: "",
    emergency_phone: "",
    emergency_relation: "",
    create_user_profile: true,
    user_role: "",
    date_of_birth: "",
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch employee data based on the ID
    // This is a mock fetch - replace with your actual API call
    const fetchEmployeeData = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData = {
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
          salary_amount: "45000",
          salary_period: "monthly",
          payment_mode: "bank_transfer",
          joining_date: "2024-01-01",
          emergency_contact: "John Smith",
          emergency_phone: "9876543214",
          emergency_relation: "Spouse",
          create_user_profile: true,
          user_role: "branch_manager",
        }
        setFormData(mockData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching employee data:", error)
        setIsLoading(false)
      }
    }

    fetchEmployeeData()
  }, [params.id])

  const tabs = [
    { 
      id: "personal", 
      label: "Personal Info", 
      icon: UserCircle, 
      progress: 0,
      description: "Basic and personal information" 
    },
    { 
      id: "employment", 
      label: "Employment", 
      icon: Building2, 
      progress: 33,
      description: "Job and role details" 
    },
    { 
      id: "contact", 
      label: "Contact & Address", 
      icon: MapPin, 
      progress: 66,
      description: "Contact and emergency details" 
    },
    { 
      id: "financial", 
      label: "Financial", 
      icon: CreditCard, 
      progress: 100,
      description: "Bank and salary details" 
    }
  ]

  const handleTabChange = (value: string) => {
    console.log('Tab changed to:', value)
    setActiveTab(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Only submit if we're on the financial tab
    if (activeTab !== "financial") {
      return
    }
    try {
      console.log('Submitting form with data:', formData)
      // Here you would typically update the data via your API
      console.log("Updating:", formData)
      // After successful update, redirect back to the employees list
      router.push("/dashboard/employees")
    } catch (error) {
      console.error("Error updating employee:", error)
    }
  }

  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab)
    console.log('Current tab index:', currentIndex, 'Current tab:', activeTab)
    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1].id
      console.log('Moving to next tab:', nextTab)
      setActiveTab(nextTab)
    }
  }

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab)
    console.log('Current tab index:', currentIndex, 'Current tab:', activeTab)
    if (currentIndex > 0) {
      const prevTab = tabs[currentIndex - 1].id
      console.log('Moving to previous tab:', prevTab)
      setActiveTab(prevTab)
    }
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto py-8">
        <div className="flex items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Employee</h1>
            <p className="text-gray-500 mt-1">Update employee information</p>
          </div>
        </div>

        <div className="mb-8">
          <Progress value={tabs.find(tab => tab.id === activeTab)?.progress} className="h-2" />
        </div>

        <Card className="max-w-[1200px] mx-auto border-none shadow-lg">
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="personal" value={activeTab} className="w-full" onValueChange={handleTabChange}>
              <TabsList className="flex w-full space-x-2 bg-gray-50/50 p-2 rounded-t-lg">
                {tabs.map((tab) => (
                  <TooltipProvider key={tab.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger 
                          value={tab.id} 
                          className="flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary hover:bg-gray-50 transition-all duration-200"
                        >
                          <tab.icon className="w-4 h-4 mr-2" />
                          <span className="hidden md:inline">{tab.label}</span>
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{tab.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </TabsList>

              {/* Personal Information Tab */}
              <TabsContent value="personal" className="mt-6">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Aadhar Number</Label>
                      <Input name="aadhar_number" value={formData.aadhar_number} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>PAN Number</Label>
                      <Input name="pan_number" value={formData.pan_number} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Date of Birth</Label>
                      <Input name="date_of_birth" type="date" value={formData.date_of_birth} onChange={handleInputChange} required />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Employment Tab */}
              <TabsContent value="employment">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Employee Code</Label>
                      <Input name="employee_code" value={formData.employee_code} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input name="department" value={formData.department} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Designation</Label>
                      <Input name="designation" value={formData.designation} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Joining Date</Label>
                      <Input name="joining_date" type="date" value={formData.joining_date} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>User Role</Label>
                      <Input name="user_role" value={formData.user_role} onChange={handleInputChange} required />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Address</Label>
                        <Input name="address" value={formData.address} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label>City</Label>
                        <Input name="city" value={formData.city} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label>State</Label>
                        <Input name="state" value={formData.state} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Pincode</Label>
                        <Input name="pincode" value={formData.pincode} onChange={handleInputChange} required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Emergency Contact Name</Label>
                        <Input name="emergency_contact" value={formData.emergency_contact} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Emergency Phone</Label>
                        <Input name="emergency_phone" value={formData.emergency_phone} onChange={handleInputChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label>Emergency Relation</Label>
                        <Input name="emergency_relation" value={formData.emergency_relation} onChange={handleInputChange} required />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Financial Tab */}
              <TabsContent value="financial">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label>Bank Account</Label>
                      <Input name="bank_account" value={formData.bank_account} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>IFSC Code</Label>
                      <Input name="bank_ifsc" value={formData.bank_ifsc} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Salary Amount</Label>
                      <Input name="salary_amount" type="number" value={formData.salary_amount} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Salary Period</Label>
                      <Input name="salary_period" value={formData.salary_period} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Payment Mode</Label>
                      <Input name="payment_mode" value={formData.payment_mode} onChange={handleInputChange} required />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>
            </Tabs>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between items-center border-t border-gray-100 p-6 bg-gray-50 rounded-b-lg">
              <Button 
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="px-6"
                disabled={activeTab === "personal"}
              >
                Previous
              </Button>
              <div className="flex gap-4">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => router.back()}
                  className="px-6"
                >
                  Cancel
                </Button>
                {activeTab === "financial" ? (
                  <Button 
                    type="submit"
                    className="px-8 bg-primary hover:bg-primary/90"
                  >
                    Update Employee
                  </Button>
                ) : (
                  <Button 
                    type="button"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNext()
                    }}
                    className="px-8"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
} 