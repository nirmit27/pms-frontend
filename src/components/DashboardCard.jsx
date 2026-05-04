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
  borderColor = "border-blue-500",
  iconColor = "text-blue-500",
}) {
  return (
    <div
      className={`bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 border-l-4 ${borderColor}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-xs mt-1">{description}</p>
        </div>
        {Icon && (
          <div className={`p-2 rounded-lg opacity-20`}>
            <Icon size={24} className={iconColor} />
          </div>
        )}
      </div>

      {stats && (
        <div className="mb-4 grid grid-cols-2 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-md">
              <p className="text-xs text-gray-600">{stat.label}</p>
              <p className="text-lg font-bold text-gray-800 mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {linkTo && (
        <Link
          to={linkTo}
          className="inline-block text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors mt-2"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
