export interface Doctor {
    doctorId: number;
    firstName: string;
    lastName: string;
    email?: string;  // Optional since it can be null in the database
    phone?: string;  // Optional since it can be null in the database
  }