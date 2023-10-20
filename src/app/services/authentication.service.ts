import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Credentials } from '../interfaces/credentials.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  getCurrentUser() {
    // Your logic to get the current user
  }
  
  login(credentials: Credentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(credentials: Credentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, credentials);
  }
}