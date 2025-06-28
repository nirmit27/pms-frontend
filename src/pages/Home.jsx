import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-white rounded-lg shadow p-8 max-w-xl w-full">
        <h1 className="text-3xl font-extrabold mb-4 text-gray-700 flex items-center justify-center gap-2">
          <span role="img" aria-label="hospital">
            🏥
          </span>
          Patient Management System
        </h1>
        <p className="text-gray-700 mb-6">
          Welcome to the Patient Management System. Use the navigation above to
          view, search, add, or update patient records.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="/view-all"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            View All Patients
          </a>
          <a
            href="/add"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add Patient
          </a>
        </div>
      </div>
    </div>
  );
}
