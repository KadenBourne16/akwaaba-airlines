import React, { useState } from 'react';
import { Plane, StarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

function get7DatesFromOffset(offset = 0) {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + offset + i);
    dates.push(d);
  }
  return dates;
}

const FlightCalendar = () => {
  const [offset, setOffset] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = get7DatesFromOffset(offset);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4 py-6">
      {/* Header */}
      <h1 className="text-lg font-semibold mb-4 text-center text-amber-700">Departing Flight</h1>

      {/* Calendar Navigation & Cards */}
      <div className="flex items-center gap-2 w-full justify-center overflow-x-auto">
        {/* Left Chevron */}
        <button
          aria-label="Previous dates"
          onClick={() => setOffset(offset - 7)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-4">
          {dates.map((date, idx) => {
            const isPast = date < today;
            const isSelected = date.toDateString() === selectedDate;

            return (
              <div
                key={idx}
                onClick={() => !isPast && setSelectedDate(date.toDateString())}
                className={`min-w-[120px] text-sm px-4 py-6 border rounded-lg flex flex-col items-center cursor-pointer transition duration-200 ease-in-out
                  ${isPast ? 'border-gray-300 opacity-60' : isSelected ? 'border-yellow-600 bg-amber-500' : 'border-amber-500'}
                `}
              >
                {isPast ? (
                  <>
                    <Plane size={20} className="mb-1" />
                    <span className="text-xs text-gray-500">Unavailable</span>
                  </>
                ) : (
                  <>
                    <Plane size={20} className="text-black mb-1" />
                    <span className="text-xs text-black">Available</span>
                  </>
                )}
                <span className="mt-2 text-xs opacity-70 text-center">
                  {date.toLocaleDateString(undefined, {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right Chevron */}
        <button
          aria-label="Next dates"
          onClick={() => setOffset(offset + 7)}
          className="p-2 rounded hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default FlightCalendar;
