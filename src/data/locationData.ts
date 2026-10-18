export const stateOptions = [
  { value: "andhra-pradesh", label: "Andhra Pradesh" },
  { value: "telangana", label: "Telangana" },
  { value: "others", label: "Other" },
];

export const districtOptions: Record<string, string[]> = {
  "andhra-pradesh": [
    "Kurnool", "Guntur", "Krishna", "Prakasam", "Nellore", "Anantapur",
    "Visakhapatnam", "Vijayawada", "Rajahmundry", "Ongole", "Tirupati",
    "Kakinada", "Machilipatnam", "Bapatla", "Narasaraopet", "Tenali",
  ],
  "telangana": [
    "Hyderabad", "Warangal", "Karimnagar", "Nizamabad", "Khammam",
    "Nalgonda", "Ranga Reddy", "Medak", "Adilabad", "Mahbubnagar",
  ],
  "others": ["Select district..."],
};
