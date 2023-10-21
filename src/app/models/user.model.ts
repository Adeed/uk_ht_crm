// src/app/models/user.model.ts

export interface User {
  userId: number;
  username: string;
  password: string;  // Note: Be cautious with handling passwords in the client-side.
  email: string;
  role: 'Admin' | 'Consultant' | 'Doctor';
}
