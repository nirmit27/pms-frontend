/* Constants - in use across components */

export const fields = [
  { key: "age", label: "Age", type: "number" },
  {
    key: "gender",
    label: "Gender",
    type: "select",
    options: ["male", "female", "others"],
  },
  { key: "city", label: "City", type: "text" },
  { key: "height", label: "Height (m)", type: "number", step: "0.01" },
  { key: "weight", label: "Weight (kg)", type: "number", step: "0.1" },
  { key: "bmi", label: "BMI", type: "number", step: "0.01" },
];
