import React from "react";
import { X, Copy, Mail, MapPin, Ruler, Weight, Calendar } from "lucide-react";

export default function PatientModal({ patient, isOpen, onClose }) {
  if (!isOpen || !patient) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-700 bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-white flex items-center justify-between">
            <h2 className="text-xl font-bold">Patient Details</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-blue-400 rounded-lg transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-xs font-semibold mb-1">
                      Patient Name
                    </p>
                    <p className="text-gray-800 font-semibold text-lg">
                      {patient.name}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-xs font-semibold mb-1">
                      Patient ID
                    </p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-800 font-semibold text-lg">
                        {patient.pid}
                      </p>
                      <button
                        onClick={() => copyToClipboard(patient.pid)}
                        className="p-1 hover:bg-gray-200 rounded transition-colors cursor-pointer"
                        title="Copy to clipboard"
                      >
                        <Copy size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-xs font-semibold mb-1">
                      Gender
                    </p>
                    <p className="text-gray-800 font-semibold capitalize">
                      {patient.gender || "N/A"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-xs font-semibold mb-1">
                      Age
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {patient.age} years
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <MapPin size={16} /> Location
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-800 font-semibold">
                    {patient.city || "N/A"}
                  </p>
                </div>
              </div>

              {/* Contact */}
              {patient.email && (
                <div>
                  <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                    <Mail size={16} /> Contact
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <a
                      href={`mailto:${patient.email}`}
                      className="text-blue-600 hover:text-blue-800 font-medium break-all"
                    >
                      {patient.email}
                    </a>
                  </div>
                </div>
              )}

              {/* Health Metrics */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4">
                  Health Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <Ruler size={24} className="text-blue-600" />
                    <div>
                      <p className="text-gray-600 text-xs font-semibold">
                        Height
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {patient.height ? `${patient.height} m` : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
                    <Weight size={24} className="text-green-600" />
                    <div>
                      <p className="text-gray-600 text-xs font-semibold">
                        Weight
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {patient.weight ? `${patient.weight} kg` : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-600 text-xs font-semibold mb-1">
                      BMI
                    </p>
                    <p className="text-gray-800 font-semibold">
                      {patient.bmi || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* BMI Status */}
              {patient.verdict && (
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-600 text-xs font-semibold mb-2">
                    BMI Status
                  </p>
                  <span
                    className={`px-3 py-2 rounded-full text-sm font-semibold ${
                      patient.verdict?.includes("Normal")
                        ? "bg-green-100 text-green-700"
                        : patient.verdict?.includes("Underweight")
                          ? "bg-blue-100 text-blue-700"
                          : patient.verdict?.includes("Overweight")
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                    }`}
                  >
                    {patient.verdict}
                  </span>
                </div>
              )}

              {/* Dates */}
              <div>
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <Calendar size={16} /> Important Dates
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {patient.date_of_admission && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-xs font-semibold mb-1">
                        Date of Admission
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {formatDate(patient.date_of_admission)}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatTime(patient.date_of_admission)}
                      </p>
                    </div>
                  )}
                  {patient.date_of_discharge && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 text-xs font-semibold mb-1">
                        Date of Discharge
                      </p>
                      <p className="text-gray-800 font-semibold">
                        {formatDate(patient.date_of_discharge)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
