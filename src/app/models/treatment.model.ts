export interface Treatment {
    treatmentId: number;
    treatmentName: string;
    description?: string;  // Optional since it can be null in the database
    cost: number;  // Since decimal(10,2) is a fixed-point data type, we use number in TypeScript
  }
  