import React, { useState, useEffect } from "react";
import {
  Users,
  Plus,
  Edit3,
  FileText,
  TrendingUp,
  Calendar,
} from "lucide-react";

import Header from "../components/Header";
import DashboardCard from "../components/DashboardCard";
import { fetchAllRecords } from "../services/api";

export default function Home() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    recentAdmissions: 0,
    loading: true,
  });

  useEffect(() => {
    fetchAllRecords()
      .then((patients) => {
        setStats({
          totalPatients: patients.length,
          recentAdmissions: Math.floor(patients.length * 0.3), // Simulated
          loading: false,
        });
      })
      .catch(() => {
        setStats((prev) => ({ ...prev, loading: false }));
      });
  }, []);

  const dashboardItems = [
    {
      icon: FileText,
      title: "View Records",
      description: "Search and view patient record(s).",
      linkTo: "/records",
      linkText: "View Records",
      backgroundColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-500",
      stats: [
        { value: stats.totalPatients, label: "Total Patients" },
        { value: stats.recentAdmissions, label: "Recent" },
      ],
    },
    {
      icon: Plus,
      title: "Admit Patient",
      description: "Add a new patient record.",
      linkTo: "/add",
      linkText: "Add Patient",
      backgroundColor: "bg-slate-50",
      borderColor: "border-slate-200",
      iconColor: "text-slate-500",
      stats: [
        { value: "24/7", label: "Availability" },
        { value: "Quick", label: "Entry" },
      ],
    },
    {
      icon: Edit3,
      title: "Update Record",
      description: "Modify existing patient record(s).",
      linkTo: "/update",
      linkText: "Update Record",
      backgroundColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-500",
      stats: [
        { value: "Fast", label: "Updates" },
        { value: "Safe", label: "Changes" },
      ],
    },
    {
      icon: TrendingUp,
      title: "System Health",
      description: "Monitor system performance.",
      backgroundColor: "bg-green-150",
      borderColor: "border-green-200",
      iconColor: "text-green-500",
      stats: [
        { value: "100%", label: "Uptime" },
        { value: "Optimal", label: "Status" },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        title="Dashboard"
      />

      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Total Patients
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {stats.totalPatients}
                  </p>
                </div>
                <Users size={40} className="text-blue-500 opacity-20" />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                📈 +{stats.recentAdmissions} this month
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-slate-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    New Admissions
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    {stats.recentAdmissions}
                  </p>
                </div>
                <Calendar size={40} className="text-slate-500 opacity-20" />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                ✓ All admission records updated
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    Pending Updates
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">0</p>
                </div>
                <Edit3 size={40} className="text-purple-500 opacity-20" />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                ✓ All records current
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border-t-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">
                    System Status
                  </p>
                  <p className="text-2xl font-bold text-gray-800 mt-2">
                    Optimal
                  </p>
                </div>
                <TrendingUp size={40} className="text-green-500 opacity-20" />
              </div>
              <p className="text-xs text-gray-500 mt-4">
                🟢 All systems operational
              </p>
            </div>
          </div>

          {/* Main Dashboard Cards */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardItems.map((item, idx) => (
                <DashboardCard key={idx} {...item} />
              ))}
            </div>
          </div>

          {/* Recent Activity Section */}
          {/* <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4 pb-3 border-b border-gray-200">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Plus size={20} className="text-blue-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Patient Added</p>
                  <p className="text-xs text-gray-500">
                    New patient record created
                  </p>
                </div>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center gap-4 pb-3 border-b border-gray-200">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Edit3 size={20} className="text-purple-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Record Updated</p>
                  <p className="text-xs text-gray-500">
                    Patient information modified
                  </p>
                </div>
                <span className="text-xs text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText size={20} className="text-green-500" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">Records Viewed</p>
                  <p className="text-xs text-gray-500">
                    Multiple patient records accessed
                  </p>
                </div>
                <span className="text-xs text-gray-400">1 day ago</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
