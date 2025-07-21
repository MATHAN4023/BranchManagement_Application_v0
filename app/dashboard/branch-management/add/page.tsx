"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Settings } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

export default function AddBranchPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("details")
  const [formData, setFormData] = useState({
    name: "",
    branch_type: "",
    gstin: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    latitude: "",
    longitude: "",
    operational_settings: {
      appointment_buffer: "15",
      max_concurrent_appointments: "5",
      enable_online_booking: true
    }
  })

  const tabs = [
    { 
      id: "details", 
      label: "Basic Details", 
      icon: Building2, 
      progress: 0,
      description: "Basic branch information" 
    },
    { 
      id: "location", 
      label: "Location", 
      icon: MapPin, 
      progress: 50,
      description: "Address and coordinates" 
    },
    { 
      id: "operational", 
      label: "Operational", 
      icon: Settings, 
      progress: 100,
      description: "Operational settings" 
    }
  ]

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: type === 'number' ? Number(value) : value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      operational_settings: {
        ...prev.operational_settings,
        enable_online_booking: checked
      }
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (activeTab !== "operational") {
      return
    }
    try {
      console.log('Submitting form with data:', formData)
      // Here you would typically send the data to your API
      console.log("Creating:", formData)
      // After submission, redirect back to the branches list
      router.push("/dashboard/branch-management")
    } catch (error) {
      console.error("Error creating branch:", error)
    }
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
        <div className="flex items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Branch</h1>
            <p className="text-gray-500 mt-1">Create a new branch location</p>
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
                      <Label>Branch Name</Label>
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleInputChange} 
                        placeholder="Enter branch name"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch Type</Label>
                      <Input 
                        name="branch_type" 
                        value={formData.branch_type} 
                        onChange={handleInputChange} 
                        placeholder="e.g. company_owned"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>GSTIN</Label>
                      <Input 
                        name="gstin" 
                        value={formData.gstin} 
                        onChange={handleInputChange} 
                        placeholder="Enter GSTIN"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleInputChange} 
                        placeholder="Enter email"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleInputChange} 
                        placeholder="Enter phone number"
                        required 
                      />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Location Tab */}
              <TabsContent value="location">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Address</Label>
                      <Input 
                        name="address" 
                        value={formData.address} 
                        onChange={handleInputChange} 
                        placeholder="Enter complete address"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input 
                        name="city" 
                        value={formData.city} 
                        onChange={handleInputChange} 
                        placeholder="Enter city"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input 
                        name="state" 
                        value={formData.state} 
                        onChange={handleInputChange} 
                        placeholder="Enter state"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Pincode</Label>
                      <Input 
                        name="pincode" 
                        value={formData.pincode} 
                        onChange={handleInputChange} 
                        placeholder="Enter pincode"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Latitude</Label>
                      <Input 
                        name="latitude" 
                        type="number" 
                        step="any"
                        value={formData.latitude} 
                        onChange={handleInputChange} 
                        placeholder="Enter latitude"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Longitude</Label>
                      <Input 
                        name="longitude" 
                        type="number" 
                        step="any"
                        value={formData.longitude} 
                        onChange={handleInputChange} 
                        placeholder="Enter longitude"
                        required 
                      />
                    </div>
                  </div>
                </CardContent>
              </TabsContent>

              {/* Operational Settings Tab */}
              <TabsContent value="operational">
                <CardContent className="p-6 bg-white rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Appointment Buffer (minutes)</Label>
                      <Input 
                        name="operational_settings.appointment_buffer" 
                        type="number" 
                        value={formData.operational_settings.appointment_buffer} 
                        onChange={handleInputChange} 
                        placeholder="Enter buffer time"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Concurrent Appointments</Label>
                      <Input 
                        name="operational_settings.max_concurrent_appointments" 
                        type="number" 
                        value={formData.operational_settings.max_concurrent_appointments} 
                        onChange={handleInputChange} 
                        placeholder="Enter max appointments"
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Enable Online Booking</Label>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={formData.operational_settings.enable_online_booking}
                          onCheckedChange={handleSwitchChange}
                        />
                        <span className="text-sm text-gray-500">
                          {formData.operational_settings.enable_online_booking ? "Enabled" : "Disabled"}
                        </span>
                      </div>
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
                {activeTab === "operational" ? (
                  <Button 
                    type="submit"
                    className="px-8 bg-primary hover:bg-primary/90"
                  >
                    Create Branch
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

