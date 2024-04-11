import {computed, inject, Injectable, signal} from '@angular/core';
import {EMPTY, map, Observable, switchMap} from "rxjs";
import { UserApiService } from "../../../../core/api/user-api.service";
import {IUser} from "../../../../core/interfaces/user/User.interface";
import {tap} from "rxjs/operators";

interface State {
  users: IUser[],
  loading: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApi = inject(UserApiService);

  #state = signal<State>({
    users: [],
    loading: true,
  });

  users = computed(() => this.#state().users);
  loading = computed(() => this.#state().loading);

  constructor() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userApi.getAllUsers()
        .subscribe( {
          next: response => {
            this.#state.set({
              users: response.content,
              loading: false,
            });
          },
          error: (error) => {
            return error;
          },
        }
      );
  }

  getUserByToken() {
    return this.userApi.getUserByToken().pipe(
      map( user => user ),
    );
  }


}
