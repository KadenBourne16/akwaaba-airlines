"use client"

import Image from "next/image"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
  Plane,
  Calendar,
  Users,
  MapPin,
  Search,
  Shield,
  Clock,
  Award,
} from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"
import {useRouter}  from "next/navigation"

const LandingPage = () => {
  const router = useRouter();
  const [tripType, setTripType] = useState("round");
  const [activeBookSection, setActiveBookSection] = useState("BookFlight");
  const allDestinations = ["Accra (ACC)", "Kumasi (KMS)", "Takoradi (TKD)", "Tamale (TML)"];
  
  const [destinationList, setDestinationList] = useState(allDestinations);
  const [destinationSelected, setDestinationSelected] = useState({ from: "", to: "" });
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pnr, setPnr] = useState("");
  const [surname, setSurname] = useState("");
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    departure:  "",
    return: "",
    adults: 1,
    child: 0,
    infants: 0,
    trip_type: "",
  });
  const [errors, setErrors] = useState({});


useEffect(() => {
    setFormData(prev => ({
      ...prev,
      from: destinationSelected.from,
      to: destinationSelected.to,
      departure: departureDate,
      return: tripType === "one" ? returnDate : "",
      trip_type: tripType,
    }));

    console.log(formData.trip_type)
  }, [destinationSelected, departureDate, returnDate, tripType]);


const saveToIndexedDB = (formData) => {
  let newErrors = {};

  if (!formData.from) {
    newErrors.from = "Please select a departure location";
  }
  if (!formData.to) {
    newErrors.to = "Please select a destination";
  }
  if (!formData.departure) {
    newErrors.departure = "Please select a departure date";
  }
  if (formData.trip_type !== "round" && !formData.return) {
    newErrors.return = "Please select a return date";
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setTimeout(() => {
      setErrors({});
    }, 3000);
    return;
  }

  const dataToStore = JSON.stringify(formData);
  localStorage.setItem("flightFormData", dataToStore);
  console.log("Done", dataToStore)
  router.push("/flight-section")
}

  const destinations = [
    {
      title: "Accra to Kumasi",
      description: "Explore the cultural heart of Ghana",
      image: "/AccraDestination.jpg",
      price: "From GHc 89",
      duration: "1h",
    },
    {
      title: "Accra to Tamale",
      description: "Discover northern Ghana's beauty",
      image: "/GidiLodge.jpg",
      price: "From GHc 125",
      duration: "1h 45m",
    },
    {
      title: "Accra to Takoradi",
      description: "Gateway to the western region",
      image: "/AtlanticHotel.jpg",
      price: "From GHc 95",
      duration: "1h 30m",
    },
  ]

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Safety First",
      description: "Industry-leading safety standards and protocols",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "On-Time Performance",
      description: "95% on-time arrival rate across all routes",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Award Winning",
      description: "Best Regional Airline in West Africa 2023",
    },
  ]

  useEffect(() => {
    if (destinationSelected.from !== "") {
      setDestinationList(
        allDestinations.filter(destinationPlace => destinationPlace !== destinationSelected.from)
      );
    } else {
      setDestinationList(allDestinations);
    }
  }, [destinationSelected.from]);


  //main return statement
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Akwaaba Airlines</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {["Home", "Destinations", "Book Flight", "Manage Booking", "Flight Status", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/placeholder.svg?height=600&width=1200")',
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Fly with <span className="text-amber-400">Akwaaba</span> Airlines
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Experience the warmth of Ghanaian hospitality at 30,000 feet. Your journey begins with us.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-2 shadow-2xl">
              <div className="flex items-center">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Where would you like to go?"
                    className="w-full py-3 text-gray-700 placeholder-gray-400 outline-none text-lg"
                  />
                </div>
                <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200">
                  Search Flights
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Booking Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {/* Tabs */}
            <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg w-fit">
              <button
                onClick={() => setActiveBookSection("BookFlight")}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeBookSection === "BookFlight"
                    ? "bg-amber-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Plane className="w-4 h-4 inline mr-2" />
                Book Flight
              </button>
              <button
                onClick={() => setActiveBookSection("Check-In")}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-200 ${
                  activeBookSection === "Check-In"
                    ? "bg-amber-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Check-In
              </button>
            </div>

            {/* Conditional Section */}
            {activeBookSection === "BookFlight" ? (
              <>
                {/* Booking Form */}
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center">
        <MapPin className="w-4 h-4 mr-1" />
        From
      </label>
      <select
        onChange={e => setDestinationSelected(prev => ({
          ...prev,
          from: e.target.value
        }))}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
        value={destinationSelected.from}
      >
        <option value="">Select departure city</option>
        {allDestinations.map((dept, index) => (
          <option key={index} value={dept}>{dept}</option>
        ))}
      </select>
      {errors && errors.from && <p className="text-amber-500 text-sm">{errors.from}</p>}
    </div>

    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center">
        <MapPin className="w-4 h-4 mr-1" />
        To
      </label>
      <select
        onChange={e => setDestinationSelected(prev => ({
          ...prev,
          to: e.target.value
        }))}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
        value={destinationSelected.to}
      >
        <option value="">Select end destination</option>
        {destinationList.map((dept, index) => (
          <option key={index} value={dept}>{dept}</option>
        ))}
      </select>
      {errors && errors.to && <p className="text-amber-500 text-sm">{errors.to}</p>}
    </div>

    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center">
        <Calendar className="w-4 h-4 mr-1" />
        Departure
      </label>
      <input
        type="date"
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
        value={departureDate}
        onChange={e => setDepartureDate(e.target.value)}
      />
      {errors && errors.departure && <p className="text-amber-500 text-sm">{errors.departure}</p>}
    </div>

    {/* Show return date only if round trip */}
    {tripType === "round" && (
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          Return
        </label>
        <input
          type="date"
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
          value={returnDate}
          onChange={e => setReturnDate(e.target.value)}
          min={departureDate}
        />
        {errors && errors.return && <p className="text-amber-500 text-sm">{errors.return}</p>}
      </div>
    )}

    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700 flex items-center">
        <Users className="w-4 h-4 mr-1" />
        Adults
      </label>
      <select
        value={formData.adults}
        onChange={e => setFormData(prev => ({
          ...prev,
          adults: Number(e.target.value)
        }))}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
      >
        {[...Array(9)].map((_, i) => (
          <option key={i} value={i + 1}>
            {i + 1} Adult{i > 0 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">Children</label>
      <select
        value={formData.child}
        onChange={e => setFormData(prev => ({
          ...prev,
          child: Number(e.target.value)
        }))}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
      >
        {[...Array(8)].map((_, i) => (
          <option key={i} value={i}>
            {i} Child{i !== 1 ? "ren" : ""}
          </option>
        ))}
      </select>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">Infants - <span className="text-xs text-gray-400">14 days to 2 years</span></label>
      <select
        value={formData.infants}
        onChange={e => setFormData(prev => ({
          ...prev,
          infants: Number(e.target.value)
        }))}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
      >
        {[...Array(4)].map((_, i) => (
          <option key={i} value={i}>
            {i} Infant{i !== 1 ? "s" : ""}
          </option>
        ))}
      </select>
    </div>
  </div>

    <div className="flex items-center space-x-6 mb-8">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === "one"}
                  onChange={() => setTripType("one")}
                  className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                />
                <span className="font-medium text-gray-700">One Way</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="trip"
                  checked={tripType === "round"}
                  onChange={() => setTripType("round")}
                  className="w-4 h-4 text-amber-500 focus:ring-amber-500"
                />
                <span className="font-medium text-gray-700">Round Trip</span>
              </label>
            </div>

  {/* Book Flights Button */}
  <div className="text-center">
    <button
      onClick={() => {
        saveToIndexedDB(formData);
        // window.location.href = "/flight-section";
      }}
      className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-12 py-4 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg flex items-center mx-auto justify-center"
    >
      <Send className="w-5 h-5 mr-2" />
      Book Flights
    </button>
  </div>
              </>
            ) : (
              // Check-In Section
              <div className="max-w-md mx-auto">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">PNR Code</label>
                    <input
                      type="text"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      placeholder="Enter your PNR code"
                      value={pnr}
                      onChange={e => setPnr(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Surname</label>
                    <input
                      type="text"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                      placeholder="Enter your surname"
                      value={surname}
                      onChange={e => setSurname(e.target.value)}
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-10 py-3 rounded-xl font-semibold text-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-200 shadow-lg"
                    >
                      Check In
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Akwaaba Airlines?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing you with the best flying experience across Ghana
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Popular Destinations</h2>
            <p className="text-xl text-gray-600">
              Discover Ghana most beautiful destinations with our special offers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-amber-600">
                    {destination.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.title}</h3>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {destination.duration}
                    </span>
                    <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all duration-200">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="text-amber-600 font-semibold hover:text-amber-700 transition-colors duration-200">
              View All Destinations →
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Akwaaba Airlines</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Ghana premier airline, connecting you to destinations across Ghana with unmatched hospitality
                and service excellence.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors duration-200"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors duration-200"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors duration-200"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors duration-200"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {["About Us", "Careers", "Press", "Investor Relations", "Sustainability"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Support</h4>
              <ul className="space-y-3">
                {["Help Center", "Contact Us", "Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} Akwaaba Airlines. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage