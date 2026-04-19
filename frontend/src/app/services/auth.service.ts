import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, tap } from 'rxjs';

export interface User {
  id: number;
  username: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Global user state
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) { 
    this.checkAuth().subscribe();
  }

  login(credentials: any): Observable<any> {
    const mockUser = { id: 1, username: credentials.username || 'DemoUser', authenticated: true };
    return of(mockUser).pipe(
      delay(500),
      tap(user => {
        this.currentUser.set(user);
        localStorage.setItem('mock_user', JSON.stringify(user));
      })
    );
  }

  signup(credentials: any): Observable<any> {
    const mockUser = { id: 1, username: credentials.username || 'DemoUser', authenticated: true };
    return of(mockUser).pipe(
      delay(500),
      tap(user => {
        this.currentUser.set(user);
        localStorage.setItem('mock_user', JSON.stringify(user));
      })
    );
  }

  logout(): Observable<any> {
    return of({ success: true }).pipe(
      delay(200),
      tap(() => {
        this.currentUser.set(null);
        localStorage.removeItem('mock_user');
      })
    );
  }

  checkAuth(): Observable<User> {
    const savedUser = localStorage.getItem('mock_user');
    let user: User = { id: 0, username: '', authenticated: false };
    
    if (savedUser) {
      user = JSON.parse(savedUser);
      this.currentUser.set(user);
    } else {
      this.currentUser.set(null);
    }
    
    return of(user);
  }
}
