import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await API.get("/properties");
      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProperties();
    } catch (error) {
      console.log(error);
    }
  };

  const addToFavorites = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await API.post(
        `/favorites/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Added To Favorites ❤️");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Favorite");
    }
  };

  const filteredProperties = properties.filter((property) =>
    property.location
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">
          Find Your Perfect Stay
        </h1>

        <p className="mt-4 text-xl">
          Discover unique homes and experiences around the world
        </p>

        <div className="flex justify-center mt-8">
          <input
            type="text"
            placeholder="Search by location..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-96 p-3 rounded-l-lg text-black bg-white"
          />

          <button className="bg-black px-6 rounded-r-lg">
            Search
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-6xl mx-auto py-10">
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-rose-500">
              {filteredProperties.length}
            </h2>
            <p>Available Properties</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-rose-500">
              100+
            </h2>
            <p>Happy Guests</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-rose-500">
              24/7
            </h2>
            <p>Customer Support</p>
          </div>
        </div>
      </div>

      {/* Properties */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Properties
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              <Link
                to={`/property/${property._id}`}
              >
                <img
                  src={
                    property.image ||
                    "https://via.placeholder.com/400x250?text=No+Image"
                  }
                  alt={property.title}
                  className="w-full h-56 object-cover"
                />

                <h2 className="text-xl font-bold mt-3 px-4">
                  {property.title}
                </h2>
              </Link>

              <p className="text-gray-600 mt-2 px-4">
                {property.description}
              </p>

              <p className="mt-2 px-4">
                📍 {property.location}
              </p>
              <div className="flex items-center justify-between px-4 mt-2">
  <p className="text-yellow-500 font-semibold">
    ⭐ 4.8
  </p>

  <p className="text-gray-500 text-sm">
    120 Reviews
  </p>
</div>

              <p className="font-bold mt-2 text-xl px-4 text-rose-500">
  ₹{property.price}
  <span className="text-gray-500 text-sm font-normal">
    {" "}
    / night
  </span>
</p>

              <p className="px-4 mt-2 text-gray-700">
                Host: {property.owner?.name}
              </p>

              <div className="flex gap-2 mt-4 p-4">
                <button
                  className="bg-pink-500 text-white px-3 py-2 rounded"
                  onClick={() =>
                    addToFavorites(
                      property._id
                    )
                  }
                >
                  ❤️ Favorite
                </button>

                {userId === property.owner?._id && (
                  <button
                    className="bg-red-500 text-white px-3 py-2 rounded"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Delete this property?"
                        )
                      ) {
                        deleteProperty(
                          property._id
                        );
                      }
                    }}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;