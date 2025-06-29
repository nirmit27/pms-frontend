import React from "react";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import ViewAll from "./pages/Patient/ViewAll";
import SearchByID from "./pages/Patient/SearchByID";
import SearchByName from "./pages/Patient/SearchByName";
import AddPatient from "./pages/Patient/AddPatient";
import UpdatePatient from "./pages/Patient/UpdatePatient";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/view-all" element={<ViewAll />} />
            <Route path="/search-id" element={<SearchByID />} />
            <Route path="/search-name" element={<SearchByName />} />
            <Route path="/add" element={<AddPatient />} />
            <Route path="/update" element={<UpdatePatient />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
