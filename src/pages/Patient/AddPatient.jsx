import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react";

import Header from "../../components/Header";
import { admitPatient } from "../../services/api";
import { calculateBMI } from "../../utils/helpers";
import { fields } from "../../constants/constants";
import { useEffect } from "react";

export default function AddPatient() {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 20000); // 20 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Unified handler for all field changes
  const handleFieldChange = (key, value) => {
    let updated = { ...formData, [key]: value };
    // If height or weight changes, recalculate BMI
    if (key === "height" || key === "weight") {
      const height = key === "height" ? value : updated.height;
      const weight = key === "weight" ? value : updated.weight;
      updated.bmi = calculateBMI(weight, height);
    }
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await admitPatient(formData);
      setMessage(res.message);
      setFormData({});
    } catch (e) {
      setMessage(e.response?.data?.detail || "Error adding patient record!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Admit Patient" />

      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-slate-500 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-slate-100 rounded-lg">
                <Plus className="w-6 h-6 text-slate-500" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Patient Admission Form
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Fill in the patient details to admit a new patient.
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                  placeholder="Enter patient name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map(({ key, label, type, step, options }) => (
                  <div key={key}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {label} *
                    </label>
                    {type === "select" ? (
                      <select
                        value={formData[key] || ""}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Select {label.toLowerCase()}</option>
                        {options?.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={type}
                        step={step}
                        value={formData[key] || ""}
                        onChange={(e) => handleFieldChange(key, e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent transition-all"
                        placeholder={
                          label != "BMI"
                            ? `Enter ${label.toLowerCase()}`
                            : "Calculated BMI value..."
                        }
                        {...(key === "bmi"
                          ? {
                              readOnly: true,
                              tabIndex: -1,
                              style: {
                                background: "#f3f4f6",
                                cursor: "not-allowed",
                              },
                            }
                          : {})}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-slate-500 text-white font-semibold rounded-lg hover:bg-slate-600 active:bg-slate-700 disabled:opacity-50 flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
                    ? "bg-slate-50 text-slate-700 border border-slate-200"
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
