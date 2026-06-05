import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showMenu, setShowMenu] =
    useState(false);

  const token =
    localStorage.getItem("token");

  const userName =
    localStorage.getItem("userName") ||
    "User";

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");

    navigate("/login");
    // window.location.reload();
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1
        className="text-2xl font-bold text-rose-500 cursor-pointer"
        onClick={() => navigate("/home")}
      >
        🏡 StayFinder
      </h1>

      {!token ? (
        <div className="flex gap-6 items-center">
          <Link
            to="/login"
            className="hover:text-rose-500"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-rose-500"
          >
            Register
          </Link>
        </div>
      ) : (
        <div className="relative">
          <button
            onClick={() =>
              setShowMenu(!showMenu)
            }
            className="bg-rose-500 text-white w-10 h-10 rounded-full font-bold"
          >
            {userName.charAt(0).toUpperCase()}
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-xl rounded-xl overflow-hidden">
              <div className="p-4 border-b font-semibold text-center">
                👋 {userName}
              </div>

              <Link
                to="/home"
                className="block px-4 py-3 hover:bg-gray-100"
              >
                🏠 Home
              </Link>

              <Link
                to="/add-property"
                className="block px-4 py-3 hover:bg-gray-100"
              >
                ➕ Add Property
              </Link>

              <Link
                to="/my-properties"
                className="block px-4 py-3 hover:bg-gray-100"
              >
                🏡 My Properties
              </Link>

              <Link
                to="/my-bookings"
                className="block px-4 py-3 hover:bg-gray-100"
              >
                📅 My Bookings
              </Link>

              <Link
                to="/my-favorites"
                className="block px-4 py-3 hover:bg-gray-100"
              >
                ❤️ Favorites
              </Link>

              <button
                onClick={logoutHandler}
                className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;