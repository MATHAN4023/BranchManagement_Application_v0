"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCircle, Building2, MapPin, CreditCard, Phone, UserCog, ArrowLeft } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AddEmployeePage() {
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
    setActiveTab(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Submitting:", formData)
    // After submission, redirect back to the employees list
    router.push("/dashboard/employees")
  }

  const handleNext = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id)
    }
  }

  const handlePrevious = () => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      <div className="container mx-auto py-8">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          {/* <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="mr-4 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Employees
          </Button> */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Employee</h1>
            <p className="text-gray-500 mt-1">Create a new employee profile</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={tabs.find(tab => tab.id === activeTab)?.progress} className="h-2" />
        </div>

        <Card className="max-w-[1200px] mx-auto border-none shadow-lg">
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} className="w-full" onValueChange={handleTabChange}>
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

              {/* Personal Information Tab - Combined personal details */}
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

              {/* Employment Tab - Job related details and access */}
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

              {/* Contact Tab - Address and Emergency Contact */}
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

              {/* Financial Tab - Bank and Salary Details */}
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
                    Create Employee
                  </Button>
                ) : (
                  <Button 
                    type="button"
                    onClick={handleNext}
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

