// src/app/services/treatment.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Treatment } from '../models/treatment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private apiUrl = `${environment.apiUrl}/treatments`;

  constructor(private http: HttpClient) { }

  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getTreatment(id: string): Observable<Treatment> {
    return this.http.get<Treatment>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createTreatment(treatment: Treatment): Observable<Treatment> {
    return this.http.post<Treatment>(`${this.apiUrl}`, treatment).pipe(
      catchError(this.handleError)
    );
  }

  updateTreatment(treatment: Treatment): Observable<any> {
    return this.http.put(`${this.apiUrl}/${treatment.treatmentId}`, treatment).pipe(
      catchError(this.handleError)
    );
  }

  deleteTreatment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Something bad happened; please try again later.');
  }
}
