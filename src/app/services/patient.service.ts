// src/app/services/patient.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PatientService {
  private apiUrl = `${environment.apiUrl}/patients`;
  
  constructor(private http: HttpClient) { }

  searchPatients(term: string): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}/search`, {
      params: new HttpParams().set('term', term)
    });
  }
  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.apiUrl}`);
  }

  getPatient(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.apiUrl}/${id}`);
  }

  createPatient(patient: Patient): Observable<Patient> {
    return this.http.post<Patient>(`${this.apiUrl}`, patient);
  }

  updatePatient(patient: Patient): Observable<any> {
    return this.http.put(`${this.apiUrl}/patients/${patient.id}`, patient);
  }  

  deletePatient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
