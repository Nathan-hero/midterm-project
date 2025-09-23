import { useState } from "react";
import { useBookings } from "../contexts/BookingContext";
import spaces from "../spaces.json";

// Used to know the space being booked, data and time, error message and success message
export default function BookingForm({ spaceId }) {
  const { addBooking } = useBookings();
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Find the space so we can access its time_slots
  const space = spaces.find((s) => s.id === spaceId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !timeSlot) {
      setError("Please select both a date and a time slot.");
      return;
    }

    addBooking({
      spaceId,
      date,
      timeSlot,
    });

    setDate("");
    setTimeSlot("");
    setError("");
    setShowSuccess(true);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-600 font-medium">{error}</p>
        )}

        <label className="block">
          <span className="text-gray-200 font-medium">Select Date:</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-pink-200 bg-violet-950"
          />
        </label>

        <label className="block">
          <span className="text-gray-200 font-medium">Select Time Slot:</span>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg p-2 text-pink-200 
                        bg-violet-950 focus:bg-violet-900"
            >
              <option value="">-- Select --</option>
              {space?.time_slots?.map((slot, index) => (
                <option key={index} value={slot} className="bg-violet-950 text-pink-200">
                  {slot}
                </option>
              ))}
            </select>
        </label>

        <button
          type="submit"
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
        >
          Confirm Booking
        </button>
      </form>

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-80">
            <h2 className="text-xl font-bold text-green-600">
               Successfully Booked!
            </h2>
            <p className="mt-2 text-gray-700">
              Your booking has been confirmed.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
