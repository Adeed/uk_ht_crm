export interface PatientTreatment {
    patient_treatment_id: number;
    patient_id: number;
    treatment_name: string;
    no_of_grafts: number;
    area_of_transplant: string;  // This is now a VARCHAR
    sessions_agreed: number;
    final_cost: number;
}
