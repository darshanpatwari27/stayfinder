import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function MyProperties() {
  const [properties, setProperties] =
    useState([]);

  useEffect(() => {
    fetchMyProperties();
  }, []);

  const fetchMyProperties = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/properties/my-properties",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProperty = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      await API.delete(
        `/properties/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchMyProperties();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Properties
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
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

            <div className="flex gap-2 mt-4">
              <Link
                to={`/edit-property/${property._id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </Link>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyProperties;