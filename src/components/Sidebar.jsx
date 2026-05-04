import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, FileText, Plus, Edit3 } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { path: "/", label: "Dashboard", icon: Home },
    { path: "/records", label: "Records", icon: FileText },
  ];

  const actionItems = [
    { path: "/add", label: "Admit Patient", icon: Plus },
    { path: "/update", label: "Edit Record", icon: Edit3 },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white text-gray-900 shadow-lg z-40 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-gray-200">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span role="img" aria-label="hospital" className="text-2xl">
              🏥
            </span>
            PMS
          </h1>
          <p className="text-gray-600 text-xs mt-1">Patient Management</p>  
        </div>

        {/* Navigation Section */}
        <div className="p-4">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Navigate
          </p>
          <nav className="space-y-1">
            {navigationItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? "bg-blue-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Actions Section */}
        <div className="px-4 py-2">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
            Actions
          </p>
          <nav className="space-y-1">
            {actionItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? "bg-blue-500 text-white font-semibold shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <p className="text-gray-600 text-xs text-center">
            © 2026 Patient Management System
          </p>
        </div>
      </aside>
    </>
  );
}
