"use client"
import React, { useEffect, useState } from 'react'
import Location_Library from "@/json-library/location-distance.json"
import FlightHeader from './components/flight-header'
import FlightCalender from './components/flight-calender'
import PassengerBooking from './components/passenger-booking'
import { Plane, Calendar, Clock, MapPin } from "lucide-react"

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
              <div className="border rounded-2xl shadow-md p-6 max-w-2xl mx-auto bg-white space-y-4">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-amber-600">Flight {selectedFlightInformation.id || 'N/A'}</div>
                  <div className="text-sm text-gray-500">
                    {selectedFlightInformation.bookingReference && `Booking Ref: ${selectedFlightInformation.bookingReference}`}
                  </div>
                </div>
        
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-semibold">{selectedFlightInformation.departureCity || 'N/A'}</p>
                    <p className="text-gray-500">{selectedFlightInformation.departureTime || ''}</p>
                  </div>
                  <Plane className="w-6 h-6 text-gray-400" />
                  <div>
                    <p className="text-lg font-semibold">{selectedFlightInformation.arrivalCity || 'N/A'}</p>
                    <p className="text-gray-500">{selectedFlightInformation.arrivalTime || ''}</p>
                  </div>
                </div>
        
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedFlightInformation.date || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {selectedFlightInformation.duration || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>Trip: {selectedFlightInformation.passengerInfo?.trip_type || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">Fare:</span>
                    <span>
                      {selectedFlightInformation.selectedFareClass || 'N/A'} - 
                      GHS {selectedFlightInformation.selectedPrice || '0.00'}
                    </span>
                  </div>
                </div>
        
                {selectedFlightInformation.passengerInfo && (
                  <div className="text-sm text-gray-700">
                    <p>
                      Passengers: {selectedFlightInformation.passengerInfo.adults || 0} Adult(s),{" "}
                      {selectedFlightInformation.passengerInfo.child || 0} Child(ren),{" "}
                      {selectedFlightInformation.passengerInfo.infants || 0} Infant(s)
                    </p>
                    {selectedFlightInformation.passengerInfo.return && (
                      <p>Return: {selectedFlightInformation.passengerInfo.return}</p>
                    )}
                  </div>
                )}
        
                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => setSelectedFlightInformation(null)}
                    className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                  >
                    Back
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700">
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
            Passenger
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