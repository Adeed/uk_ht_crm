import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) { }

  // Payment Plan CRUD Operations
  getPaymentPlans(): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-plans`);
  }

  getPaymentPlanById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-plans/${id}`);
  }

  createPaymentPlan(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/plans`, data);
  }

  updatePaymentPlan(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/payment-plans/${id}`, data);
  }

  deletePaymentPlan(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/payment-plans/${id}`);
  }

  // Payment Record CRUD Operations
  getPaymentRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-records`);
  }

  getPaymentRecordById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-records/${id}`);
  }

  createPaymentRecord(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/payment-records`, data);
  }

  updatePaymentRecord(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/payment-records/${id}`, data);
  }

  deletePaymentRecord(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/payment-records/${id}`);
  }

  // Refund Record Operations (You can expand on these if necessary)
  getRefundRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}/refund-records`);
  }

  createRefundRecord(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/refund-records`, data);
  }

  // Other utility methods
  getRemainingBalance(paymentPlanId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-plans/${paymentPlanId}/balance`);
  }

  getPaymentStatus(paymentPlanId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment-plans/${paymentPlanId}/status`);
  }
}
