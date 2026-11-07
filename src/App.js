import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import DestinationsPage from "./Pages/DestinationsPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import FavoritesPage from "./Pages/FavoritesPage";
import DestinationPage from "./Pages/DestinationPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import PlaceDetailsPage from "./Pages/PlaceDetailsPage";
import MyBookingsPage from "./Pages/MyBookingsPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import OwnerDashboardPage from "./Pages/OwnerDashboardPage";
import NearbyPage from "./Pages/NearbyPage";

import "./App.css";


function App() {
  return (

    <Router>
      <Routes>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/destinations"
          element={<DestinationsPage />}
        />

         <Route
          path="/about"
          element={<AboutPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        />

         <Route
          path="/favorites"
          element={<FavoritesPage />}
        />
         <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />
         <Route path="/places/:id" element={<PlaceDetailsPage />} />
         <Route path="/my-bookings" element={<MyBookingsPage />} />
         <Route path="/admin" element={<AdminDashboardPage/>} />
         <Route path="/owner" element={<OwnerDashboardPage />} />
         <Route path="/nearby/:slug" element={<NearbyPage />} />
         <Route path="/:slug" element={<DestinationPage />} />
      </Routes>

    </Router>

  );
}

export default App;