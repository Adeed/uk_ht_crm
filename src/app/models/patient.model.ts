export interface Patient {
  patient_id: number;
  treatments?: string;  // Add this line
  first_name: string;
  last_name: string;
  email?: string;  // Optional since it can be null in the database
  phone?: string;  // Optional since it can be null in the database
  consultantId?: number;  // Optional since it can be null in the database
  dob?: Date;  // Optional since it can be null (you can change this if it's mandatory)
  addressLine1: string;
  city: string;
  state: string;
  postcode: string;
  gpName: string;
  nhsNumber: string;
  ethnicity: 'White' | 'Asian' | 'Afro' | 'Hispanic or Latino' | 'Native American or Alaska Native' | 'Middle Eastern or North African' | 'Native Hawaiian or Other Pacific Islander' | 'Two or More Races' | 'Other';
}
