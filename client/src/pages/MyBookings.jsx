import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get(
        "/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Booking Cancelled");

      fetchBookings();
    } catch (error) {
      console.log(error);
      alert("Failed to cancel booking");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="border p-4 rounded-lg mb-4"
          >
            <h2 className="text-xl font-bold">
              {booking.property?.title}
            </h2>

            <p>
              Check In:{" "}
              {new Date(
                booking.checkIn
              ).toLocaleDateString()}
            </p>

            <p>
              Check Out:{" "}
              {new Date(
                booking.checkOut
              ).toLocaleDateString()}
            </p>

            <button
              className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => {
                if (
                  window.confirm(
                    "Cancel this booking?"
                  )
                ) {
                  cancelBooking(
                    booking._id
                  );
                }
              }}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;