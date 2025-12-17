import {HttpClient, HttpResponse} from '@angular/common/http';
import {AuthRequest, AuthResponse} from '../models/auth.api';
import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from '../../../../environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import {switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private platformId = inject(PLATFORM_ID);
  user = signal<AuthResponse | null>(null);
  isAuthenticated = computed(() => !!this.user());
  accessToken = signal<string | null>(
    isPlatformBrowser(this.platformId) ? localStorage.getItem('access_token') : null
  );
  constructor(private http: HttpClient) {
    console.log('accessToken', this.accessToken);
  }

  login(dto: AuthRequest) {
    return this.http.post(environment.apiUrl +'auth/login', dto, { withCredentials: true, responseType: 'text' })
      .subscribe({
        next: (token: string) => {
          console.log('login', token)
          this.setToken(token)
          this.me()
        },
        error: (err) => console.log('login', err),
      })
  }
  refresh() {
    return this.http.post(environment.apiUrl +'auth/refresh', {}, {
      withCredentials: true, responseType: 'text' })
      .pipe(
        tap((token: string) => {
          this.setToken(token)
          this.me()
        }),
      );
  }
  info() {
    return this.http.get<AuthResponse>(environment.apiUrl +'auth/info', { withCredentials: true })
  }
  me() {
    return this.http.get<AuthResponse>(environment.apiUrl +'auth/@me', { withCredentials: true })
      .subscribe({
        next: (user) => {
          this.saveUser(user)
        },
        error: (err) => console.log('login', err),
      })
  }
  logout() {
    return this.http.post(environment.apiUrl +'auth/logout', { withCredentials: true })
      .subscribe({
        next: (user) => {
          this.clearToken()
          this.clearUser()
        },
        error: (err) => console.log('logout', err),
      })
  }

  saveUser(user: AuthResponse) {
    this.user.set(user);
  }

  getToken(): string | null {
    return this.accessToken();
  }

  private setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.accessToken.set(token);
  }

  private clearToken() {
    localStorage.removeItem('access_token');
    this.accessToken.set(null);
  }

  private clearUser() {
    this.user.set(null);
  }
}
