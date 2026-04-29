import React, { useState } from "react";
import { Edit3, Loader2 } from "lucide-react";
import { api } from "../../services/api";
import Header from "../../components/Header";

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
    <div className="min-h-screen flex flex-col">
      <Header
        title="Update Patient Record"
      />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-purple-500 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Edit3 className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Update Patient Information
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Search by Patient ID and update the information
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient ID *
                </label>
                <input
                  type="text"
                  value={formData.pid || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, pid: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Enter Patient ID"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder={`Enter ${label.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 active:bg-purple-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-5 h-5" />
                      <span>Update Patient</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {message && (
              <div
                className={`mt-6 p-4 rounded-lg font-medium ${
                  message.includes("Error")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-purple-50 text-purple-700 border border-purple-200"
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
