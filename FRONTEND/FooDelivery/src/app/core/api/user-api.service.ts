import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {IUser, IUsers} from "../interfaces/user/User.interface";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private http = inject(HttpClient);
  private url = environments.baseUrl;
  private authService = inject(AuthService);

  getUserByToken(): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/users/me`, { headers: this.authService.addTokenToHeaders() });
  }

  getAllUsers(): Observable<IUsers> {
    return this.http.get<IUsers>(`${this.url}/users`, { headers: this.authService.addTokenToHeaders() });
  }

}
