import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1920')",
      }}
    >
      <div className="bg-black/60 backdrop-blur-sm p-10 rounded-3xl text-center text-white w-[90%] max-w-2xl shadow-2xl">
        <h1 className="text-5xl font-bold mb-4">
          🏠 Airbnb Clone
        </h1>

        <p className="text-xl text-gray-200 mb-8">
          Find amazing places to stay or
          list your own property and earn.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/home")}
            className="bg-rose-500 hover:bg-rose-600 px-8 py-4 rounded-xl text-lg font-bold transition"
          >
            🔍 Book a Stay
          </button>

          <button
            onClick={() => navigate("/add-property")}
            className="bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl text-lg font-bold transition"
          >
            🏡 List Your Property
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-10 text-center">
          <div>
            <h2 className="text-3xl font-bold">
              500+
            </h2>
            <p>Properties</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              1000+
            </h2>
            <p>Guests</p>
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              ⭐ 4.9
            </h2>
            <p>Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;