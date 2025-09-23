import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import spaces from "../spaces.json";

export default function Home() {
  const [query, setQuery] = useState("");
  const [time, setTime] = useState(new Date());

  // Update time every second / basically a live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredSpaces = spaces.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-2">
      {/* Hero */}
        <div className="relative h-64 rounded-lg overflow-hidden mb-8 shadow-3xl">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url(/image/HeroBG.gif)",
            }}
          />
          {/* Contents */}
          <div className="relative z-10 flex items-center justify-center h-full">
            <div className="text-center text-white drop-shadow-lg">
              <h1 className="text-4xl font-bold font-['Comfortaa']">{time.toLocaleTimeString()}</h1>
              <p className="mt-2 text-lg font-['Raleway']">{time.toLocaleDateString()}</p>
            </div>
          </div>
        </div>


      {/* Search */}
      <h2 className="text-2xl font-bold mb-4 text-white font-['Raleway']">Browse Spaces</h2>
      <input
        type="text"
        placeholder="Search by name or location..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
      />

      {/* Spaces Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSpaces.map((space) => (
            <Link
              key={space.id}
              to={`/space/${space.id}`}
              className="block"
            >
              <div
                className="relative rounded-lg p-4 shadow 
                bg-gradient-to-r from-purple-900 via-violet-950 to-indigo-950 
                bg-[length:200%_200%] detailsbox
                transition-all duration-500 hover:shadow-[0_0_25px_5px_rgba(236,72,153,0.8)]
                hover:cursor-pointer"
              >
                <img
                  className="w-full h-40 object-cover rounded-md"
                  src={space.main_image}
                  alt={space.name}
                />
                <h2 className="mt-3 text-lg font-semibold text-white font-['Raleway']">
                  {space.name}
                </h2>
                <p className="text-sm text-gray-300 font-['Raleway']">{space.location}</p>
                <p className="mt-4 text-gray-300 line-clamp-3">
                  {space.description}
                </p>
                <p className="mt-4"/>
              </div>
            </Link>
          ))}
        </div>

      <h2 className="text-center text-white mt-30 mb-4">ˏˋ°•*⁀➷⋆·˚ ༘ *  End of list  ⋆·˚ ༘ *ˏˋ°•*⁀➷</h2>
      <h1 className="mt-30"></h1>
    </div>
  );
}
