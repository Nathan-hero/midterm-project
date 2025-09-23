import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage("bookings", []);

  const addBooking = (booking) => {
    // Give each booking a unique id
    const newBooking = { id: Date.now(), ...booking };
    setBookings([...bookings, newBooking]);
  };

  const cancelBooking = (index) => {
    setBookings((prev) => prev.filter((_, i) => i !== index));
  };


  return (
    <BookingContext.Provider value={{ bookings, addBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
