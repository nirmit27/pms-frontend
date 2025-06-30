/* API Service */

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: BASE_URL,
  // baseURL: "http://localhost:8000",
});

/* CRUD functions */

// Fetch all patient records
export const fetchAllRecords = async () => {
  const res = await api.get("/view");
  return res.data.slice(0, -1);
};

// Fetch patient by ID
export const fetchRecordById = async (pid) => {
  if (!pid.trim()) throw new Error("Patient ID is required");
  const res = await api.get(`/patient/id/${pid}`);
  return res.data;
};

// Fetch patients by name
export const fetchRecordsByName = async (name) => {
  if (!name.trim()) throw new Error("Patient name is required");

  const res = await api.get(`/patients/name?patient_name=${name}`);
  return res.data;
};
