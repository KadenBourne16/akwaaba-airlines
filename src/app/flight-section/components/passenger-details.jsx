import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PassengerDetails = () => {
  const router = useRouter();
  const [passengerFormList, setPassengerFormList] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    console.log('Checking localStorage for selectedFlightInformation...');
    try {
      const raw = localStorage.getItem('selectedFlightInformation');
      console.log('Raw data from localStorage:', raw);
      
      if (!raw) {
        console.error('No flight information found in localStorage');
        return;
      }
      
      const flightData = JSON.parse(raw);
      console.log('Parsed flight data:', flightData);
      
      if (!flightData || !flightData.passengerInfo) {
        console.error('Invalid flight data structure:', flightData);
        return;
      }
      
      const { adults = 0, child = 0, infants = 0 } = flightData.passengerInfo;
      console.log('Passenger counts:', { adults, child, infants });

      const list = [];

      for (let i = 1; i <= adults; i++) {
        list.push({
          type: 'Adult',
          index: i,
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          gender: '',
          phone: '',
          isContact: i === 1,
          hasDisability: false,
          disabilityType: '',
        });
      }

      for (let i = 1; i <= child; i++) {
        list.push({
          type: 'Child',
          index: i,
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          gender: '',
          phone: '',
          isContact: false,
          hasDisability: false,
          disabilityType: '',
        });
      }

      for (let i = 1; i <= infants; i++) {
        list.push({
          type: 'Infant',
          index: i,
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          gender: '',
          phone: '',
          isContact: false,
          hasDisability: false,
          disabilityType: '',
        });
      }

      setPassengerFormList(list);
    } catch (e) {
      console.error('Invalid selectedFlightInformation in localStorage', e);
    }
  }, []);

  console.log('Current passengerFormList:', passengerFormList);
  console.log('Current index:', currentIdx);
  
  const current = passengerFormList[currentIdx];
  console.log('Current passenger data:', current);

  const updateCurrent = (changes) => {
    const updatedList = [...passengerFormList];
    updatedList[currentIdx] = {
      ...updatedList[currentIdx],
      ...changes,
    };
    setPassengerFormList(updatedList);
  };

  const goNext = () => {
    if (currentIdx < passengerFormList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      console.log('Final passenger list:', passengerFormList);
      // Store or send data here
      localStorage.setItem('filledPassengerForms', JSON.stringify(passengerFormList));
    }
  };

  if (!current) return <p>Loading passenger form…</p>;

  return (
    <div className="flex flex-col md:flex-row border rounded-lg shadow p-6 bg-white">
      {/* Passenger list (left side) */}
      <div className="w-full md:w-1/3 border-r pr-4 mb-4 md:mb-0">
        {passengerFormList.map((p, i) => (
          <div
            key={`${p.type}-${p.index}`}
            onClick={() => setCurrentIdx(i)}
            className={`p-2 cursor-pointer rounded ${
              i === currentIdx ? 'bg-rose-100 font-semibold' : 'hover:bg-gray-50'
            }`}
          >
            {p.type} {p.index}
          </div>
        ))}
      </div>

      {/* Passenger form (right side) */}
      <div className="w-full md:w-2/3 pl-4 space-y-4">
        <h2 className="text-lg font-bold">
          {current.type} {current.index} Info
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>First Name</label>
            <input
              value={current.firstName}
              onChange={(e) => updateCurrent({ firstName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Middle Name</label>
            <input
              value={current.middleName}
              onChange={(e) => updateCurrent({ middleName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              value={current.lastName}
              onChange={(e) => updateCurrent({ lastName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={current.email}
              onChange={(e) => updateCurrent({ email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Gender</label>
            <input
              value={current.gender}
              onChange={(e) => updateCurrent({ gender: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              value={current.phone}
              onChange={(e) => updateCurrent({ phone: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={current.isContact}
              onChange={(e) => {
                const updatedList = passengerFormList.map((p, idx) => ({
                  ...p,
                  isContact: idx === currentIdx ? e.target.checked : false,
                }));
                setPassengerFormList(updatedList);
              }}
              className="mr-2"
            />
            Set as Contact Person
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={current.hasDisability}
              onChange={(e) => updateCurrent({ hasDisability: e.target.checked, disabilityType: '' })}
              className="mr-2"
            />
            Has Disability
          </label>
        </div>

        {current.hasDisability && (
          <div>
            <label>Disability Type</label>
            <select
              value={current.disabilityType}
              onChange={(e) => updateCurrent({ disabilityType: e.target.value })}
              className="w-full p-2 border rounded"
            >
              <option value="">-- Select --</option>
              <option value="hearing">Hearing</option>
              <option value="seeing">Seeing</option>
              <option value="speech">Speech</option>
              <option value="movement">Movement</option>
            </select>
          </div>
        )}

        <div className="flex justify-end pt-4">
          <button
            onClick={goNext}
            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2 rounded"
          >
            {currentIdx < passengerFormList.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PassengerDetails;
