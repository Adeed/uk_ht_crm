import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  getSurgeryRooms(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Fetch blocked dates for a room
  getBlockedDatesForRoom(roomId: number): Observable<Date[]> {
    return this.http.get<Date[]>(`${this.baseUrl}/${roomId}/blocked-dates`).pipe(
      catchError(this.handleError)
    );
}

  // Block a room for specific dates
  blockRoomForDates(roomId: number, dates: Date[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${roomId}/block`, { dates });
  }

  // Unblock a room for a specific date
  unblockRoomForDate(roomId: number, date: Date): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${roomId}/unblock/${date}`);
  }
}
