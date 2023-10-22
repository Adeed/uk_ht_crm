// src/app/services/consultant.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Consultant } from '../models/consultant.model';
import { SearchQuery } from '../models/search-query.model';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {
  private apiUrl = `${environment.apiUrl}/consultants`;

  constructor(private http: HttpClient) { }

  searchConsultants(searchQuery: SearchQuery): Observable<Consultant[]> {
    let params = new HttpParams();
    if (searchQuery.searchTerm) {
      params = params.append('q', searchQuery.searchTerm);
    }
    if (searchQuery.type) {
      params = params.append('type', searchQuery.type);
    }

    return this.http.get<Consultant[]>(`${this.apiUrl}/search`, { params }).pipe(
      catchError(this.handleError)
    );
  }
  
  getConsultants(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(`${this.apiUrl}`).pipe(
      catchError(this.handleError)
    );
  }

  getConsultant(id: string): Observable<Consultant> {
    return this.http.get<Consultant>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createConsultant(consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(`${this.apiUrl}`, consultant).pipe(
      catchError(this.handleError)
    );
  }

  updateConsultant(consultant: Consultant): Observable<any> {
    return this.http.put(`${this.apiUrl}/${consultant.consultantId}`, consultant).pipe(
      catchError(this.handleError)
    );
  }

  deleteConsultant(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(error.message || 'Something bad happened; please try again later.');
  }
}
