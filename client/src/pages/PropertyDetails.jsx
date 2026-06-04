import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
  fetchProperty();
  fetchReviews();

  const script =
    document.createElement("script");

  script.src =
    "https://checkout.razorpay.com/v1/checkout.js";

  script.async = true;

  document.body.appendChild(script);
}, []);

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await API.get(`/reviews/${id}`);
      setReviews(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const bookProperty = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await API.post(
      "/payments/create-order",
      {
        amount: property.price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const options = {
      key:
        "rzp_test_SxYe82r2DkcFVl",
      amount: data.amount,
      currency: data.currency,
      name: "Airbnb Clone",
      description:
        "Property Booking",
      order_id: data.id,

      handler: async function () {
        await API.post(
          "/bookings",
          {
            property: property._id,
            checkIn,
            checkOut,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(
          "Payment Successful & Booking Confirmed"
        );
      },
    };

    const rzp =
      new window.Razorpay(options);

    rzp.open();
  } catch (error) {
    console.log(error);
    alert("Payment Failed");
  }
};

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        "/reviews",
        {
          property: property._id,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Review Added");

      setRating(5);
      setComment("");

      fetchReviews();
    } catch (error) {
      console.log(error);
      alert("Review Failed");
    }
  };

  if (!property) {
    return (
      <h1 className="text-center text-2xl mt-10">
        Loading...
      </h1>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <img
  src={
    property.image ||
    "https://via.placeholder.com/1200x600"
  }
  alt={property.title}
  className="w-full h-[500px] object-cover rounded-3xl shadow-xl"
/>

      <h1 className="text-4xl font-bold mt-6">
        {property.title}
      </h1>

      <p className="text-gray-600 mt-4">
        {property.description}
      </p>

      <p className="mt-4 text-lg">
        📍 {property.location}
      </p>

      <p className="mt-4 text-2xl font-bold">
        ₹{property.price}
      </p>

      <p className="mt-4">
        Host: {property.owner?.name}
      </p>
      <div className="mt-6">
  <iframe
    title="map"
    width="100%"
    height="350"
    className="rounded-2xl shadow-lg"
    loading="lazy"
    src={`https://maps.google.com/maps?q=${property.location}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
  />
</div>

      {/* Booking Section */}
      <div className="mt-6 border p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Book This Property
        </h2>

        <input
          type="date"
          value={checkIn}
          onChange={(e) =>
            setCheckIn(e.target.value)
          }
          className="border p-2 rounded mr-2"
        />

        <input
          type="date"
          value={checkOut}
          onChange={(e) =>
            setCheckOut(e.target.value)
          }
          className="border p-2 rounded"
        />

        <br />
        <br />

        <button
          onClick={bookProperty}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-xl font-bold transition"
        >
          Pay & Book
        </button>
      </div>

      {/* Reviews Section */}
      <div className="mt-8 border p-4 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">
          Reviews
        </h2>

        <select
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
          className="border p-2 rounded"
        >
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>

        <textarea
          placeholder="Write a review..."
          value={comment}
          onChange={(e) =>
            setComment(e.target.value)
          }
          className="border p-2 rounded w-full mt-2"
        />

        <button
          onClick={submitReview}
          className="bg-yellow-500 text-white px-4 py-2 rounded mt-2"
        >
          Submit Review
        </button>

        <div className="mt-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border-b py-2"
            >
              <p>
                ⭐ {review.rating}/5
              </p>

              <p>{review.comment}</p>

              <p className="text-sm text-gray-500">
                By {review.user?.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {userId === property.owner?._id && (
        <div className="mt-6">
          <Link
            to={`/edit-property/${property._id}`}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Property
          </Link>
        </div>
      )}
    </div>
  );
}

export default PropertyDetails;