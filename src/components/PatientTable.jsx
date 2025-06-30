import React from "react";

export default function PatientTable({ data }) {
  if (!data.length)
    return (
      <div className="py-8 text-center text-gray-500 text-lg">
        No patient records found.
      </div>
    );

  const keys = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto rounded-md shadow border border-gray-200 bg-white">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-blue-50">
            {keys.map((key) => (
              <th
                key={key}
                className="px-4 py-3 border-b font-semibold text-gray-700 uppercase tracking-wider text-sm"
              >
                {key.replace(/_/g, " ")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className={`transition hover:bg-blue-50 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              {keys.map((key) => (
                <td key={key} className="px-4 py-2 border-b text-gray-700">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
