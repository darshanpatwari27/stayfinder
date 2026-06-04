import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddProperty from "./pages/AddProperty";
import PropertyDetails from "./pages/PropertyDetails";
import EditProperty from "./pages/EditProperty";
import MyBookings from "./pages/MyBookings";
import MyFavorites from "./pages/MyFavorites";
import MyProperties from "./pages/MyProperties";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Welcome />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/property/:id"
          element={<PropertyDetails />}
        />

        <Route
          path="/add-property"
          element={
            <PrivateRoute>
              <AddProperty />
            </PrivateRoute>
          }
        />

        <Route
          path="/edit-property/:id"
          element={
            <PrivateRoute>
              <EditProperty />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-favorites"
          element={
            <PrivateRoute>
              <MyFavorites />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-properties"
          element={
            <PrivateRoute>
              <MyProperties />
            </PrivateRoute>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;