import React, { useState } from "react";
import { api } from "../../services/api";

export default function AddPatient() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fields = [
    { key: "name", label: "Name", type: "text" },
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
      const res = await api.post("/new-patient", formData);
      setMessage(res.data.message);
      setFormData({});
    } catch (e) {
      setMessage(e.response?.data?.detail || "Error adding patient record!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Patient Admission
        </h2>
        <div className="h-1 bg-slate-300 rounded"></div>
      </div>

      <div className="space-y-6">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.name || ""}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
            placeholder="Enter Name"
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Submitting...</span>
              </div>
            ) : (
              "Admit"
            )}
          </button>
        </div>
      </div>

      {message && (
        <div
          className={`mt-4 p-4 rounded-lg text-center font-medium ${
            message.includes("success")
              ? "bg-green-100 text-green-800 border border-green-200"
              : "bg-red-100 text-red-800 border border-red-200"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
