export interface Payment {
    paymentId: number;
    patientId: number;
    amountPaid: number;  // Since decimal(10,2) is a fixed-point data type, we use number in TypeScript
    paymentDate: Date;   // Timestamp type in the database maps to Date in TypeScript
    paymentStatus: 'Pending' | 'Completed';
    paymentMethod: 'Cash' | 'Card' | 'Bank Transfer' | 'Credit';
    cardType?: string;   // Optional since it can be null in the database
    cardLastFour?: string;  // Optional since it can be null in the database
  }
  