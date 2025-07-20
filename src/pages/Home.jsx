import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[60vh] bg-gray-50 flex items-center justify-center flex-col">
      <div className="bg-white rounded-lg shadow p-8 max-w-xl w-full">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-700 flex items-center justify-center gap-2">
          <span role="img" aria-label="hospital">
            🏥
          </span>
          Patient Management System
        </h1>
        <p className="text-gray-700 mb-6 text-center">
          Welcome to the Patient Management System. Use the navigation above to
          view, search, add, or update patient records.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/records"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
          >
            View Records
          </Link>
          <Link
            to="/add"
            className="px-4 py-2 bg-slate-400 text-white rounded hover:bg-slate-500 transition shadow-sm hover:shadow-md"
          >
            Add Patient
          </Link>
        </div>
      </div>
    </div>
  );
}
