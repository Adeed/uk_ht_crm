export enum AppointmentStatus {
  Scheduled = 'Scheduled',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export interface Appointment {
  appointmentId: number;
  patientId: number;
  consultantId?: number;  // Optional since it can be null
  doctorId?: number;  // Optional since it can be null
  treatmentId?: number;  // Optional since it can be null
  appointmentDate: string;  // ISO 8601 string
  appointmentStatus: AppointmentStatus;
}
