import React, { useEffect, useState } from "react";

import Loader from "../../components/ui/Loader";
import PatientTable from "../../components/PatientTable";

import { api } from "../../services/api";

export default function ViewAll() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/view")
      .then((res) => setPatients(res.data.slice(0, -1)))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">All Patients</h1>
      {loading ? <Loader /> : <PatientTable data={patients} />}
    </div>
  );
}
