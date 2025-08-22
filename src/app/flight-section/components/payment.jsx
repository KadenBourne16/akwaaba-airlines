"use client"

import { useState } from "react"
import { CreditCard, Smartphone, Mail, Lock, Phone, Calendar, Shield, ArrowLeft, CheckCircle } from "lucide-react"

const PaymentPage = ({ bookingDetails, onPaymentComplete, onBack }) => {
  const amount = bookingDetails?.totalAmount || '0.00';
  const [selectedPayment, setSelectedPayment] = useState("visa")
  const [loading, setLoading] = useState(false)
  const [paymentData, setPaymentData] = useState({
    // Visa/Card details
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",

    // PayPal details
    paypalEmail: "",

    // Mobile Money details
    phoneNumber: "",
    pin: "",
  })
  const [errors, setErrors] = useState({})

  const paymentMethods = [
    {
      id: "visa",
      name: "Visa Card",
      icon: <CreditCard className="w-6 h-6" />,
      description: "Pay with your Visa credit or debit card",
      color: "bg-blue-600",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <Mail className="w-6 h-6" />,
      description: "Pay securely with your PayPal account",
      color: "bg-blue-500",
    },
    {
      id: "mtn-momo",
      name: "MTN MoMo",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Pay with MTN Mobile Money",
      color: "bg-yellow-500",
    },
    {
      id: "telecel-cash",
      name: "Telecel Cash",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Pay with Telecel Cash",
      color: "bg-red-500",
    },
    {
      id: "airteltigo-cash",
      name: "AirtelTigo Cash",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Pay with AirtelTigo Cash",
      color: "bg-red-600",
    },
  ]

  const handleInputChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validatePayment = () => {
    const newErrors = {};

    switch (selectedPayment) {
      case "visa":
        if (!paymentData.cardNumber) {
          newErrors.cardNumber = "Card number is required";
        } else if (paymentData.cardNumber.replace(/\s/g, "").length !== 16) {
          newErrors.cardNumber = "Card number must be 16 digits";
        }

        if (!paymentData.expiryDate) {
          newErrors.expiryDate = "Expiry date is required";
        } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiryDate)) {
          newErrors.expiryDate = "Invalid expiry date format (MM/YY)";
        }

        if (!paymentData.cvv) {
          newErrors.cvv = "CVV is required";
        } else if (paymentData.cvv.length !== 3) {
          newErrors.cvv = "CVV must be 3 digits";
        }

        if (!paymentData.cardholderName) {
          newErrors.cardholderName = "Cardholder name is required";
        }
        break;

      case "paypal":
        if (!paymentData.paypalEmail) {
          newErrors.paypalEmail = "PayPal email is required";
        } else if (!/\S+@\S+\.\S+/.test(paymentData.paypalEmail)) {
          newErrors.paypalEmail = "Please enter a valid email";
        }
        break;

      case "mtn-momo":
      case "telecel-cash":
      case "airteltigo-cash":
        if (!paymentData.phoneNumber) {
          newErrors.phoneNumber = "Phone number is required";
        } else if (!/^\+?233\d{9}$/.test(paymentData.phoneNumber.replace(/\s/g, ""))) {
          newErrors.phoneNumber = "Please enter a valid Ghana phone number";
        }

        if (!paymentData.pin) {
          newErrors.pin = "PIN is required";
        } else if (paymentData.pin.length !== 4) {
          newErrors.pin = "PIN must be 4 digits";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validatePayment()) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const paymentResult = {
          success: true,
          transactionId: 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase(),
          amount: amount,
          paymentMethod: selectedPayment,
          timestamp: new Date().toISOString(),
          bookingReference: bookingDetails?.bookingReference || 'N/A',
          flightId: bookingDetails?.flightId || 'N/A',
          passengerCount: bookingDetails?.passengerCount || 1
        };
        onPaymentComplete(paymentResult);
        setLoading(false);
      }, 1500);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "visa":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Card Number *</label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={paymentData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.cardNumber ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.cardNumber && <p className="text-red-600 text-xs mt-1">{errors.cardNumber}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Expiry Date *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={paymentData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.expiryDate ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.expiryDate && <p className="text-red-600 text-xs mt-1">{errors.expiryDate}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">CVV *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={paymentData.cvv}
                    onChange={(e) => handleInputChange("cvv", e.target.value.replace(/\D/g, ""))}
                    placeholder="123"
                    maxLength={3}
                    className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                      errors.cvv ? "border-red-300 bg-red-50" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.cvv && <p className="text-red-600 text-xs mt-1">{errors.cvv}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Cardholder Name *</label>
              <input
                type="text"
                value={paymentData.cardholderName}
                onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                placeholder="John Doe"
                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                  errors.cardholderName ? "border-red-300 bg-red-50" : "border-gray-300"
                }`}
              />
              {errors.cardholderName && <p className="text-red-600 text-xs mt-1">{errors.cardholderName}</p>}
            </div>
          </div>
        );

      case "mtn-momo":
      case "telecel-cash":
      case "airteltigo-cash":
        const serviceName = {
          'mtn-momo': 'MTN MoMo',
          'telecel-cash': 'Telecel Cash',
          'airteltigo-cash': 'AirtelTigo Cash'
        }[selectedPayment];

        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={paymentData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  placeholder="e.g., 0244123456"
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.phoneNumber ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">PIN *</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  value={paymentData.pin}
                  onChange={(e) => handleInputChange("pin", e.target.value)}
                  placeholder="Enter your 4-digit PIN"
                  maxLength={4}
                  className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                    errors.pin ? "border-red-300 bg-red-50" : "border-gray-300"
                  }`}
                />
              </div>
              {errors.pin && <p className="text-red-600 text-xs mt-1">{errors.pin}</p>}
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
              <p className="text-amber-700 text-sm">
                You will receive a prompt on your {serviceName} app to authorize this payment.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment</h1>
            <p className="text-gray-600">Complete your booking payment</p>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Flight</p>
              <p className="font-semibold">{bookingDetails?.flightId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-600">Passengers</p>
              <p className="font-semibold">{bookingDetails?.passengerCount || 1} Passenger(s)</p>
            </div>
            <div>
              <p className="text-gray-600">Total Amount</p>
              <p className="font-semibold text-xl text-amber-600">GHS {amount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h2>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedPayment === method.id
                      ? "border-amber-500 bg-amber-50 shadow-md"
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`${method.color} text-white p-2 rounded-lg`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.name}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                    {selectedPayment === method.id && (
                      <CheckCircle className="w-5 h-5 text-amber-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {renderPaymentForm()}

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                <p className="text-green-800 text-sm">Your payment information is encrypted and secure</p>
              </div>
            </div>

            {/* Payment Button */}
            <div className="mt-8">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-amber-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay GHS ${amount}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
