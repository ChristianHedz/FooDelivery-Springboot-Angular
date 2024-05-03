import {Injectable, signal} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, BehaviorSubject, of, map, switchMap, catchError} from 'rxjs';
import { User } from '../services/user';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { socialUser } from './socialUser';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://foodelivery-d2d7a5204308.herokuapp.com';
  private tokenKey = 'jwt_token';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getToken() !== null);
  public isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable();
  user = signal<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/auth`, { email, password }).pipe(
      tap(response => {
        console.log('Inicio de sesión exitoso');
        this.setToken(response.token);
        this.setUser(response);

        this.getUserProfile().subscribe(
          user => {
            console.log('Perfil del usuario:', user);
            this.user.set(user);
            if (user.role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          },
          error => {
            console.error('Error al obtener el perfil del usuario:', error);

            this.router.navigate(['/home']);
          }
        );
      })
    );
  }

  googleLogin(token: string):Observable<socialUser> {
    console.log('se recibio el token: ' + {token});
    return this.http.post<socialUser>(this.baseUrl + '/users/authGoogle',{token}).pipe(
      tap((userResp: socialUser) => {
        this.setToken(userResp.token);
        this.setUser(userResp);
        console.log({userResp});
      }),
    )
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem('user');
    this.isLoggedInSubject.next(false);
  }
  register(user: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users`, user);
  }

  setToken(token: string): void {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem(this.tokenKey, token);
      this.isLoggedInSubject.next(true);
    }
  }

  setUser(user: any): void {
    const storage = this.getStorage();
    if (storage) {
      storage.setItem('user', JSON.stringify(user));
      this.isLoggedInSubject.next(true);
    }
  }

  getToken(): string | null {
    const storage = this.getStorage();
    if (storage) {
      return storage.getItem(this.tokenKey);
    }
    return null;
  }

  removeToken(): void {
    const storage = this.getStorage();
    if (storage) {
      storage.removeItem(this.tokenKey);
      storage.removeItem('user');
      this.isLoggedInSubject.next(false);
    }
  }

  addTokenToHeaders(): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();
    }
  }

  getUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/me`, { headers: this.addTokenToHeaders() });
  }

  updateUserProfile(user: User): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/users`, user, { headers: this.addTokenToHeaders() });
  }


  getUserOrders(): Observable<Order[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<Order[]>(`${this.baseUrl}/orders/user`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener las órdenes del usuario:', error);
        throw error;
      })
    );
  }


  private getStorage(): Storage | null {
    if (typeof window !== 'undefined') {
      return sessionStorage;
    } else {
      return null;
    }
  }

  isAdminAuthenticated() {
    const storage = this.getStorage();

    if (storage) {
      return this.getUserProfile().pipe(
        map(user => user && user.role === 'ADMIN'),
        switchMap(isAdmin => of(storage.getItem(this.tokenKey) !== null && isAdmin)),
        catchError(error => {
          return of(false);
        })

      );
    }

    return of(false);

  }

  isAnyUserAuthenticated() {
    const storage = this.getStorage();

    if (storage) {
      return this.getUserProfile().pipe(
        map(user => user && (user.role === 'ADMIN' || user.role === 'CUSTOMER' || user.role === 'DELIVERY')),
        switchMap(isAnyUser => of(storage.getItem(this.tokenKey) !== null && isAnyUser)),
        catchError(error => {
          return of(false);
        })

      );
    }

    return of(false);

  }
}
