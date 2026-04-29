import React from "react";
import { Link } from "react-router-dom";

export default function DashboardCard({
  icon: Icon,
  title,
  description,
  linkTo,
  linkText,
  stats,
  backgroundColor = "bg-blue-50",
  borderColor = "border-blue-200",
  iconColor = "text-blue-500",
}) {
  return (
    <div
      className={`${backgroundColor} border-l-4 ${borderColor} rounded-lg shadow-md hover:shadow-lg transition-shadow p-6`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-lg ${backgroundColor}`}>
              <Icon size={24} className={iconColor} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>

      {stats && (
        <div className="mb-4 p-3 bg-white rounded-md">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-lg font-bold text-gray-700">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
        >
          {linkText}
          <span></span>
        </Link>
      )}
    </div>
  );
}
