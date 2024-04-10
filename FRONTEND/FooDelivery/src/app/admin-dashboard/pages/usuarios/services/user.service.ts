import {computed, inject, Injectable, signal} from '@angular/core';
import {EMPTY, map, Observable, switchMap} from "rxjs";
import { UserApiService } from "../../../../core/api/user-api.service";
import {IUser} from "../../../../core/interfaces/user/User.interface";

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
    this.userApi.getAllUsers()
      .subscribe(response => {

        this.#state.set({
          users: response,
          loading: false,
        });

      });
  }

  getUserByToken() {
    return this.userApi.getUserByToken().pipe(
      map( user => user ),
    );
  }


}
