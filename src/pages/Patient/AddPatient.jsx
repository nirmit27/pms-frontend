import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { api } from "../../services/api";
import Header from "../../components/Header";

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
    <div className="min-h-screen flex flex-col">
      <Header
        title="Admit Patient"
      />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-green-500 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-100 rounded-lg">
                <Plus className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Patient Admission Form
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Fill in the patient details to admit a new patient
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter patient name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.slice(1).map(({ key, label, type, step }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      step={step}
                      value={formData[key] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [key]: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 active:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Admitting...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      <span>Admit Patient</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`mt-6 p-4 rounded-lg font-medium ${
                  message.includes("success")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
