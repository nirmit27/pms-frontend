/* API Services */

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: BASE_URL,
});

/* CRUD */

// Fetch all patient records
export const fetchAllRecords = async () => {
  const res = await api.get("/records");
  return res.data.slice(0, -1).reverse();
};

// Fetch patient by ID
export const fetchRecordById = async (pid) => {
  if (!pid.trim()) throw new Error("Patient ID is required");
  const res = await api.get(`/records/id/${pid}`);
  return res.data;
};

// Fetch patients by name
export const fetchRecordsByName = async (name) => {
  if (!name.trim()) throw new Error("Patient name is required");

  const res = await api.get(`/records/name?patient_name=${name}`);
  return res.data;
};

// Fetch patients by name with fuzzy matching - suggested results
export const fetchRecordsByNameFuzzy = async (name) => {
  if (!name.trim()) return [];

  try {
    const res = await api.get(`/records/name/search?patient_name=${name}`);
    return res.data || [];
  } catch (error) {
    console.warn("Fuzzy search error:", error);
    return [];
  }
};

// Admit a new patient
export const admitPatient = async (patientData) => {
  const res = await api.post("/admit", patientData);
  return res.data;
};

// Fetch count of recent admissions (past 24 hrs.)
export const fetchRecentAdmissionsCount = async () => {
  const res = await api.get("/records/recent-admissions");
  return res.data.count;
};

// Update existing record
export const updatePatientRecord = async (updatedData) => {
  const res = await api.put("/patient/update", updatedData);
  return res.data;
};

// Discharge patient
export const dischargePatient = async (pid) => {
  if (!pid.trim()) throw new Error("Patient ID is required");
  const res = await api.delete(`/discharge/${pid}`);
  return res.data;
};
  