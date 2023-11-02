import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseUrl = `${environment.apiUrl}/doctors`; 
  constructor(private http: HttpClient) { }

  // Fetch all doctors
  getDoctors(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  // Fetch a specific doctor by ID
  getDoctorById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  // Create a new doctor
  createDoctor(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }

  // Update a doctor
  updateDoctor(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  // Delete a doctor
  deleteDoctor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

}
