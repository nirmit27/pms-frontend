import React from "react";

export default function PatientCard({ patient }) {
  return (
    <div className="bg-blue-50 rounded-lg shadow p-6 max-w-md mx-auto">
      <h3 className="text-xl font-bold text-blue-700 mb-2 flex items-center gap-2">
        <span role="img" aria-label="patient">
          🧑‍⚕️
        </span>
        {patient.name}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-gray-700 text-sm">
        <div>
          <span className="font-semibold">Patient ID:</span> {patient.pid}
        </div>
        <div>
          <span className="font-semibold">Gender:</span> {patient.gender}
        </div>
        <div>
          <span className="font-semibold">Age:</span> {patient.age}
        </div>
        <div>
          <span className="font-semibold">City:</span> {patient.city}
        </div>
        <div>
          <span className="font-semibold">Email:</span> {patient.email}
        </div>
        <div>
          <span className="font-semibold">Height:</span> {patient.height} m
        </div>
        <div>
          <span className="font-semibold">Weight:</span> {patient.weight} kg
        </div>
        <div>
          <span className="font-semibold">BMI:</span> {patient.bmi} (
          {patient.verdict})
        </div>
        <div>
          <span className="font-semibold">Admitted:</span>{" "}
          {patient.date_of_admission
            ? new Date(patient.date_of_admission).toLocaleDateString()
            : "N/A"}
        </div>
        <div>
          <span className="font-semibold">Discharged:</span>{" "}
          {patient.date_of_discharge
            ? new Date(patient.date_of_discharge).toLocaleDateString()
            : "—"}
        </div>
      </div>
    </div>
  );
}
