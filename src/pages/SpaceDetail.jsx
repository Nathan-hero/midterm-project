import { useParams } from "react-router-dom";
import spaces from "../spaces.json";
import { useAuth } from "../contexts/AuthContext.jsx";
import BookingForm from "../components/BookingForm.jsx";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const space = spaces.find((s) => String(s.id) === spaceId);
  const { user } = useAuth();

  if (!space) return <p className="text-center">Space not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Main Image */}
      <img
        src={space.main_image}
        alt={space.name}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      {/* Title + Basic Info */}
      <h1 className="text-3xl font-bold text-gray-200 font-['Raleway']">{space.name}</h1>
      <p className="text-gray-200 font-['Raleway']">Location: {space.location}</p>
      <p className="text-gray-200 font-['Raleway']">Price: {space.price}₱</p>

      {/* Description */}
      <h2 className="mt-4 text-xl font-bold text-gray-200 font-['Raleway']">Description</h2>
      <p className="text-gray-200">{space.description}</p>

      {/* Amenities */}
      <h2 className="mt-6 text-xl font-bold text-gray-200 font-['Raleway']">Amenities</h2>
      <ul className="list-disc list-inside">
        {space.amenities.map((amenity, index) => (
          <li key={index} className="mt-1 text-gray-300">
            {amenity}
          </li>
        ))}
      </ul>

      {/* Operating Hours */}
      <h2 className="mt-6 text-xl font-bold text-gray-200 font-['Raleway']">Operating Hours</h2>
      <p className="text-gray-300">{space.hours}</p>

      {/* Booking Section */}
      {user ? (
        <div className="mt-8">
          <BookingForm spaceId={space.id} />
        </div>
      ) : (
        <p className="mt-6 text-red-300 font-medium">
          Please log in to book this space.
        </p>
      )}
    </div>
  );
}
