export interface PersonalInfo {
  fullName: string;
  icNumber: string;
  email: string;
  phoneNumber: string;
  age: number;
  gender: string;
  location: string;
}

export interface EligibilityInfo {
  spmStatus: string;
  fullTimeTraining: boolean;
  industrialTraining: boolean;
  workCommitment: boolean;
}

export interface DocumentInfo {
  icFile: File | null;
  resumeFile: File | null;
  supportingFile: File | null;
}

export interface RegistrationData {
  personalInfo: PersonalInfo;
  eligibilityInfo: EligibilityInfo;
  documentInfo: DocumentInfo;
  declaration: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}