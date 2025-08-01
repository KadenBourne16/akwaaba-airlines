"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Users, Baby, Phone, Mail, AlertCircle, CheckCircle2, ChevronDown, ChevronLeft } from "lucide-react"

const PassengerDetails = ({setCurrentStep}) => {
  const router = useRouter()
  const [passengerFormList, setPassengerFormList] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log("Checking localStorage for selectedFlightInformation...")
    try {
      const raw = localStorage.getItem("selectedFlight")

      // Add dummy data if no flight data exists
      if (!raw) {
        console.log("No flight data found, creating dummy data...")
        const dummyFlightData = {
          passengerInfo: {
            adults: 2,
            child: 1,
            infants: 1,
          },
        }
        localStorage.setItem("selectedFlight", JSON.stringify(dummyFlightData))

        const flightData = dummyFlightData.passengerInfo
        const { adults = 0, child = 0, infants = 0 } = flightData
        const list = []

        // Add adults
        for (let i = 1; i <= adults; i++) {
          list.push({
            type: "Adult",
            index: i,
            firstName: i === 1 ? "John" : i === 2 ? "Sarah" : "Michael",
            middleName: i === 1 ? "David" : i === 2 ? "Jane" : "Robert",
            lastName: i === 1 ? "Smith" : i === 2 ? "Johnson" : "Brown",
            email: i === 1 ? "john.smith@email.com" : i === 2 ? "sarah.johnson@email.com" : "michael.brown@email.com",
            gender: i === 1 ? "male" : i === 2 ? "female" : "male",
            phone: i === 1 ? "+1 (555) 123-4567" : i === 2 ? "+1 (555) 987-6543" : "+1 (555) 456-7890",
            isContact: i === 1,
            hasDisability: i === 2 ? true : false,
            disabilityType: i === 2 ? "hearing" : "",
          })
        }

        // Add children
        for (let i = 1; i <= child; i++) {
          list.push({
            type: "Child",
            index: i,
            firstName: i === 1 ? "Emma" : "Oliver",
            middleName: i === 1 ? "Grace" : "James",
            lastName: i === 1 ? "Smith" : "Johnson",
            email: "",
            gender: i === 1 ? "female" : "male",
            phone: "",
            isContact: false,
            hasDisability: false,
            disabilityType: "",
          })
        }

        // Add infants
        for (let i = 1; i <= infants; i++) {
          list.push({
            type: "Infant",
            index: i,
            firstName: i === 1 ? "Baby" : "Little",
            middleName: "",
            lastName: i === 1 ? "Smith" : "Johnson",
            email: "",
            gender: i === 1 ? "female" : "male",
            phone: "",
            isContact: false,
            hasDisability: false,
            disabilityType: "",
          })
        }

        setPassengerFormList(list)
        setLoading(false)
      } else {
        const rawFlightData = JSON.parse(raw)
        const flightInfo = rawFlightData.passengerInfo
        const { adults: adultCount = 0, child: childCount = 0, infants: infantCount = 0 } = flightInfo
        const list = []

        // Add adults
        for (let i = 1; i <= adultCount; i++) {
          list.push({
            type: "Adult",
            index: i,
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            gender: "",
            phone: "",
            isContact: false,
            hasDisability: false,
            disabilityType: "",
          })
        }

        // Add children
        for (let i = 1; i <= childCount; i++) {
          list.push({
            type: "Child",
            index: i,
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            gender: "",
            phone: "",
            isContact: false,
            hasDisability: false,
            disabilityType: "",
          })
        }

        // Add infants
        for (let i = 1; i <= infantCount; i++) {
          list.push({
            type: "Infant",
            index: i,
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            gender: "",
            phone: "",
            isContact: false,
            hasDisability: false,
            disabilityType: "",
          })
        }

        setPassengerFormList(list)
        setLoading(false)
      }
    } catch (e) {
      console.error("Invalid selectedFlightInformation in localStorage", e)
      setError("Failed to load flight information. Please try again.")
      setLoading(false)
    }
  }, [])

  const current = passengerFormList[currentIdx]
  const progress = ((currentIdx + 1) / passengerFormList.length) * 100

  const updateCurrent = (changes) => {
    const updatedList = [...passengerFormList]
    updatedList[currentIdx] = {
      ...updatedList[currentIdx],
      ...changes,
    }
    setPassengerFormList(updatedList)
  }

  const isCurrentFormValid = () => {
    if (!current) return false
    return current.firstName.trim() && current.lastName.trim() && current.gender
  }

  const isFormComplete = (passenger) => {
    return passenger.firstName.trim() && passenger.lastName.trim() && passenger.gender
  }

  const goNext = () => {
    if (!isCurrentFormValid()) {
      setError("Please fill in all required fields before proceeding.")
      return
    }

    setError(null)

    if (currentIdx < passengerFormList.length - 1) {
      setCurrentIdx(currentIdx + 1)
    } else {
      console.log("Final passenger list:", passengerFormList)
      localStorage.setItem("filledPassengerForms", JSON.stringify(passengerFormList))
      setCurrentStep(2);
      // Navigate to next step or show completion message
    }
  }

  const goPrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
      setError(null)
    }
  }

  const getPassengerIcon = (type) => {
    switch (type) {
      case "Adult":
        return <User className="h-4 w-4" />
      case "Child":
        return <Users className="h-4 w-4" />
      case "Infant":
        return <Baby className="h-4 w-4" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading passenger forms...</p>
        </div>
      </div>
    )
  }

  if (error && passengerFormList.length === 0) {
    return (
      <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    )
  }

  if (!current) {
    return (
      <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
          <p className="text-red-800">No passenger data available.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div onClick={() => setCurrentStep(0)} className="relative w-fit h-fit bg-black flex items-center gap-2 px-5 py-2 rounded-md hover:bg-gray-400">
            <ChevronLeft  className="text-white font-semibold"/>
            <h1 className="text-white font-semibold">Back to previous step</h1>
      </div>
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Passenger Details</h1>
        <p className="text-gray-600">Please provide information for all passengers</p>
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>
              {currentIdx + 1} of {passengerFormList.length}
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-amber-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Passenger List Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Passengers</h3>
          </div>
          <div className="p-6 space-y-2">
            {passengerFormList.map((passenger, index) => (
              <div
                key={`${passenger.type}-${passenger.index}`}
                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentIdx
                    ? "bg-amber-50 border-2 border-amber-200"
                    : "hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {getPassengerIcon(passenger.type)}
                  <div>
                    <p className="font-medium text-sm">
                      {passenger.type} {passenger.index}
                    </p>
                    {passenger.firstName && (
                      <p className="text-xs text-gray-600">
                        {passenger.firstName} {passenger.lastName}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {passenger.isContact && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Contact
                    </span>
                  )}
                  {isFormComplete(passenger) && <CheckCircle2 className="h-4 w-4 text-green-500" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Form */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {current.type} {current.index} Information
              </h2>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  current.type === "Adult"
                    ? "bg-gray-900 text-white"
                    : current.type === "Child"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-gray-50 text-gray-600 border border-gray-200"
                }`}
              >
                {current.type}
              </span>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={current.firstName}
                    onChange={(e) => updateCurrent({ firstName: e.target.value })}
                    placeholder="Enter first name"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      !current.firstName.trim() ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="middleName" className="block text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <input
                    id="middleName"
                    type="text"
                    value={current.middleName}
                    onChange={(e) => updateCurrent({ middleName: e.target.value })}
                    placeholder="Enter middle name (optional)"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={current.lastName}
                    onChange={(e) => updateCurrent({ lastName: e.target.value })}
                    placeholder="Enter last name"
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      !current.lastName.trim() ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                    Gender *
                  </label>
                  <div className="relative">
                    <select
                      id="gender"
                      value={current.gender}
                      onChange={(e) => updateCurrent({ gender: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white ${
                        !current.gender ? "border-red-300" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-200" />

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      value={current.email}
                      onChange={(e) => updateCurrent({ email: e.target.value })}
                      placeholder="Enter email address"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={current.phone}
                      onChange={(e) => updateCurrent({ phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Separator */}
            <hr className="border-gray-200" />

            {/* Additional Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Additional Options</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    id="isContact"
                    type="checkbox"
                    checked={current.isContact}
                    onChange={(e) => {
                      const updatedList = passengerFormList.map((p, idx) => ({
                        ...p,
                        isContact: idx === currentIdx ? e.target.checked : false,
                      }))
                      setPassengerFormList(updatedList)
                    }}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isContact" className="text-sm font-medium text-gray-700">
                    Set as primary contact person
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="hasDisability"
                    type="checkbox"
                    checked={current.hasDisability}
                    onChange={(e) => updateCurrent({ hasDisability: e.target.checked, disabilityType: "" })}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="hasDisability" className="text-sm font-medium text-gray-700">
                    Passenger has special assistance needs
                  </label>
                </div>

                {current.hasDisability && (
                  <div className="ml-6 space-y-2">
                    <label htmlFor="disabilityType" className="block text-sm font-medium text-gray-700">
                      Type of Assistance Needed
                    </label>
                    <div className="relative">
                      <select
                        id="disabilityType"
                        value={current.disabilityType}
                        onChange={(e) => updateCurrent({ disabilityType: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 appearance-none bg-white"
                      >
                        <option value="">Select assistance type</option>
                        <option value="hearing">Hearing Assistance</option>
                        <option value="seeing">Visual Assistance</option>
                        <option value="speech">Speech Assistance</option>
                        <option value="movement">Mobility Assistance</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <button
                onClick={goPrevious}
                disabled={currentIdx === 0}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={goNext}
                disabled={!isCurrentFormValid()}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentIdx < passengerFormList.length - 1 ? "Next Passenger" : "Complete Booking"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassengerDetails
