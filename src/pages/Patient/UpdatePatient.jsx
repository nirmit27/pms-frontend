import React, { useState } from "react";
import { api } from "../../services/api";

export default function UpdatePatient() {
  const [formData, setFormData] = useState({ pid: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { key: "pid", label: "Patient ID", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
    { key: "gender", label: "Gender", type: "text" },
    { key: "age", label: "Age", type: "number" },
    { key: "city", label: "City", type: "text" },
    { key: "height", label: "Height (m)", type: "number", step: "0.01" },
    { key: "weight", label: "Weight (kg)", type: "number", step: "0.1" },
    { key: "bmi", label: "BMI", type: "number", step: "0.01" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await api.put("/update-patient", formData);
      setMessage(res.data.message || "Patient updated successfully!");
      setFormData({ pid: "" });
    } catch (e) {
      setMessage(e.response?.data?.detail || "Error updating patient record!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Update Patient Record
        </h2>
        <div className="h-1 bg-slate-300 rounded"></div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Patient ID
          </label>
          <input
            type="text"
            value={formData.pid || ""}
            onChange={(e) => setFormData({ ...formData, pid: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            placeholder="Enter Patient ID"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.slice(1).map(({ key, label, type, step }) => (
            <div key={key} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                step={step}
                value={formData[key] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [key]: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v16a8 8 0 01-8-8z"
                />
              </svg>
            ) : null}
            {loading ? "Updating..." : "Update"}
          </button>
        </div>

        {message && (
          <div
            className={`mt-4 p-4 rounded-md text-center ${
              message.includes("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
