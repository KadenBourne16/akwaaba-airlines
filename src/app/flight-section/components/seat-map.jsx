"use client"

import { useState, useEffect } from "react"
import { Plane } from "lucide-react"

const SeatMap = ({ selectedFlightInformation, onSeatSelect }) => {
  const [selectedSeat, setSelectedSeat] = useState(null)
  const [selectedClass, setSelectedClass] = useState(null)
  const [showPromotionPopup, setShowPromotionPopup] = useState(false)
  
  // Check if this is a promotion fare class
  useEffect(() => {
    if (selectedFlightInformation?.selectedFareClass?.toLowerCase() === 'promotion') {
      setShowPromotionPopup(true);
    }
  }, [selectedFlightInformation])
  
  // Auto-select a random available seat based on fare class for all fare types
  useEffect(() => {
    if (!selectedFlightInformation?.selectedFareClass) return;
    
    const fareClass = selectedFlightInformation.selectedFareClass.toLowerCase();
    
    // Handle promotion class separately (shows popup)
    if (fareClass === 'promotion') {
      setShowPromotionPopup(true);
      return;
    }
    
    // Get all seats for the fare class
    const allSeats = generateSeats()
      .flatMap(section => section.seats)
      .filter(seat => seat.class === fareClass);
    
    // Filter out occupied seats
    const availableSeats = allSeats.filter(seat => !occupiedSeats.has(seat.id));
    
    // If no available seats, don't select anything
    if (availableSeats.length === 0) {
      console.warn(`No available seats for fare class: ${fareClass}`);
      return;
    }
    
    // Select a random available seat
    const randomIndex = Math.floor(Math.random() * availableSeats.length);
    const randomSeat = availableSeats[randomIndex];
    
    if (randomSeat) {
      setSelectedSeat(randomSeat.id);
      setSelectedClass(randomSeat.class);
      onSeatSelect?.(randomSeat.id, randomSeat.class);
    }
  }, [selectedFlightInformation, onSeatSelect])

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

  const handleSeatClick = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    return false;
  }

  const getSeatColors = (seatClass, status) => {
    if (status === "occupied") {
      return "bg-black text-white cursor-not-allowed"
    }
    if (status === "selected") {
      return "bg-green-500 text-white shadow-lg scale-110 ring-2 ring-green-300"
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

  // Close promotion popup
  const handleClosePromotionPopup = () => {
    setShowPromotionPopup(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md relative">
      {/* Promotion Popup */}
      {showPromotionPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold text-red-600 mb-4">Important Notice</h3>
            <p className="mb-4">
              Your fare class is <span className="font-semibold">Promotion</span>.
              Please contact Director Bambel for seat assignment and further assistance.
            </p>
            <div className="flex justify-end">
              <button 
                onClick={handleClosePromotionPopup}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Fare Class Indicator */}
      {selectedFlightInformation?.selectedFareClass && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 font-medium">
            Fare Class: <span className="capitalize">{selectedFlightInformation.selectedFareClass.toLowerCase()}</span>
            {selectedFlightInformation.selectedFareClass.toLowerCase() === 'gold' && (
              <span className="ml-2 text-amber-600">• Your seat is pre-assigned as part of Gold Class service</span>
            )}
          </p>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Select Your Seat</h1>
            <p className="text-gray-600">Flight {selectedFlightInformation?.id || ''} - Choose your preferred seat</p>
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
            <div className="w-6 h-6 bg-black rounded text-white text-xs flex items-center justify-center font-bold">
              1
            </div>
            <span className="text-sm font-medium">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold shadow-lg">
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
                      <div
                        className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center ${
                          status === 'selected' 
                            ? 'bg-green-500 text-white shadow-lg scale-110 ring-2 ring-green-300'
                            : getSeatColors(seat.class, status)
                        }`}
                        onClick={handleSeatClick}
                        style={{ cursor: 'default' }}
                      >
                        {seat.position}
                      </div>
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
              Continue to Payment
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SeatMap
