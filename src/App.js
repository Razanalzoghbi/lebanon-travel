import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import DestinationsPage from "./Pages/DestinationsPage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import FavoritesPage from "./Pages/FavoritesPage";
import DestinationPage from "./Pages/DestinationPage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";

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
         <Route path="/:slug" element={<DestinationPage />} />
      </Routes>

    </Router>

  );
}

export default App;