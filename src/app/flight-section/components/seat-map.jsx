"use client"

import { useState } from "react"
import { Plane, ArrowLeft } from "lucide-react"

const SeatMap = ({selectedFlightInformation}) => {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)

  // Generate seat positions for 50 seats
  // Gold: 2 rows x 4 seats = 8 seats (positions 1-8)
  // Silver: 3 rows x 4 seats = 12 seats (positions 9-20)
  // Bronze: 7.5 rows x 4 seats = 30 seats (positions 21-50)
  const generateSeats = () => {
    const seats = []
    let position = 1

    // Gold class - 2 rows, 4 seats each
    for (let row = 1; row <= 2; row++) {
      const rowSeats = []
      for (let col = 1; col <= 4; col++) {
        rowSeats.push({
          position: position++,
          row,
          col,
          class: "gold",
          id: `${row}-${col}`,
        })
      }
      seats.push({ class: "gold", row, seats: rowSeats })
    }

    // Silver class - 3 rows, 4 seats each
    for (let row = 3; row <= 5; row++) {
      const rowSeats = []
      for (let col = 1; col <= 4; col++) {
        rowSeats.push({
          position: position++,
          row,
          col,
          class: "silver",
          id: `${row}-${col}`,
        })
      }
      seats.push({ class: "silver", row, seats: rowSeats })
    }

    // Bronze class - 7 full rows + 1 partial row
    for (let row = 6; row <= 12; row++) {
      const rowSeats = []
      const seatsInRow = row === 12 ? 2 : 4 // Last row only has 2 seats
      for (let col = 1; col <= seatsInRow; col++) {
        rowSeats.push({
          position: position++,
          row,
          col,
          class: "bronze",
          id: `${row}-${col}`,
        })
      }
      seats.push({ class: "bronze", row, seats: rowSeats })
    }

    return seats
  }

  const seats = generateSeats()
  const [occupiedSeats] = useState(new Set(["1-1", "2-3", "3-4", "5-2", "7-1", "8-3", "10-2", "11-4"]))

  const getSeatStatus = (seatId) => {
    if (occupiedSeats.has(seatId)) return "occupied"
    if (selectedSeat === seatId) return "selected"
    return "available"
  }

  const handleSeatClick = (seat) => {
    const status = getSeatStatus(seat.id)
    if (status !== "occupied") {
      setSelectedSeat(seat.id)
      setSelectedClass(seat.class)
      onSeatSelect?.(seat.id, seat.class)
    }
  }

  const getSeatColors = (seatClass, status) => {
    if (status === "occupied") {
      return "bg-red-500 text-white cursor-not-allowed"
    }
    if (status === "selected") {
      return "bg-amber-500 text-white shadow-lg scale-110 ring-2 ring-amber-300"
    }

    switch (seatClass) {
      case "gold":
        return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 shadow-md"
      case "silver":
        return "bg-gradient-to-br from-gray-400 to-gray-600 text-white hover:from-gray-500 hover:to-gray-700 shadow-md"
      case "bronze":
        return "bg-gradient-to-br from-orange-400 to-orange-600 text-white hover:from-orange-500 hover:to-orange-700 shadow-md"
      default:
        return "bg-gray-200 text-gray-800"
    }
  }

  const getClassInfo = (className) => {
    switch (className) {
      case "gold":
        return {
          name: "Gold Service",
          description: "Premium comfort with extra legroom",
          color: "from-yellow-400 to-yellow-600",
          rows: "Rows 1-2",
        }
      case "silver":
        return {
          name: "Silver Service",
          description: "Enhanced comfort and priority boarding",
          color: "from-gray-400 to-gray-600",
          rows: "Rows 3-5",
        }
      case "bronze":
        return {
          name: "Bronze Service",
          description: "Standard comfort and service",
          color: "from-orange-400 to-orange-600",
          rows: "Rows 6-12",
        }
      default:
        return { name: "", description: "", color: "", rows: "" }
    }
  }

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
              Back to Flights
            </button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Select Your Seat</h1>
            <p className="text-gray-600">Flight {flightId} - Choose your preferred seat</p>
          </div>
        </div>

        {/* Service Class Legend */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {["gold", "silver", "bronze"].map((serviceClass) => {
            const info = getClassInfo(serviceClass)
            return (
              <div key={serviceClass} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className={`bg-gradient-to-r ${info.color} text-white p-4`}>
                  <h3 className="font-semibold text-lg">{info.name}</h3>
                  <p className="text-sm opacity-90">{info.rows}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600">{info.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Seat Status Legend */}
        <div className="flex flex-wrap gap-6 mb-6 p-4 bg-white rounded-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded text-white text-xs flex items-center justify-center font-bold">
              1
            </div>
            <span className="text-sm font-medium">Gold Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-600 rounded text-white text-xs flex items-center justify-center font-bold">
              1
            </div>
            <span className="text-sm font-medium">Silver Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
              1
            </div>
            <span className="text-sm font-medium">Bronze Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
              1
            </div>
            <span className="text-sm font-medium">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-amber-500 rounded text-white text-xs flex items-center justify-center font-bold shadow-lg">
              1
            </div>
            <span className="text-sm font-medium">Selected</span>
          </div>
        </div>
      </div>

      {/* Aircraft Seat Map */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
            <Plane className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">Aircraft Seat Map - 50 Seats</span>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="max-w-md mx-auto space-y-3">
          {seats.map((seatRow, rowIndex) => (
            <div key={rowIndex} className="flex justify-center items-center gap-2">
              {/* Row number */}
              <div className="w-8 text-center text-sm font-medium text-gray-500">{seatRow.row}</div>

              {/* Seats */}
              <div className="flex gap-1">
                {seatRow.seats.map((seat, seatIndex) => {
                  const status = getSeatStatus(seat.id)
                  return (
                    <div key={seat.id} className="flex items-center">
                      <button
                        onClick={() => handleSeatClick(seat)}
                        disabled={status === "occupied"}
                        className={`w-10 h-10 rounded-lg text-sm font-bold transition-all duration-200 ${getSeatColors(
                          seat.class,
                          status,
                        )}`}
                      >
                        1
                      </button>
                      {/* Aisle space after 2nd seat */}
                      {seatIndex === 1 && <div className="w-4"></div>}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Seat Info */}
        {selectedSeat && selectedClass && (
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6">
              <h3 className="font-semibold text-amber-800 text-lg mb-2">Seat Selected</h3>
              <div className="space-y-2">
                <p className="text-amber-700">
                  <span className="font-medium">Seat:</span> Row {selectedSeat.split("-")[0]}, Position{" "}
                  {selectedSeat.split("-")[1]}
                </p>
                <p className="text-amber-700">
                  <span className="font-medium">Service Class:</span> {getClassInfo(selectedClass).name}
                </p>
                <p className="text-amber-600 text-sm">{getClassInfo(selectedClass).description}</p>
              </div>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {selectedSeat && (
          <div className="flex justify-center mt-8">
            <button className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold rounded-xl hover:from-amber-700 hover:to-amber-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
              Continue to Passenger Details
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeatMap
