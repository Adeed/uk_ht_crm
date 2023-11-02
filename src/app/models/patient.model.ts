export interface Patient {
  patient_id: number;
  first_name: string;
  last_name: string;
  email?: string;  // Optional since it can be null in the database
  phone?: string;  // Optional since it can be null in the database
  consultantId?: number;  // Optional since it can be null in the database
  treatmentId?: number;  // Optional since it can be null in the database
  dob?: Date;  // Optional since it can be null (you can change this if it's mandatory)
  addressLine1: string;
  city: string;
  state: string;
  postcode: string;
  gpName: string;
  nhsNumber: string;
}
