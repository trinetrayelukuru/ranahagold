export interface CareerApplication {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  state: string;
  district: string;
  qualification: string;
  degree: string;
  specialisation: string;
  college: string;
  graduationYear: string;
  submittedAt: string;
}

export const STEPS = [
  "State",
  "District",
  "Details",
  "Education",
  "Review",
  "Submit",
] as const;
