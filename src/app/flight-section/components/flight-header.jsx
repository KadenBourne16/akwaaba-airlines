import React from 'react';
import { Search } from 'lucide-react';

const FlightHeader = ({ theFlightInfo, flightPrice }) => {

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
                <h1 className='font-bold text-md'>{`${theFlightInfo.from} - ${theFlightInfo.to}`}</h1>
            </div>
            <div className='grid grid-cols-3'>
                <div>
                    <span className='font-semibold text-white'>Departure: </span> {theFlightInfo.departure}
                    {theFlightInfo.return ?  `Return: ${theFlightInfo.return}`: ""}
                </div>
                <div className='border-x border-gray-200  px-3'>
                     {theFlightInfo.adults ? `Adult: ${theFlightInfo.adults}` : ""} <br></br>
                     {theFlightInfo.child ? `Child: ${theFlightInfo.child}`: ""} <br></br>
                     {theFlightInfo.infants ? `Infants: ${theFlightInfo.infants}`: ""}
                </div>
                <div>
                      <h1>{theFlightInfo.trip_type === "round" ? "Round Trip": "One Way"}</h1>
                </div>
            </div>
        </div>

        {/* Price Section */}
        <div className="text-right text-sm font-semibold text-black w-full md:w-auto">
          {flightPrice ? `Total Price: $${flightPrice}` : "Price Not Found"}
        </div>
      </div>
    </div>
  );
};

export default FlightHeader;
