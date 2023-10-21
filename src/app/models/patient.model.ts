export interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  email?: string;  // Optional since it can be null in the database
  phone?: string;  // Optional since it can be null in the database
  consultantId?: number;  // Optional since it can be null in the database
  treatmentId?: number;  // Optional since it can be null in the database
}