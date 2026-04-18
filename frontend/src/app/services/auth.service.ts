import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {
  id: number;
  username: string;
  authenticated: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = '/api/login/';
  private logoutUrl = '/api/logout/';
  private signupUrl = '/api/signup/';
  private userUrl = '/api/user/';

  // Global user state
  currentUser = signal<User | null>(null);

  constructor(private http: HttpClient) { 
    this.checkAuth().subscribe();
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(user => {
        this.currentUser.set({ ...user, authenticated: true });
      })
    );
  }

  signup(credentials: any): Observable<any> {
    return this.http.post<any>(this.signupUrl, credentials).pipe(
      tap(user => {
        this.currentUser.set({ ...user, authenticated: true });
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.logoutUrl, {}).pipe(
      tap(() => {
        this.currentUser.set(null);
      })
    );
  }

  checkAuth(): Observable<User> {
    return this.http.get<User>(this.userUrl).pipe(
      tap(user => {
        if (user.authenticated) {
          this.currentUser.set(user);
        } else {
          this.currentUser.set(null);
        }
      })
    );
  }
}
