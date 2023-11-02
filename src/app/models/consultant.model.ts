export interface Consultant {
    consultant_id: number;
    first_name: string;
    last_name: string;
    email?: string;  // Optional since it can be null in the database
    phone?: string;  // Optional since it can be null in the database
  }