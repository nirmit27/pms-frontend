import React, { useState } from "react";

import { api } from "../../services/api";

import Loader from "../../components/ui/Loader";
import PatientCard from "../../components/ui/PatientCard";

export default function SearchByID() {
  const [pid, setPid] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPatient = () => {
    if (!pid.trim()) return;
    setLoading(true);
    setResult(null);
    api
      .get(`/patient/id/${pid}`)
      .then((res) => setResult(res.data))
      .catch((err) =>
        setResult({
          error: err.response?.data?.detail || "Error fetching data!",
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
        Search Patient by ID
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={pid}
          onChange={(e) => setPid(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        />
        <button
          onClick={fetchPatient}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto cursor-pointer"
        >
          Search
        </button>
      </div>
      {loading && <Loader />}
      {result && (
        <div className="mt-6">
          {result.error ? (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center">
              {result.error}
            </div>
          ) : (
            <PatientCard patient={result} />
          )}
        </div>
      )}
    </div>
  );
}
