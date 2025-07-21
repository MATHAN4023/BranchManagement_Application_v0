"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Phone, CreditCard } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function EditVendorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    name: "",
    vendor_type: "",
    gstin: "",
    contact_person: "",
    mobile: "",
    phone: "",
    email: "",
    address_line: "",
    address_line_2: "",
    pincode: "",
    state: "",
    city: "",
    credit_days: "",
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch vendor data based on the ID
    const fetchVendorData = async () => {
      try {
        // Mock data - replace with actual API call
        const mockData = {
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
          credit_days: "30"
        }
        setFormData(mockData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching vendor data:", error)
        setIsLoading(false)
      }
    }

    fetchVendorData()
  }, [params.id])

  const tabs = [
    { 
      id: "details", 
      label: "Basic Details", 
      icon: Building2, 
      progress: 0,
      description: "Basic vendor information" 
    },
    { 
      id: "contact", 
      label: "Contact Info", 
      icon: Phone, 
      progress: 50,
      description: "Contact details" 
    },
    { 
      id: "address", 
      label: "Address", 
      icon: MapPin, 
      progress: 100,
      description: "Address information" 
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
    if (activeTab !== "address") {
      return
    }
    try {
      console.log('Submitting form with data:', formData)
      // Here you would typically update the data via your API
      console.log("Updating:", formData)
      // After successful update, redirect back to the vendors list
      router.push("/dashboard/vendors")
    } catch (error) {
      console.error("Error updating vendor:", error)
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
            <h1 className="text-3xl font-bold text-gray-900">Edit Vendor</h1>
            <p className="text-gray-500 mt-1">Update vendor information</p>
          </div>
        </div>

        <div className="mb-8">
          <Progress value={tabs.find(tab => tab.id === activeTab)?.progress} className="h-2" />
        </div>

        <Card className="max-w-[1200px] mx-auto border-none shadow-lg">
          <form onSubmit={handleSubmit}>
            <Tabs defaultValue="details" value={activeTab} className="w-full" onValueChange={handleTabChange}>
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

              {/* Basic Details Tab */}
              <TabsContent value="details" className="mt-6">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Vendor Name</Label>
                      <Input name="name" value={formData.name} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Vendor Type</Label>
                      <Input name="vendor_type" value={formData.vendor_type} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>GSTIN</Label>
                      <Input name="gstin" value={formData.gstin} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Credit Days</Label>
                      <Input 
                        name="credit_days" 
                        type="number" 
                        value={formData.credit_days} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Contact Info Tab */}
              <TabsContent value="contact">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Contact Person</Label>
                      <Input name="contact_person" value={formData.contact_person} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Mobile</Label>
                      <Input name="mobile" value={formData.mobile} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Address Tab */}
              <TabsContent value="address">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Address Line 1</Label>
                      <Input name="address_line" value={formData.address_line} onChange={handleInputChange} required />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label>Address Line 2</Label>
                      <Input name="address_line_2" value={formData.address_line_2} onChange={handleInputChange} />
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
                disabled={activeTab === "details"}
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
                {activeTab === "address" ? (
                  <Button 
                    type="submit"
                    className="px-8 bg-primary hover:bg-primary/90"
                  >
                    Update Vendor
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