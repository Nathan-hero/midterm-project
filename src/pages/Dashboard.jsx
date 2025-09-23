import { useState } from "react";
import { useBookings } from "../contexts/BookingContext";
import spaces from "../spaces.json";

export default function Dashboard() {
  const { bookings, cancelBooking } = useBookings();
  const [confirmIndex, setConfirmIndex] = useState(null);

  const handleCancel = () => {
    if (confirmIndex !== null) {
      cancelBooking(confirmIndex);
      setConfirmIndex(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-white text-center font-['Raleway']">No bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking, index) => {
            const space = spaces.find((s) => s.id === booking.spaceId);

            return (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_25px_5px_rgba(236,100,190,0.8)]"
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${space.main_image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                {/* Booking info */}
                <div className="relative z-10 p-6 text-white">
                  <h2 className="text-2xl font-bold text-violet-200 font-['Raleway']">{space.name}</h2>
                  <p className="text-sm text-violet-300">{space.location}</p>
                  <p className="mt-2 text-violet-300">Date: {booking.date}</p>
                  <p className="text-violet-300">Time: {booking.timeSlot}</p>

                  <button
                    onClick={() => setConfirmIndex(index)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Cancel Booking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-bold text-gray-800">
              Cancel this booking?
            </h2>
            <p className="mt-2 text-gray-600">
              This action cannot be undone.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmIndex(null)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
