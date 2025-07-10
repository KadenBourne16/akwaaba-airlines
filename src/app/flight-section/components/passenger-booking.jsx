"use client"

import { useState, useEffect } from "react"
import { Plane, Info } from "lucide-react"
import Location_Library from "@/json-library/location-distance.json"

// Utility Functions
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function pad(num) {
  return num.toString().padStart(2, "0")
}

function caculateFlightDuration(location_from, location_to){
    const speed = 500;
    const distance = Location_Library[location_from][location_to].distance;
    const duration = distance / speed;
    return duration;
}

function addMinutesToTime(time, minsToAdd) {
  const [h, m] = time.split(":").map(Number)
  const date = new Date()
  date.setHours(h, m + minsToAdd, 0, 0)
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`
}

// Generate seat prices for a flight
function generateAvailableSeat(location_from, location_to) {
  const pricePerKm = 3

  const seatData = {
    Promotion: null,
    Bronze: null,
    Silver: null,
    Gold: null,
  }

  if (
    location_from &&
    location_to &&
    Location_Library[location_from] &&
    Location_Library[location_from][location_to]
  ) {
    const distance = parseInt(Location_Library[location_from][location_to].distance)
    const basePrice = pricePerKm * distance

    Object.keys(seatData).forEach((fareClass) => {
      if (Math.random() < 0.5) {
        const multiplier = {
          Promotion: 0.8,
          Bronze: 1,
          Silver: 1.2,
          Gold: 1.5,
        }[fareClass]
        seatData[fareClass] = Math.floor(basePrice * multiplier)
      }
    })
  }

  return seatData
}

// Main component
const PassengerBooking = ({currentDate}) => {
  const [selectedFlight, setSelectedFlight] = useState(null)
  const [flights, setFlights] = useState([])




  const fareClasses = [
    {
      name: "Promotion",
      color: "text-white",
      bgColor: "bg-green-500",
    },
    {
      name: "Bronze",
      color: "text-white",
      bgColor: "bg-orange-600",
    },
    {
      name: "Silver",
      color: "text-white",
      bgColor: "bg-gray-400",
    },
    {
      name: "Gold",
      color: "text-white",
      bgColor: "bg-yellow-500",
    },
  ]

  useEffect(() => {
    const numFlights = getRandomInt(1, 15)
    const flightsArr = []
    let usedTimes = new Set()
    const theFlightData = localStorage.getItem("flightFormData")
    const flightData = JSON.parse(theFlightData)
  
    for (let i = 0; i < numFlights; i++) {
      let hour = getRandomInt(6, 20)
      let minute = getRandomInt(0, 1) === 0 ? 0 : 30
      let depTime = `${pad(hour)}:${pad(minute)}`
      while (usedTimes.has(depTime)) {
        hour = getRandomInt(6, 20)
        minute = getRandomInt(0, 1) === 0 ? 0 : 30
        depTime = `${pad(hour)}:${pad(minute)}`
      }
      usedTimes.add(depTime)
  
      const arrTime = addMinutesToTime(depTime, 50)
      const seatPrices = generateAvailableSeat(flightData.from, flightData.to)
      const duration = caculateFlightDuration(flightData.from, flightData.to)
  
      flightsArr.push({
        id: `AK${pad(i + 1)}`,
        departureTime: depTime,
        arrivalTime: arrTime,
        departureCity: flightData.from,
        arrivalCity: flightData.to,
        date: currentDate, // use currentDate dynamically
        duration: `${duration}h`,
        flightType: "Nonstop",
        seatPrices,
      })
    }
    setFlights(flightsArr)
  }, [currentDate]) // ✅ Watch for changes
  

  const handleFlightInfo = (flightId) => {
    setSelectedFlight(selectedFlight === flightId ? null : flightId)
  }

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="text-sm text-gray-600">
            Number of flights <span className="font-semibold text-gray-900">{flights.length}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {fareClasses.map((fareClass, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-lg font-medium text-xs sm:text-sm ${fareClass.bgColor} ${fareClass.color} min-w-[80px] sm:min-w-[100px] text-center`}
              >
                {fareClass.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flight List */}
      <div className="space-y-4">
        {flights.map((flight) => (
          <div key={flight.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-3 sm:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 w-full md:w-auto">
                  <div className="text-left min-w-[80px]">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{flight.departureTime}</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">{flight.departureCity}</div>
                    <div className="text-xs text-gray-500">{flight.date}</div>
                  </div>

                  <div className="flex items-center space-x-2 min-w-[120px] sm:min-w-[200px]">
                    <div className="flex items-center space-x-2 w-full">
                      <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 transform rotate-90" />
                      <div className="flex-1 border-t-2 border-dashed border-amber-300"></div>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{flight.duration}</div>
                      <div className="flex-1 border-t-2 border-dashed border-amber-300"></div>
                      <Plane className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 transform rotate-90" />
                    </div>
                  </div>

                  <div className="text-left min-w-[80px]">
                    <div className="text-xl sm:text-2xl font-bold text-gray-900">{flight.arrivalTime}</div>
                    <div className="text-xs sm:text-sm font-medium text-gray-700">{flight.arrivalCity}</div>
                    <div className="text-xs text-gray-500">{flight.date}</div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs sm:text-sm text-gray-600">{flight.flightType}</div>
                  </div>
                </div>

                {/* Fare Class Prices */}
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-start md:justify-end">
                  {fareClasses.map((fareClass, index) => {
                    const price = flight.seatPrices[fareClass.name]
                    return (
                      <div key={index} className="w-20 sm:w-24 text-center">
                        <div >
                          {price ? (
                            <div className="border border-gray-200 rounded-lg p-2 sm:p-4 bg-green-500 hover:bg-green-400 hover:cursor-pointer">
                              <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-white mx-auto mb-1 sm:mb-2" />
                              <div className="text-xs text-white font-semibold">₵{price}</div>
                            </div>
                          ) : (
                            <div className="border border-gray-200 rounded-lg p-2 sm:p-4 bg-gray-50">
                              <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 mx-auto mb-1 sm:mb-2" />
                                <div className="text-xs text-gray-400 font-medium">NO SEAT</div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Flight Info Button */}
              <div className="mt-3 flex items-center">
                <button
                  onClick={() => handleFlightInfo(flight.id)}
                  className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium text-xs sm:text-sm transition-colors duration-200"
                >
                  <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center">
                    <Info className="w-3 h-3 text-white" />
                  </div>
                  <span>Flight Info</span>
                </button>
              </div>

              {selectedFlight === flight.id && (
                <div className="mt-3 p-3 sm:mt-4 sm:p-4 bg-gray-50 rounded-lg border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Aircraft</div>
                      <div className="text-gray-600">Boeing 737-800</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Flight Number</div>
                      <div className="text-gray-600">{flight.id}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-700 mb-1">Baggage</div>
                      <div className="text-gray-600">23kg included</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default PassengerBooking
