import React from "react";

// Components
import Sidebar from "./components/Sidebar";

// Pages
import Home from "./pages/Home";
import Records from "./pages/Patient/Records";
import AddPatient from "./pages/Patient/AddPatient";
import UpdatePatient from "./pages/Patient/UpdatePatient";

import { HashRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/records" element={<Records />} />
            <Route path="/add" element={<AddPatient />} />
            <Route path="/update" element={<UpdatePatient />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
