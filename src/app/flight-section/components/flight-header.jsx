import React from 'react';
import { Search } from 'lucide-react';

const FlightHeader = () => {
  return (
    <div className="w-full bg-amber-400 p-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="flex items-center border border-gray-200 px-2 py-1 rounded-md w-full md:w-auto">
          <input
            type="text"
            placeholder="Search"
            className="outline-none text-sm flex-1 bg-transparent"
          />
          <Search className="ml-2 w-4 h-4 text-gray-600" />
        </div>

        {/* Information Section */}
        <div className="text-white px-4 py-2 rounded-md text-sm w-full md:w-auto text-center">
            <div>
                <h1 className='font-bold text-md'>Accra - Kumasi</h1>
            </div>
            <div className='grid grid-cols-3'>
                <div>
                      <h1>Date</h1>
                </div>
                <div className='border-x border-gray-200  px-3'>
                      <h1>Choices</h1>
                </div>
                <div>
                      <h1>Trip Type</h1>
                </div>
            </div>
        </div>

        {/* Price Section */}
        <div className="text-right text-sm font-semibold text-black w-full md:w-auto">
          Price
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;
