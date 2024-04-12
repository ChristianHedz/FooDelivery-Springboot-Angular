import {inject, Injectable, signal} from '@angular/core';
import {catchError, EMPTY, map, Observable, switchMap, throwError} from "rxjs";
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

  confirmDeleteUser(id: number) {

    return this.confirmationService.confirm({
      target: document.body,
      message: '¿Estas seguro de que quieres eliminar este usuario?',
      header: 'Eliminar usuario',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'pi pi-trash',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => this.deleteUser(id).subscribe({
        next: (response) => {

          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Usuario eliminado!',
            detail: "El usuario fue eliminado exitosamente.",
          });

        },
        error: (error) => {
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: 'Error al eliminar usuario',
            detail: error,
          });
        },
      }),
    });
  }

  private deleteUser(userId: number) {
    return this.userApi.deleteUserByAdmin(userId).pipe(
      tap(() => {
        this.users.update(( usersArr ) =>
          usersArr.filter((user) => user.id !== userId)
        );
      }),
      tap((_) => {
        setTimeout(() => {
          this.router.navigate(['/admin/dashboard/usuarios'])
        }, 1200);
      }),
      catchError(({ error }) => {
        console.log('Error al eliminar ususario: ', error);
        return throwError( () => "Error al eliminar al usuario");
      })
    );
  };

  getUserByAdmin(id: number): Observable<IUser> {
    return this.userApi
      .getUserByAdmin(id)
      .pipe(map((response) => response));
  }

  createUserByAdmin( user: UserDTO) {
    return this.userApi.createUserByAdmin(user).pipe(
      tap((response) => this.showMessage("Usuario creado exitosamente")),
      tap((_) => this.router.navigate(['/admin/dashboard/usuarios'])),
      catchError(({ error }) => {
        console.log('Error al crear usuario: ', error);
        return throwError( () => "Error al crear al usuario");
      })
    );
  }

  updateUserByAdmin( user: UserDTO) {
    return this.userApi.updateUserByAdmin(user).pipe(
      tap((response) => this.showMessage("Usuario actualizado exitosamente")),
      catchError(({ error }) => {
        console.log('Error al actualizar usuario: ', error);
        return throwError( () => "Error al actualizar el usuario");
      })
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

}
