import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {IUser, IUsers, UserDTO, UserToUpdate} from "../../admin-dashboard/interfaces/user.interface";
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

  deleteUserByAdmin(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/users/${userId}`, { headers: this.authService.addTokenToHeaders() });
  }

  getUserByAdmin(userId: number): Observable<IUser> {
    return this.http.get<IUser>(`${this.url}/users/me/${ userId }`, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  createUserByAdmin(user: UserDTO): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/users`, user, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  updateUserByAdmin(user: UserToUpdate ): Observable<IUser> {
    const { id, ...body } = user;

    return this.http.put<IUser>(`${this.url}/users/me/${ user.id }`, body, {
      headers: this.authService.addTokenToHeaders()
    });
  }

}
