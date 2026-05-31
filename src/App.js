import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import DestinationsPage from "./Pages/DestinationsPage";
import BaalbekPage from "./Pages/BaalbekPage";
import BatrounPage from "./Pages/BatrounPage";
import BeirutPage from "./Pages/BeirutPage";
import ByblosPage from "./Pages/ByblosPage";
import JouniehPage from "./Pages/JouniehPage";
import HarissaPage from "./Pages/HarissaPage";
import TripoliPage from "./Pages/TripoliPage";
import ChoufPage from "./Pages/ChoufPage";
import FarayaPage from "./Pages/FarayaPage";
import TyrePage from "./Pages/TyrePage";
import SaidaPage from "./Pages/SaidaPage";
import ZahlePage from "./Pages/ZahlePage";
import AboutPage from "./Pages/AboutPage";
import ContactPage from "./Pages/ContactPage";
import FavoritesPage from "./Pages/FavoritesPage";

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
          path="/baalbek"
          element={<BaalbekPage />}
        />

        <Route
          path="/batroun"
          element={<BatrounPage />}
        />

        
        <Route
          path="/beirut"
          element={<BeirutPage />}
        />

        
        <Route
          path="/byblos"
          element={<ByblosPage />}
        />

        
        <Route
          path="/jounieh"
          element={<JouniehPage />}
        />

        
        <Route
          path="/harissa"
          element={<HarissaPage />}
        />

        <Route
          path="/tripoli"
          element={<TripoliPage />}
        />

        <Route
          path="/chouf"
          element={<ChoufPage />}
        />

        <Route
          path="/faraya"
          element={<FarayaPage />}
        />

        <Route
          path="/tyre"
          element={<TyrePage />}
        />

         <Route
          path="/saida"
          element={<SaidaPage />}
        />

        <Route
          path="/zahle"
          element={<ZahlePage />}
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

      </Routes>

    </Router>

  );
}

export default App;