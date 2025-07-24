"use client"
import React, { useEffect, useState } from 'react'
import Location_Library from "@/json-library/location-distance.json"
import FlightHeader from './components/flight-header'
import FlightCalender from './components/flight-calender'
import PassengerBooking from './components/passenger-booking'
import {Users, X, Plane, Calendar, Clock, MapPin } from "lucide-react"
import PassengerDetails from './components/passenger-details'


const steps = [
  "Flight Section",
  "Passenger",
  "Additional Service",
  "Payment",
  "Confirmation"
];


const FlightSection = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [sectionName, setSectionName] = useState("")
  const [flightInformation, setFlightInformation] = useState({
    totalPrice: "",
    from: "",
    to: "",
  })
  const [theFlightInfo, setTheFlightInfo] = useState({})
  const [flightPrice, setFlightPrice] = useState(0)
  const [currentDate, setCurrentDate] = useState("");
  const [selectedFlightInformation, setSelectedFlightInformation] = useState({})

  useEffect(() =>{
    const flight_data_information = localStorage.getItem("flightFormData")
    const flight_data = JSON.parse(flight_data_information);
    setTheFlightInfo(flight_data);
    console.log(flight_data)
    
    const random_generatedPrice = price_generator_oneway(flight_data.from, flight_data.to);
    setFlightPrice(random_generatedPrice);
    
  }, [])

  useEffect(() => {
    console.log(selectedFlightInformation);
  }, [selectedFlightInformation])

  const renderPageSection = () => {
    switch (currentStep) {
      case 0:
        return (
          <div>
            <FlightCalender setCurrentDate={setCurrentDate}/>
            {selectedFlightInformation && selectedFlightInformation.id ? (
           <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-3xl mx-auto space-y-6 relative overflow-hidden">
           {/* Background Pattern */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
     
           {/* Header */}
           <div className="flex justify-between items-start relative z-10">
             <div className="space-y-1">
               <div className="flex items-center gap-3">
                 <div className="bg-amber-100 p-2 rounded-lg">
                   <Plane className="w-5 h-5 text-amber-600" />
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-gray-900">Flight {selectedFlightInformation.id || "N/A"}</h2>
                   {selectedFlightInformation.bookingReference && (
                     <p className="text-sm text-gray-500 font-medium">
                       Booking Reference: {selectedFlightInformation.bookingReference}
                     </p>
                   )}
                 </div>
               </div>
             </div>
             <button
               onClick={() => setSelectedFlightInformation(null)}
               className="p-2 hover:bg-gray-100 rounded-full transition-colors"
               aria-label="Close flight details"
             >
               <X className="w-5 h-5 text-gray-400" />
             </button>
           </div>
     
           {/* Flight Route */}
           <div className="bg-gray-50 rounded-xl p-6">
             <div className="flex items-center justify-between">
               <div className="text-center flex-1">
                 <div className="space-y-2">
                   <p className="text-2xl font-bold text-gray-900">{selectedFlightInformation.departureCity || "N/A"}</p>
                   <p className="text-lg font-semibold text-amber-600">
                     {selectedFlightInformation.departureTime || "--:--"}
                   </p>
                   <p className="text-sm text-gray-500 font-medium">Departure</p>
                 </div>
               </div>
     
               <div className="flex-1 flex items-center justify-center px-4">
                 <div className="flex items-center space-x-2">
                   <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                   <div className="flex-1 h-0.5 bg-gradient-to-r from-amber-600 to-gray-300"></div>
                   <Plane className="w-6 h-6 text-amber-600 transform rotate-90" />
                   <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-300 to-amber-600"></div>
                   <div className="w-3 h-3 bg-amber-600 rounded-full"></div>
                 </div>
               </div>
     
               <div className="text-center flex-1">
                 <div className="space-y-2">
                   <p className="text-2xl font-bold text-gray-900">{selectedFlightInformation.arrivalCity || "N/A"}</p>
                   <p className="text-lg font-semibold text-amber-600">{selectedFlightInformation.arrivalTime || "--:--"}</p>
                   <p className="text-sm text-gray-500 font-medium">Arrival</p>
                 </div>
               </div>
             </div>
           </div>
     
           {/* Flight Details Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3">
                 <div className="bg-blue-100 p-2 rounded-lg">
                   <Calendar className="w-4 h-4 text-blue-600" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 font-medium">Flight Date</p>
                   <p className="text-lg font-semibold text-gray-900">{selectedFlightInformation.date || "N/A"}</p>
                 </div>
               </div>
             </div>
     
             <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3">
                 <div className="bg-green-100 p-2 rounded-lg">
                   <Clock className="w-4 h-4 text-green-600" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 font-medium">Duration</p>
                   <p className="text-lg font-semibold text-gray-900">{selectedFlightInformation.duration || "N/A"}</p>
                 </div>
               </div>
             </div>
     
             <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3">
                 <div className="bg-purple-100 p-2 rounded-lg">
                   <MapPin className="w-4 h-4 text-purple-600" />
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 font-medium">Trip Type</p>
                   <p className="text-lg font-semibold text-gray-900">
                     {selectedFlightInformation.passengerInfo?.trip_type || "N/A"}
                   </p>
                 </div>
               </div>
             </div>
     
             <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
               <div className="flex items-center gap-3">
                 <div className="bg-amber-100 p-2 rounded-lg">
                   <span className="text-amber-600 font-bold text-sm">GHS</span>
                 </div>
                 <div>
                   <p className="text-sm text-gray-500 font-medium">
                     {selectedFlightInformation.selectedFareClass || "Standard"} Fare
                   </p>
                   <p className="text-lg font-semibold text-gray-900">
                     GHS {selectedFlightInformation.selectedPrice || "0.00"}
                   </p>
                 </div>
               </div>
             </div>
           </div>
     
           {/* Passenger Information */}
           {selectedFlightInformation.passengerInfo && (
             <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
               <div className="flex items-center gap-3 mb-4">
                 <div className="bg-amber-100 p-2 rounded-lg">
                   <Users className="w-5 h-5 text-amber-600" />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900">Passenger Details</h3>
               </div>
     
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="text-center">
                   <p className="text-2xl font-bold text-amber-600">{selectedFlightInformation.passengerInfo.adults || 0}</p>
                   <p className="text-sm text-gray-600 font-medium">
                     Adult{(selectedFlightInformation.passengerInfo.adults || 0) !== 1 ? "s" : ""}
                   </p>
                 </div>
                 <div className="text-center">
                   <p className="text-2xl font-bold text-amber-600">{selectedFlightInformation.passengerInfo.child || 0}</p>
                   <p className="text-sm text-gray-600 font-medium">
                     Child{(selectedFlightInformation.passengerInfo.child || 0) !== 1 ? "ren" : ""}
                   </p>
                 </div>
                 <div className="text-center">
                   <p className="text-2xl font-bold text-amber-600">
                     {selectedFlightInformation.passengerInfo.infants || 0}
                   </p>
                   <p className="text-sm text-gray-600 font-medium">
                     Infant{(selectedFlightInformation.passengerInfo.infants || 0) !== 1 ? "s" : ""}
                   </p>
                 </div>
               </div>
     
               {selectedFlightInformation.passengerInfo.return && (
                 <div className="mt-4 pt-4 border-t border-amber-200">
                   <p className="text-sm text-gray-700">
                     <span className="font-medium">Return Flight:</span> {selectedFlightInformation.passengerInfo.return}
                   </p>
                 </div>
               )}
             </div>
           )}
     
           {/* Action Buttons */}
           <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
             <button
               onClick={() => setSelectedFlightInformation(null)}
               className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
             >
               Cancel Booking
             </button>
             <button
               onClick={() => setCurrentStep(1)}
               className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
             >
               Confirm Booking
             </button>
           </div>
         </div>
            ) : (
            <div>
                <PassengerBooking currentDate={currentDate} setSelectedFlightInformation={setSelectedFlightInformation}/>
            </div>
            )}
          </div>
        )
      case 1:
        return (
          <div>
              <PassengerDetails setCurrentStep={setCurrentStep}/>
          </div>
        )
      case 2:
        return (
          <div>
            Additional Service Section
          </div>
        )
      case 3:
        return (
          <div>
            Payment Section
          </div>
        )
      case 4:
        return (
          <div>
            Confirmation Section
          </div>
        )
      default:
        return null
    }
  }


  // Price generator for one-way flights

  const price_generator_oneway = (location_from, location_to) => {
    const pricePerKm = 3
    if (location_to === location_from) {
      alert("locations cannot be the same")
      return
    }


    if (
      location_from &&
      location_to &&
      Location_Library[location_from] &&
      Location_Library[location_from][location_to]
    ) {
      const distance = parseInt(Location_Library[location_from][location_to].distance)
      return pricePerKm * distance
    }
    return null
  }

  //Main return statement
  return (
<div className="min-h-screen w-full relative p-1 sm:p-2">
  {/* Stepper */}
  <div className="w-full flex flex-row items-center justify-center space-x-1 sm:space-x-2 md:space-x-4">
    {steps.map((step, idx) => (
      <div
        key={step}
        className="flex flex-col items-center cursor-pointer"
      >
        <div
          className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full font-bold mb-0.5 sm:mb-1 md:mb-1.5
            ${currentStep === idx ? "bg-amber-700 text-white" : "bg-amber-500 text-white"}
          `}
        >
          <span className="text-xs sm:text-sm">{idx + 1}</span>
        </div>
        <span
          className={`text-[9px] sm:text-[11px] md:text-xs font-semibold text-center leading-tight
            ${currentStep === idx ? "text-amber-700" : "text-amber-500"}
          `}
          style={{ maxWidth: 60 }}
        >
          {step}
        </span>
      </div>
    ))}
  </div>

      {/* Section Content */}
      <div className="w-full flex flex-col space-y-6 sm:space-y-8 md:space-y-10 mt-4">
        <FlightHeader theFlightInfo = {theFlightInfo} flightPrice = {flightPrice} />
        {renderPageSection()}
      </div>
    </div>
  )
}

export default FlightSection