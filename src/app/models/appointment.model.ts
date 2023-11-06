export interface Appointment {
  appointment_id?: number;
  patient_id: number;
  consultant_id?: number;
  doctor_id?: number;
  patient_treatment_id: number;  // This replaces treatment_id
  appointment_date: string;  // ISO 8601 string representing date only (e.g., "2023-10-25")
  appointment_time: string;  // ISO 8601 string representing time only (e.g., "14:30:00")
  appointment_status: 'Scheduled' | 'Completed' | 'Cancelled';
  appointment_notes?: string;  // Field for notes
}
