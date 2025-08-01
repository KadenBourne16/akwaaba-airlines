"use client"

import React, { useState } from "react"
import { Eye, EyeOff, Mail, Lock, Plane, User, Phone, BadgeIcon as IdCard, Users } from "lucide-react"

const AuthSystem = ({ onLogin, onSignUp }) => {
  const [activeTab, setActiveTab] = useState("client")
  const [clientMode, setClientMode] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Flight Service Form Data
  const [flightServiceData, setFlightServiceData] = useState({
    staffId: "",
    password: "",
  })

  // Client Form Data
  const [clientData, setClientData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})

  const handleFlightServiceChange = (field, value) => {
    setFlightServiceData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleClientChange = (field, value) => {
    setClientData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateFlightService = () => {
    const newErrors = {}

    if (!flightServiceData.staffId) {
      newErrors.staffId = "Staff ID is required"
    } else if (flightServiceData.staffId.length < 3) {
      newErrors.staffId = "Staff ID must be at least 3 characters"
    }

    if (!flightServiceData.password) {
      newErrors.password = "Password is required"
    } else if (flightServiceData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateClient = () => {
    const newErrors = {}

    // Email validation
    if (!clientData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(clientData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    // Password validation
    if (!clientData.password) {
      newErrors.password = "Password is required"
    } else if (clientData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    // Sign up specific validations
    if (clientMode === "signup") {
      if (!clientData.firstName) {
        newErrors.firstName = "First name is required"
      }
      if (!clientData.lastName) {
        newErrors.lastName = "Last name is required"
      }
      if (!clientData.phone) {
        newErrors.phone = "Phone number is required"
      }
      if (clientData.password !== clientData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    let isValid = false
    if (activeTab === "flight-service") {
      isValid = validateFlightService()
    } else {
      isValid = validateClient()
    }

    if (!isValid) return

    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (activeTab === "flight-service") {
        // Mock staff login
        const userData = {
          id: "staff123",
          staffId: flightServiceData.staffId,
          name: "John Staff",
          role: "Flight Attendant",
          department: "Flight Operations",
        }
        onLogin?.(userData, "flight-service")
        console.log("Staff login successful:", userData)
      } else if (clientMode === "login") {
        // Mock client login
        const userData = {
          id: "client123",
          email: clientData.email,
          firstName: "Jane",
          lastName: "Doe",
          phone: "+233 123 456 789",
        }
        onLogin?.(userData, "client")
        console.log("Client login successful:", userData)
      } else {
        // Mock client signup
        const userData = {
          id: "client" + Date.now(),
          email: clientData.email,
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          phone: clientData.phone,
        }
        onSignUp?.(userData)
        console.log("Client signup successful:", userData)
      }
      setLoading(false)
    }, 1500)
  }

  const switchClientMode = () => {
    setClientMode(clientMode === "login" ? "signup" : "login")
    setClientData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      confirmPassword: "",
    })
    setErrors({})
  }

  const switchTab = (tab) => {
    setActiveTab(tab)
    setErrors({})
    setFlightServiceData({ staffId: "", password: "" })
    setClientData({
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
      confirmPassword: "",
    })
    setClientMode("login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-orange-200/30 to-transparent rounded-full"></div>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl mb-4 shadow-lg">
            <Plane className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Akwaaba Airlines</h1>
          <p className="text-gray-600">Access your account to manage flights and bookings</p>
        </div>

        {/* Main Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Account Type Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => switchTab("client")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                activeTab === "client"
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                Client
              </div>
            </button>
            <button
              onClick={() => switchTab("flight-service")}
              className={`flex-1 px-6 py-4 text-sm font-semibold transition-all duration-200 ${
                activeTab === "flight-service"
                  ? "bg-amber-600 text-white shadow-lg"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <Plane className="w-4 h-4" />
                Flight Service
              </div>
            </button>
          </div>

          <div className="p-8">
            {/* Flight Service Form */}
            {activeTab === "flight-service" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Staff Login</h2>
                  <p className="text-gray-600 text-sm">Enter your staff credentials to access the system</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Staff ID */}
                  <div className="space-y-2">
                    <label htmlFor="staffId" className="block text-sm font-medium text-gray-700">
                      Staff ID *
                    </label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="staffId"
                        type="text"
                        value={flightServiceData.staffId}
                        onChange={(e) => handleFlightServiceChange("staffId", e.target.value)}
                        placeholder="Enter your staff ID"
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                          errors.staffId ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.staffId && <p className="text-red-600 text-xs">{errors.staffId}</p>}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label htmlFor="staffPassword" className="block text-sm font-medium text-gray-700">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="staffPassword"
                        type={showPassword ? "text" : "password"}
                        value={flightServiceData.password}
                        onChange={(e) => handleFlightServiceChange("password", e.target.value)}
                        placeholder="Enter your password"
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                          errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing In...
                      </div>
                    ) : (
                      "Sign In as Staff"
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Client Form */}
            {activeTab === "client" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {clientMode === "login" ? "Client Login" : "Create Account"}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {clientMode === "login"
                      ? "Enter your credentials to access your account"
                      : "Fill in your details to create a new account"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Sign Up Fields */}
                  {clientMode === "signup" && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name *
                          </label>
                          <div className="relative">
                            <User  className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              id="firstName"
                              type="text"
                              value={clientData.firstName}
                              onChange={(e) => handleClientChange("firstName", e.target.value)}
                              placeholder="John"
                              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                                errors.firstName ? "border-red-300 bg-red-50" : "border-gray-300"
                              }`}
                            />
                          </div>
                          {errors.firstName && <p className="text-red-600 text-xs">{errors.firstName}</p>}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name *
                          </label>
                          <div className="relative">
                            <User  className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              id="lastName"
                              type="text"
                              value={clientData.lastName}
                              onChange={(e) => handleClientChange("lastName", e.target.value)}
                              placeholder="Doe"
                              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                                errors.lastName ? "border-red-300 bg-red-50" : "border-gray-300"
                              }`}
                            />
                          </div>
                          {errors.lastName && <p className="text-red-600 text-xs">{errors.lastName}</p>}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            id="phone"
                            type="tel"
                            value={clientData.phone}
                            onChange={(e) => handleClientChange("phone", e.target.value)}
                            placeholder="+233 123 456 789"
                            className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                              errors.phone ? "border-red-300 bg-red-50" : "border-gray-300"
                            }`}
                          />
                        </div>
                        {errors.phone && <p className="text-red-600 text-xs">{errors.phone}</p>}
                      </div>
                    </>
                  )}

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={clientData.email}
                        onChange={(e) => handleClientChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                          errors.email ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="clientPassword" className="block text-sm font-medium text-gray-700">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <input
                        id="clientPassword"
                        type={showPassword ? "text" : "password"}
                        value={clientData.password}
                        onChange={(e) => handleClientChange("password", e.target.value)}
                        placeholder="Enter your password"
                        className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                          errors.password ? "border-red-300 bg-red-50" : "border-gray-300"
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
                  </div>

                  {/* Confirm Password (Sign Up Only) */}
                  {clientMode === "signup" && (
                    <div className="space-y-2">
                                           <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={clientData.confirmPassword}
                          onChange={(e) => handleClientChange("confirmPassword", e.target.value)}
                          placeholder="Confirm your password"
                          className={`w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors ${
                            errors.confirmPassword ? "border-red-300 bg-red-50" : "border-gray-300"
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-red-600 text-xs">{errors.confirmPassword}</p>}
                    </div>
                  )}

                  {/* Forgot Password (Login Only) */}
                  {clientMode === "login" && (
                    <div className="text-right">
                      <button type="button" className="text-sm text-amber-600 hover:text-amber-700 font-medium">
                        Forgot your password?
                      </button>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {clientMode === "login" ? "Signing In..." : "Creating Account..."}
                      </div>
                    ) : (
                      <>{clientMode === "login" ? "Sign In" : "Create Account"}</>
                    )}
                  </button>
                </form>

                {/* Switch Mode (Client Only) */}
                <div className="mt-6 text-center">
                  <p className="text-gray-600 text-sm">
                    {clientMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button onClick={switchClientMode} className="text-amber-600 hover:text-amber-700 font-semibold">
                      {clientMode === "login" ? "Sign Up" : "Sign In"}
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>&copy; 2024 Akwaaba Airlines. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default AuthSystem
