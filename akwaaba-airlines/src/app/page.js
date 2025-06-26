import Image from "next/image";
import React from "react";

const LandingPage = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col bg-white overflow-x-hidden"
      style={{
        fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif',
      }}
    >
      <div className="flex grow flex-col">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-[#f0f2f5] px-10 py-3">
          <div className="flex items-center gap-4 text-[#111418]">
            <div className="size-4">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold tracking-[-0.015em]">Akwaaba Airlines</h2>
          </div>
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex items-center gap-9">
              {["Home", "Book a Flight", "Manage Booking", "Flight Status", "Check-In", "Contact Us"].map((item) => (
                <a key={item} className="text-sm font-medium text-[#111418]" href="#">
                  {item}
                </a>
              ))}
            </div>
            <button className="h-10 min-w-[84px] rounded-lg bg-[#f0f2f5] px-4 text-sm font-bold text-[#111418]">
              Login/Sign Up
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-1 justify-center px-6 py-5 md:px-40">
          <div className="flex w-full max-w-[960px] flex-col">
            <div className="p-4">
              <div
                className="flex min-h-[480px] flex-col items-center justify-center gap-6 rounded-lg bg-cover bg-center bg-no-repeat p-4 text-center"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCRGVSGFXNcKDMOa7KCIIIh_dQ7K4tJfG8rePqhcqZtb0yTUSOGDDB4wVnUJr4Q9g8mV-448FaWcrRV67wkk4GnobdvnYDbd1zD1GgMcaN2RuK4UTtxpEwDio1whW8jmcc5fC9XE6RMpLVOc_3SPWYR3iLstLZOZP9qOX1aPjsimAeoPi9cg_KNQ0iI8JogfGdSgRXDNd8gOWER6CwzMXmakc9SytssZeVBkfF-o-jPuf-BunSLRUXi0sqfD0NleOXt_xKRIuhhSkls")',
                }}
              >
                <h1 className="text-4xl font-black text-white">Fly with Akwaaba Airlines</h1>
                <h2 className="text-sm text-white">
                  Experience the best of Ghanaian hospitality in the skies. Book your next adventure with us.
                </h2>
                <label className="mt-4 flex h-14 w-full max-w-[480px] flex-col">
                  <div className="flex h-full w-full rounded-lg border border-[#dbe0e6] bg-white">
                    <div className="flex items-center justify-center px-4 text-[#60758a]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search Flights"
                      className="flex-1 px-4 text-sm text-[#111418] outline-none placeholder:text-[#60758a]"
                    />
                    <div className="flex items-center justify-center pr-2">
                      <button className="h-10 rounded-lg bg-[#0c7ff2] px-4 text-sm font-bold text-white">
                        Search Flights
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Special Offers */}
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold text-[#111418]">Special Offers</h2>
            <div className="flex overflow-x-auto px-4 scrollbar-hide">
              <div className="flex gap-3">
                {[
                  {
                    title: "Accra to Kumasi",
                    description: "Explore the vibrant capital",
                    image: "/Kotoka.jpg",
                  },
                  {
                    title: "Accra to Tamale",
                    description: "Discover the northern region",
                    image: "/tamale.jpg",
                  },
                  {
                    title: "Accra to Ho",
                    description: "Experience the Volta Region",
                    image: "/ho.jpg",
                  },
                ].map((offer, index) => (
                  <div key={index} className="min-w-60 flex flex-col gap-2 rounded-lg">
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      width={300}
                      height={200}
                      className="aspect-video w-full rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-base font-medium text-[#111418]">{offer.title}</p>
                      <p className="text-sm text-[#60758a]">{offer.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="px-4 pb-3 pt-1 text-center text-sm text-[#60758a] underline cursor-pointer">
              See All Deals
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
