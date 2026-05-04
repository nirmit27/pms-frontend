import React, { useState, useEffect } from "react";
import {
  X,
  Hash,
  User,
  Users,
  Search,
  Loader2,
  RefreshCcw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  fetchAllRecords,
  fetchRecordById,
  fetchRecordsByName,
  fetchRecordsByNameFuzzy,
} from "../../services/api";

import Header from "../../components/Header";
import Loader from "../../components/ui/Loader";
import { getBMIColor, formatDate } from "../../utils/helpers";

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

  // Fuzzy search suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  // Compute pagination
  const totalPages = Math.ceil(patients.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedPatients = patients.slice(startIndex, endIndex);

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

  // NOTE: Refresh - for fetching latest records
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const data = await fetchAllRecords();

      setPatients(data);
      setCurrentPage(1); // NOTE: Reset pagination - back to 1st page
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Handle name input change with fuzzy search suggestions
  const handleNameChange = async (e) => {
    const value = e.target.value;
    setName(value);

    if (value.trim().length > 0) {
      // NOTE: Fetch fuzzy search suggestions
      const suggestions = await fetchRecordsByNameFuzzy(value);
      setSuggestions(suggestions.slice(0, 5)); // Limit to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSelectSuggestion = (patientName) => {
    setName(patientName);
    setShowSuggestions(false);

    // NOTE: Auto-trigger search
    setTimeout(() => {
      setLoadingName(true);
      setSearched(true);
      fetchRecordsByName(patientName)
        .then(setResults)
        .catch(() => setResults([]))
        .finally(() => setLoadingName(false));
    }, 0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Patient Records" />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Search Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search by ID Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-blue-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Hash className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Search by Patient ID
                </h2>
              </div>

              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={pid}
                    onChange={(e) => setPid(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && fetchPatient()}
                    placeholder="Enter Patient ID"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button
                    onClick={fetchPatient}
                    disabled={loadingID}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 flex items-center gap-2 font-medium focus:outline-none transition-colors cursor-pointer"
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
                  <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                    {result.error ? (
                      <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">{result.error}</span>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-lg text-gray-800">
                            {result.name}
                          </h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getBMIColor(
                              result.verdict,
                            )}`}
                          >
                            {result.verdict}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-gray-500 text-xs">Patient ID</p>
                            <p className="font-semibold text-gray-800">
                              {result.pid}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-gray-500 text-xs">Age</p>
                            <p className="font-semibold text-gray-800">
                              {result.age}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-gray-500 text-xs">Gender</p>
                            <p className="font-semibold text-gray-800">
                              {result.gender}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-gray-500 text-xs">City</p>
                            <p className="font-semibold text-gray-800">
                              {result.city}
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-gray-500 text-xs">Height</p>
                            <p className="font-semibold text-gray-800">
                              {result.height}m
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-gray-500 text-xs">Weight</p>
                            <p className="font-semibold text-gray-800">
                              {result.weight}kg
                            </p>
                          </div>
                          <div className="bg-white p-3 rounded-md">
                            <p className="text-gray-500 text-xs">BMI</p>
                            <p className="font-semibold text-gray-800">
                              {result.bmi}
                            </p>
                          </div>
                          {result.email && (
                            <div className="bg-white p-3 rounded-md">
                              <p className="text-gray-500 text-xs">Email</p>
                              <p className="font-semibold text-gray-800 truncate">
                                {result.email}
                              </p>
                            </div>
                          )}
                        </div>

                        {result.date_of_admission && (
                          <div className="bg-white p-3 rounded-md border-t pt-4">
                            <p className="text-gray-500 text-xs">Admitted</p>
                            <p className="font-semibold text-gray-800">
                              {formatDate(result.date_of_admission)}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Search by Name Card */}
            <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <User className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Search by Patient Name
                </h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      onKeyPress={(e) => e.key === "Enter" && fetchByName()}
                      onFocus={() => name.trim() && setShowSuggestions(true)}
                      onBlur={() =>
                        setTimeout(() => setShowSuggestions(false), 200)
                      }
                      placeholder="Enter Patient Name (e.g., John, Jo, Joh...)"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    />
                    <button
                      onClick={fetchByName}
                      disabled={loadingName}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 active:bg-green-700 disabled:opacity-50 flex items-center gap-2 font-medium focus:outline-none transition-colors cursor-pointer"
                    >
                      {loadingName ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Search className="w-4 h-4" />
                      )}
                      Search
                    </button>
                  </div>

                  {/* Fuzzy Search Suggestions Dropdown */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {suggestions.map((patient) => (
                        <button
                          key={patient.pid}
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleSelectSuggestion(patient.name);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-green-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium text-gray-800">
                                {patient.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {patient.pid} • {patient.city}
                              </p>
                            </div>
                            <span className="text-xs text-gray-400">
                              Click to select
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {searched && (
                  <div className="max-h-80 overflow-y-auto">
                    {loadingName ? (
                      <div className="flex justify-center items-center py-8">
                        <Loader className="w-6 h-6 animate-spin text-green-600" />
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {results.length > 0 ? (
                          results.map((patient) => (
                            <div
                              key={patient.pid}
                              className="bg-gray-50 p-4 rounded-lg border-l-4 border-green-400 hover:shadow-md transition-shadow"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-semibold text-gray-800">
                                    {patient.name}
                                  </h3>
                                  <p className="text-xs text-gray-500">
                                    {patient.pid}
                                  </p>
                                </div>
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-bold ${getBMIColor(
                                    patient.verdict,
                                  )}`}
                                >
                                  {patient.verdict}
                                </span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                <p>Age: {patient.age}</p>
                                <p>Gender: {patient.gender}</p>
                                <p>City: {patient.city}</p>
                                <p>BMI: {patient.bmi}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500">
                            <p>No records found matching your search.</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* All Patients Section */}
          <div className="bg-white rounded-lg shadow-md border-l-4 border-purple-500 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    All Patients
                  </h2>
                  <p className="text-sm text-gray-500">
                    {patients.length} total records
                  </p>
                </div>
              </div>
              {/* Refresh button */}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 flex items-center gap-2 text-sm font-medium transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCcw className="w-4 h-4" />
                )}
                Refresh
              </button>
            </div>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {paginatedPatients.length > 0 ? (
                    paginatedPatients.map((patient) => (
                      <div
                        key={patient.pid}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-lg hover:shadow-md transition-all border-l-2 border-purple-400 hover:border-purple-600"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-gray-800">
                              {patient.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              ID: {patient.pid} • {patient.city}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${getBMIColor(
                              patient.verdict,
                            )}`}
                          >
                            {patient.verdict}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">Age</p>
                            <p className="font-semibold text-gray-800">
                              {patient.age}
                            </p>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">Gender</p>
                            <p className="font-semibold text-gray-800">
                              {patient.gender}
                            </p>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">BMI</p>
                            <p className="font-semibold text-gray-800">
                              {patient.bmi}
                            </p>
                          </div>
                          <div className="bg-white p-2 rounded">
                            <p className="text-gray-500 text-xs">
                              Height/Weight
                            </p>
                            <p className="font-semibold text-gray-800">
                              {patient.height}m / {patient.weight}kg
                            </p>
                          </div>
                        </div>

                        {patient.date_of_admission && (
                          <p className="text-xs text-gray-500 mt-3 pt-2 border-t border-gray-200">
                            Admitted: {formatDate(patient.date_of_admission)}
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="w-12 h-12 opacity-30 mx-auto mb-3" />
                      <p className="font-medium">No patient records found.</p>
                    </div>
                  )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Showing{" "}
                      <span className="font-semibold">{startIndex + 1}</span> to{" "}
                      <span className="font-semibold">
                        {Math.min(endIndex, patients.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold">{patients.length}</span>{" "}
                      records
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Previous page"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-600" />
                      </button>

                      <div className="flex gap-1">
                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1,
                        ).map((page) => (
                          <button
                            key={page}
                            onClick={() => handlePageClick(page)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-purple-500 text-white"
                                : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        title="Next page"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
