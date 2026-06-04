import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/favorites/my-favorites",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFavorites(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Favorites ❤️
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded-xl shadow-md p-4"
          >
            <Link
              to={`/property/${property._id}`}
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover rounded-lg"
              />

              <h2 className="text-xl font-bold mt-2">
                {property.title}
              </h2>
            </Link>

            <p className="mt-2">
              📍 {property.location}
            </p>

            <p className="font-bold mt-2">
              ₹{property.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFavorites;