import { useState } from "react";
import API from "../services/api";

function AddProperty() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "airbnb-clone");

    try {
      setUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dfj94epv3/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      setFormData((prev) => ({
        ...prev,
        image: result.secure_url,
      }));

      setUploading(false);
      alert("Image Uploaded Successfully");
    } catch (error) {
      console.log(error);
      setUploading(false);
      alert("Image Upload Failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Property Added Successfully");

      setFormData({
        title: "",
        description: "",
        location: "",
        price: "",
        image: "",
      });
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-6">
        Add Property
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={uploadImage}
          className="border p-2 rounded"
        />

        {uploading && (
          <p>Uploading Image...</p>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="w-full h-48 object-cover rounded"
          />
        )}

        <button
          type="submit"
          className="bg-rose-500 text-white p-2 rounded"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;