import React, { useState } from "react";
import { api } from "../../services/api";

import Loader from "../../components/ui/Loader";
import PatientTable from "../../components/PatientTable";

export default function SearchByName() {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchByName = () => {
    if (!name.trim()) return;
    setLoading(true);
    setSearched(true);
    api
      .get(`/patients/name?patient_name=${name}`)
      .then((res) => setResults(res.data))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">
        Search Patients by Name
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
        />
        <button
          onClick={fetchByName}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto cursor-pointer"
        >
          Search
        </button>
      </div>
      {loading && <Loader />}
      {!loading && searched && (
        <div>
          <PatientTable data={results} />
        </div>
      )}
    </div>
  );
}
