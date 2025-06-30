/* Helper functions */

export function getBMIColor(verdict) {
  switch (verdict) {
    case "Underweight":
      return "bg-blue-100 text-blue-800";
    case "Normal Weight":
      return "bg-green-100 text-green-800";
    case "Overweight":
      return "bg-yellow-100 text-yellow-800";
    case "Obese":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

export function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
