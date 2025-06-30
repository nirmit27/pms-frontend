import React from "react";

export default function Loader() {
  return (
    <div className="mt-12 inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <span className="text-gray-600 text-lg font-medium">Loading...</span>
      </div>
    </div>
  );
}
