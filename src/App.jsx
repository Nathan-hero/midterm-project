import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import SpaceDetail from "./pages/SpaceDetail.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Navbar from "./components/Navbar.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen text-black bg-custombase">
      <Navbar />
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Home />} />

        {/* Space Detail Page */}
        <Route path="/space/:spaceId" element={<SpaceDetail />} />

        {/* Dashboard */}
        <Route
          path="/dashboard/my-bookings"
          element={user ? <Dashboard /> : <p className="text-center mt-10 text-white">You must log in to access this page.</p>}
        />
      </Routes>
    </div>
  );
}
