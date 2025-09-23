import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user, login, logout } = useAuth();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard/my-bookings" },
  ];

  return (
    <nav className="bg-nav text-white shadow-md font-['Raleway']">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold">Welcome to StudySpot PH</h1>

        {/* 80% of the codes here are hard focused on design / aka long classNames :) */}
        <div className="flex items-center space-x-8">
          {/* Nav Links */}
          <div className="flex space-x-6 relative">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className="relative px-3 py-1 rounded-md group"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute inset-0 rounded-md transition-all duration-500 
                        ${isActive 
                          ? "bg-gradient-to-r from-pink-300 via-pink-400 to-violet-400 navbarmove opacity-100" 
                          : "opacity-0 group-hover:opacity-100 bg-gradient-to-r from-pink-600 via-pink-600 to-violet-600 navbarmove"
                        }`}
                    ></span>
                    <span
                      className={`relative z-10 transition-colors duration-300 
                        ${isActive 
                          ? "text-pink-200 font-semibold" 
                          : "text-white group-hover:text-pink-300"
                        }`}
                    >
                      {item.name}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* For logged in or not */}
          <button
            onClick={user ? logout : login}
            className={`px-4 py-2 rounded-lg transition 
              ${user 
                ? "bg-pink-400 hover:bg-pink-500" 
                : "bg-violet-400 hover:bg-violet-500"
              }`}
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>
      </div>
    </nav>
  );
}
