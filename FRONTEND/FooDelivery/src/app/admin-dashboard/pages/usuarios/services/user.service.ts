import {inject, Injectable, signal} from '@angular/core';
import {EMPTY, map, Observable, switchMap} from "rxjs";
import { UserApiService } from "../../../../core/api/user-api.service";
import {IUser, UserDTO} from "../../../../core/interfaces/user/User.interface";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";

interface State {
  users: IUser[],
  loading: boolean,
}

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private userApi = inject(UserApiService);
  private router = inject(Router);
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);

  users = signal<IUser[]>([]);

  constructor() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userApi.getAllUsers()
        .subscribe( {
          next: response => {
            this.users.set(response.content);
            /*this.#state.set({
              users: response.content,
              loading: false,
            });*/
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

  getUserFromStorage() {
    const storage = this.getStorage();

    if (storage) {
      const user = storage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  }

  private getStorage(): Storage | null {
    if (typeof window !== 'undefined') {
      return sessionStorage;
    } else {
      return null;
    }
  }

  confirmDeleteUser(id: number): void {
    console.log('confirmDeleteUser', id);
    this.confirmationService.confirm({
      target: document.body,
      message: '¿Estas seguro de que quieres eliminar este usuario?',
      header: 'Eliminar usuario',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deleteUser(id).subscribe(),
    });
  }

  private deleteUser(userId: number): Observable<void> {
    return this.userApi.deleteUserByAdmin(userId).pipe(
      tap((response) => {
        this.users.update(( usersArr ) =>
          usersArr.filter((user) => user.id !== userId) //TODO: && user.active = true
        );
        // this.showMessage(response.message);
      }),
      tap((_) => this.router.navigate(['/admin/dashboard/sorteos'])),
      switchMap(() => EMPTY)
    );
  };

  getUserByAdmin(id: number): Observable<IUser> {
    return this.userApi
      .getUserByAdmin(id)
      .pipe(map((response) => response));
  }

  createUserByAdmin( user: UserDTO): Observable<void> {
    return this.userApi.createUserByAdmin(user).pipe(
      tap((response) => this.showMessage("Usuario creado exitosamente")),
      tap((_) => this.router.navigate(['/admin/dashboard/usuarios'])),
      switchMap(() => EMPTY)
    );
  }

  updateUserByAdmin( user: UserDTO): Observable<void> {
    return this.userApi.updateUserByAdmin(user).pipe(
      tap((response) => this.showMessage("Usuario actualizado exitosamente")),
      switchMap(() => EMPTY)
    );
  }

  showMessage(message: string): void {
    this.messageService.add({
      key: 'toast',
      severity: 'success',
      summary: 'Listo!',
      detail: message,
    });
  }


  confirm1() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this.messageService.add({severity: 'info', summary: 'Confirmed', detail: 'You have accepted'});
      },
      reject: () => {
        this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000});
      }
    });
  }

}
