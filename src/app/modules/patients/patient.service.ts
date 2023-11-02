import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Patient } from '../../models/patient.model';

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
  
}
