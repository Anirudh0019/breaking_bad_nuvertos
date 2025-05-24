import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/compound.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apiService: ApiService) {
    // Check if user is already logged in
    this.initializeAuth();
  }

  private initializeAuth(): void {
    try {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
      console.log(userString);
      
      if (token && userString && userString !== 'undefined' && userString !== 'null') {
        const user = JSON.parse(userString);
        // Validate that the parsed user object is actually valid
        if (user && typeof user === 'object' && user.id) {
          this.currentUserSubject.next(user);
        } else {
          // Clear invalid data
          this.clearAuthData();
        }
      } else if (userString === 'undefined' || userString === 'null') {
        // Clear corrupted data
        this.clearAuthData();
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Clear corrupted data
      this.clearAuthData();
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/login', credentials).pipe(
      tap(response => {
        if (response && response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.apiService.post<AuthResponse>('/auth/register', userData).pipe(
      tap(response => {
        if (response && response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      })
    );
  }

  logout(): void {
    this.clearAuthData();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    const user = this.currentUserSubject.value;
    return !!(token && user);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}