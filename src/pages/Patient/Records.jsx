import React, { useState, useEffect } from "react";
import {
  Hash,
  User,
  Search,
  Users,
  Loader2,
  AlertCircle,
} from "lucide-react";

import {
  fetchAllRecords,
  fetchRecordById,
  fetchRecordsByName,
} from "../../services/api";
import { getBMIColor, formatDate } from "../../utils/helpers";
import Loader from "../../components/ui/Loader";

export default function Records() {
  const [result, setResult] = useState(null);
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingID, setLoadingID] = useState(false);

  const [loadingName, setLoadingName] = useState(false);
  const [searched, setSearched] = useState(false);

  const [pid, setPid] = useState("");
  const [name, setName] = useState("");
  const [patients, setPatients] = useState([]);

  // Fetch all records
  useEffect(() => {
    setLoading(true);

    fetchAllRecords()
      .then(setPatients)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Fetch record by ID
  const fetchPatient = async () => {
    if (!pid.trim()) return;
    setLoadingID(true);
    setResult(null);

    try {
      const data = await fetchRecordById(pid);
      setResult(data);
    } catch (err) {
      setResult({
        error: err.response?.data?.detail || "Error fetching data.",
      });
    } finally {
      setLoadingID(false);
    }
  };

  // Fetch record(s) by name
  const fetchByName = async () => {
    if (!name.trim()) return;
    setLoadingName(true);
    setSearched(true);

    try {
      const data = await fetchRecordsByName(name);
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoadingName(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-700">
              Patient Records
            </h1>
          </div>
          <p className="text-gray-600 mt-2">
            Look up patient records using the options below.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search by ID */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Hash className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Search by Patient ID</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pid}
                  onChange={(e) => setPid(e.target.value)}
                  placeholder="Enter Patient ID (e.g., P001)"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={fetchPatient}
                  disabled={loadingID}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {loadingID ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Search
                </button>
              </div>

              {result && (
                <div className="bg-gray-50 p-4 rounded-md">
                  {result.error ? (
                    <div className="flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {result.error}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{result.name}</h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getBMIColor(
                            result.verdict
                          )}`}
                        >
                          {result.verdict}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">ID:</span> {result.pid}
                        </p>
                        <p>
                          <span className="font-medium">Age:</span> {result.age}
                        </p>
                        <p>
                          <span className="font-medium">Gender:</span>{" "}
                          {result.gender}
                        </p>
                        <p>
                          <span className="font-medium">City:</span>{" "}
                          {result.city}
                        </p>
                        <p>
                          <span className="font-medium">Height:</span>{" "}
                          {result.height}m
                        </p>
                        <p>
                          <span className="font-medium">Weight:</span>{" "}
                          {result.weight}kg
                        </p>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <p className="text-sm">
                          <span className="font-medium">BMI:</span> {result.bmi}
                        </p>
                        {result.email && (
                          <p className="text-sm">
                            <span className="font-medium">Email:</span>{" "}
                            {result.email}
                          </p>
                        )}
                        {result.date_of_admission && (
                          <p className="text-sm">
                            <span className="font-medium">Admitted:</span>{" "}
                            {formatDate(result.date_of_admission)}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Search by Name */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold">Search by Patient Name</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Patient Name"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <button
                  onClick={fetchByName}
                  disabled={loadingName}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 text-sm"
                >
                  {loadingName ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Search
                </button>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {loadingName ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader className="w-6 h-6 animate-spin text-green-600" />
                  </div>
                ) : (
                  searched && (
                    <div className="space-y-2">
                      {results.length > 0 ? (
                        results.map((patient) => (
                          <div
                            key={patient.pid}
                            className="bg-gray-50 p-3 rounded-md"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-medium text-sm">
                                {patient.name}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getBMIColor(
                                  patient.verdict
                                )}`}
                              >
                                {patient.verdict}
                              </span>
                            </div>
                            <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                              <p>ID: {patient.pid}</p>
                              <p>Age: {patient.age}</p>
                              <p>Gender: {patient.gender}</p>
                              <p>City: {patient.city}</p>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">
                              BMI: {patient.bmi}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-500 text-sm">
                          No patients found matching your search.
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          {/* All Records */}
          <div className="lg:row-span-2 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl font-semibold">All Patients</h2>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {patients.map((patient) => (
                  <div
                    key={patient.pid}
                    className="bg-gray-50 p-4 rounded-md hover:bg-gray-100 transition-colors border-l-4 border-purple-400"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium text-lg">{patient.name}</h3>
                        <p className="text-sm text-gray-600">
                          {patient.pid} • {patient.city}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getBMIColor(
                          patient.verdict
                        )}`}
                      >
                        {patient.verdict}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-2">
                      <p>
                        <span className="font-medium">Age:</span> {patient.age}
                      </p>
                      <p>
                        <span className="font-medium">Gender:</span>{" "}
                        {patient.gender}
                      </p>
                      <p>
                        <span className="font-medium">Height:</span>{" "}
                        {patient.height}m
                      </p>
                      <p>
                        <span className="font-medium">Weight:</span>{" "}
                        {patient.weight}kg
                      </p>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <p className="text-sm font-medium">BMI: {patient.bmi}</p>
                      {patient.date_of_admission && (
                        <p className="text-xs text-gray-500">
                          Admitted: {formatDate(patient.date_of_admission)}
                        </p>
                      )}
                    </div>

                    {patient.email && (
                      <p className="text-xs text-gray-500 mt-1">
                        {patient.email}
                      </p>
                    )}
                  </div>
                ))}

                {patients.length === 0 && !loading && (
                  <div className="text-center py-8 text-gray-500">
                    No patient records found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
