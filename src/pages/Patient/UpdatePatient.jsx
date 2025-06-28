import React, { useState } from "react";
import { api } from "../../services/api";

export default function UpdatePatient() {
  const [formData, setFormData] = useState({ pid: "" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fields = [
    { key: "pid", label: "Patient ID", type: "text" },
    { key: "name", label: "Name", type: "text" },
    { key: "gender", label: "Gender", type: "text" },
    { key: "age", label: "Age", type: "number" },
    { key: "city", label: "City", type: "text" },
    { key: "height", label: "Height (m)", type: "number", step: "0.01" },
    { key: "weight", label: "Weight (kg)", type: "number", step: "0.1" },
    { key: "bmi", label: "BMI", type: "number", step: "0.01" },
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await api.put("/update-patient", formData);
      setResult(res.data);
    } catch (e) {
      setResult({ error: e.response?.data?.detail || "Update failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Record Updation
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        {fields.map(({ key, label, type, step }) => (
          <div key={key}>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor={key}
            >
              {label}
            </label>
            <input
              id={key}
              type={type}
              step={step}
              placeholder={label}
              value={formData[key] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-200 transition"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition font-semibold cursor-pointer"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {result && (
        <div className="mt-6">
          {result.error ? (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center">
              {result.error}
            </div>
          ) : (
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded text-center">
              {result.message || "Patient updated successfully!"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
