import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Patient } from '../../models/patient.model';
import { PatientTreatment } from '../..//models/patient_treatment.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = `${environment.apiUrl}/patients`;

  constructor(private http: HttpClient) { }

  // Fetch all patients
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this.baseUrl);
  }

  // Fetch a specific patient by ID
  getPatientById(id: number): Observable<Patient> {
    return this.http.get<Patient>(`${this.baseUrl}/${id}`);
  }

  // Create a new patient
  createPatient(data: Patient): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Update a patient
  updatePatient(id: number, data: Patient): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete a patient
  deletePatient(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  private treatmentsBaseUrl = `${environment.apiUrl}/patient-treatments`;

  getAllPatientTreatments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.treatmentsBaseUrl}/all-patient-treatments`);
  }

  getTreatmentsForPatient(patient_id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.treatmentsBaseUrl}/${patient_id}`);
  }

  addTreatmentForPatient(treatmentData: any): Observable<any> {
    return this.http.post<any>(this.treatmentsBaseUrl, treatmentData);
  }

  updateTreatment(patient_treatment_id: number, treatmentData: any): Observable<any> {
    return this.http.put(`${this.treatmentsBaseUrl}/${patient_treatment_id}`, treatmentData);
  }

  deleteTreatment(patient_treatment_id: number): Observable<any> {
    return this.http.delete(`${this.treatmentsBaseUrl}/${patient_treatment_id}`);
  }

}
