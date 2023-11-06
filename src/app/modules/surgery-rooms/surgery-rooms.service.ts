import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurgeryRoomsService {

  private baseUrl = `${environment.apiUrl}/surgery-rooms`;

  constructor(private http: HttpClient) { }

  private handleError(error: any) {
    console.error('An error occurred:', error); // Log the error to the console
    return throwError(error); // Re-throw the error to any subscribing components or services
  }

  // Get all surgery rooms
  getSurgeryRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Add a new surgery room
  addNewRoom(roomName: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { room_name: roomName }).pipe(
      catchError(this.handleError)
    );
  }

  // Update a surgery room by its ID
  updateRoom(roomId: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${roomId}`, data).pipe(
      catchError(this.handleError)
    );
  }

  updateRoomAvailability(roomId: number, newState: boolean): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${roomId}`, { is_available: newState }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a surgery room by its ID
  deleteRoom(roomId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${roomId}`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch blocked dates for a specific surgery room
  getBlockedDatesForRoom(roomId: number): Observable<Date[]> {
    return this.http.get<Date[]>(`${this.baseUrl}/${roomId}/blocked-dates`).pipe(
      catchError(this.handleError)
    );
  }

  // Block a room for specific dates
  blockRoomForDates(roomId: number, dates: Date[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${roomId}/block`, { dates }).pipe(
      catchError(this.handleError)
    );
  }

  // Unblock a room for a specific date
  unblockRoomForDate(roomId: number, date: Date): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${roomId}/unblock/${date.toISOString().split('T')[0]}`).pipe(
      catchError(this.handleError)
    );
  }

}

