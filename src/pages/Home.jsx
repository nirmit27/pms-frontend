import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit3,
  FileText,
  Activity,
  CheckCircle,
  Search,
  Clock,
  AlertCircle,
} from "lucide-react";

import Header from "../components/Header";
import PatientModal from "../components/PatientModal";
import {
  fetchAllRecords,
  fetchRecentAdmissionsCount,
  fetchRecentActivities,
  fetchRecordById,
  dischargePatient,
} from "../services/api";

export default function Home() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    recentAdmissions: 0,
    recentPatients: [],
    loading: true,
  });

  const [activities, setActivities] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchData = async () => {
      setStats((prev) => ({ ...prev, loading: true }));
      try {
        const patients = await fetchAllRecords();
        const recentAdmissionsCount = await fetchRecentAdmissionsCount();

        const recent = patients.slice(-5).reverse();
        setStats((prev) => ({
          ...prev,
          totalPatients: patients.length,
          recentAdmissions: recentAdmissionsCount,
          recentPatients: recent,
          loading: false,
        }));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  // Fetch activities with polling (every 5 seconds)
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await fetchRecentActivities(10);
        setActivities(data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
    const interval = setInterval(fetchActivities, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle patient row click to open modal
  const handlePatientClick = async (patient) => {
    try {
      const fullPatient = await fetchRecordById(patient.pid);
      setSelectedPatient(fullPatient);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  // Handle patient discharge
  const handleDischargePatient = async (pid) => {
    try {
      await dischargePatient(pid);
      // Refresh dashboard data after discharge
      const patients = await fetchAllRecords();
      const recentAdmissionsCount = await fetchRecentAdmissionsCount();
      const recent = patients.slice(-5).reverse();

      setStats({
        totalPatients: patients.length,
        recentAdmissions: recentAdmissionsCount,
        recentPatients: recent,
        loading: false,
      });

      alert("Patient discharged successfully");
    } catch (error) {
      console.error("Error discharging patient:", error);
      throw error;
    }
  };

  // Format timestamp to relative time
  const formatTimeAgo = (timestamp) => {
    try {
      const now = new Date();
      const then = new Date(timestamp);
      const diff = Math.floor((now - then) / 1000); // difference in seconds

      if (diff < 60) return "just now";
      if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
      if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
      if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
      return then.toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  // Get icon and color based on action type
  const getActivityIcon = (actionType) => {
    switch (actionType) {
      case "patient_admitted":
        return { icon: Plus, bg: "bg-blue-50", color: "text-blue-600" };
      case "patient_updated":
        return { icon: Edit3, bg: "bg-purple-50", color: "text-purple-600" };
      case "patient_discharged":
        return {
          icon: CheckCircle,
          bg: "bg-green-50",
          color: "text-green-600",
        };
      case "system_check":
        return { icon: Activity, bg: "bg-green-50", color: "text-green-600" };
      default:
        return { icon: Clock, bg: "bg-gray-50", color: "text-gray-600" };
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Dashboard" />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Primary KPI */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 text-white flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-90">
                  Total Patients
                </p>
                <p className="text-4xl font-bold mt-1">{stats.totalPatients}</p>
                <p className="text-xs opacity-75 mt-1">
                  Active records in system
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-300">
                  +{stats.recentAdmissions}
                </p>
                <p className="text-xs opacity-90">Last 24h</p>
              </div>
            </div>
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* New Admissions - with semantic color */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    New Admissions
                  </p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats.recentAdmissions}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Last 24 hours</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Status</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    Optimal
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    All systems online
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <Activity size={32} className="text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {/* View Records */}
              <a
                href="/#/records"
                className="bg-white rounded-lg shadow hover:shadow-md transition-all p-4 border-l-4 border-blue-500 hover:bg-blue-50 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100">
                    <FileText size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      Search patients
                    </p>
                    <p className="text-xs text-gray-500">Find records</p>
                  </div>
                </div>
              </a>

              {/* Add Patient */}
              <a
                href="/#/add"
                className="bg-white rounded-lg shadow hover:shadow-md transition-all p-4 border-l-4 border-blue-500 hover:bg-blue-50 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100">
                    <Plus size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      Admit patient
                    </p>
                    <p className="text-xs text-gray-500">New record</p>
                  </div>
                </div>
              </a>

              {/* Edit Record */}
              <a
                href="/#/update"
                className="bg-white rounded-lg shadow hover:shadow-md transition-all p-4 border-l-4 border-blue-500 hover:bg-blue-50 group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100">
                    <Edit3 size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">
                      Edit record
                    </p>
                    <p className="text-xs text-gray-500">Update info</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Recent Admissions Table */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                Recent Admissions
              </h3>
              <span className="text-xs text-gray-500">
                {stats.recentPatients.length} records
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Age
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentPatients.length > 0 ? (
                    stats.recentPatients.map((patient, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors group"
                      >
                        <td className="px-6 py-3 text-sm font-medium text-gray-800">
                          {patient.name}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">
                          {patient.pid}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">
                          {patient.age}
                        </td>
                        <td className="px-6 py-3 text-sm text-gray-600">
                          {patient.city}
                        </td>
                        <td className="px-6 py-3 text-sm">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              patient.verdict?.includes("Normal")
                                ? "bg-green-100 text-green-700"
                                : patient.verdict?.includes("Overweight")
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {patient.verdict || "—"}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-sm">
                          <button
                            onClick={() => handlePatientClick(patient)}
                            className="px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-8 text-center text-gray-500 text-sm"
                      >
                        No recent admissions.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Changes - Activity Feed */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                Recent Activity
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {activities.length > 0 ? (
                activities.map((activity, idx) => {
                  const {
                    icon: Icon,
                    bg,
                    color,
                  } = getActivityIcon(activity.action_type);
                  return (
                    <div
                      key={idx}
                      className="px-6 py-4 flex items-start gap-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className={`p-2 ${bg} rounded-lg flex-shrink-0`}>
                        <Icon size={18} className={color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">
                          {activity.patient_name
                            ? `${activity.patient_name} - ${activity.description}`
                            : activity.description}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {activity.action_type
                            .replace("_", " ")
                            .charAt(0)
                            .toUpperCase() +
                            activity.action_type.replace("_", " ").slice(1)}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="px-6 py-8 text-center text-gray-500 text-sm">
                  No recent activities.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Patient Modal */}
      <PatientModal
        patient={selectedPatient}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedPatient(null);
        }}
        onDischarge={handleDischargePatient}
      />
    </div>
  );
}
