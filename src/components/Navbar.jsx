import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-4 flex items-center space-x-6">
        <Link to="/" className="text-slate-600 font-semibold hover:underline">
          Home
        </Link>
        {/*
        <Link
          to="/view-all"
          className="text-slate-600 font-semibold hover:underline"
        >
          View All
        </Link>
        <Link
          to="/search-id"
          className="text-slate-600 font-semibold hover:underline"
        >
          Search by ID
        </Link>
        <Link
          to="/search-name"
          className="text-slate-600 font-semibold hover:underline"
        >
          Search by Name
        </Link>
        */}
        <Link
          to="/records"
          className="text-slate-600 font-semibold hover:underline"
        >
          Records
        </Link>
        <Link to="/add" className="text-slate-600 font-semibold hover:underline">
          Admit
        </Link>
        <Link
          to="/update"
          className="text-slate-600 font-semibold hover:underline"
        >
          Update
        </Link>
      </div>
    </nav>
  );
}
