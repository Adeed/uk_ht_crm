import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  private baseUrl = `${environment.apiUrl}/consultants`; 
  constructor(private http: HttpClient) { }

  // Fetch all consultants
  getConsultants(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Fetch a specific consultants by ID
  getConsultantById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new consultants
  createConsultant(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Update a consultants
  updateConsultant(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete a consultants
  deleteConsultant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
