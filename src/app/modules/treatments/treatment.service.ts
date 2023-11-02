import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private baseUrl = `${environment.apiUrl}/treatments`;
  constructor(private http: HttpClient) { }

  // Fetch all treatments
  getTreatments(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Fetch a specific treatment by ID
  getTreatmentById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new treatment
  createTreatment(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Update a treatment
  updateTreatment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete a treatment
  deleteTreatment(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
