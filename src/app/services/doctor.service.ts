// src/app/services/doctor.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Doctor } from '../models/doctor.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = `${environment.apiUrl}/doctors`;

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getDoctor(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createDoctor(doctor: Doctor): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}`, doctor).pipe(
      catchError(this.handleError)
    );
  }

  updateDoctor(doctor: Doctor): Observable<any> {
    return this.http.put(`${this.apiUrl}/${doctor.doctorId}`, doctor).pipe(
      catchError(this.handleError)
    );
  }

  deleteDoctor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Something bad happened; please try again later.');
  }
}
