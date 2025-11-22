import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of, throwError, delay } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Default admin credentials (in a real app, this would be more secure)
  private readonly ADMIN_USERNAME = 'admin';
  private readonly ADMIN_PASSWORD = 'admin123';

  constructor() {
    this.loadStoredUser();
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Simulate API delay
    return new Observable(observer => {
      setTimeout(() => {
        if (credentials.username === this.ADMIN_USERNAME && credentials.password === this.ADMIN_PASSWORD) {
          const response: LoginResponse = {
            token: 'local-token-' + Date.now(),
            username: credentials.username,
            fullName: 'Administrator',
            email: 'admin@voiceofchrist.org.za'
          };
          
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem('user', JSON.stringify(response));
          this.currentUserSubject.next(response);
          
          observer.next(response);
          observer.complete();
        } else {
          observer.error({ error: { message: 'Invalid username or password' } });
        }
      }, 500);
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private loadStoredUser(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        this.currentUserSubject.next(user);
      } catch (e) {
        this.logout();
      }
    }
  }
}
