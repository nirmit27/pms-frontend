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
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow p-8 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Patient Admission
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              value={formData[key] || ""}
              placeholder={label}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-200 transition"
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold cursor-pointer"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
      {message && (
        <p className="mt-6 text-center text-lg text-blue-600">{message}</p>
      )}
    </div>
  );
}
