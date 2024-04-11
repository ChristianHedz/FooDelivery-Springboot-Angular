import {Component, Input, signal, WritableSignal} from '@angular/core';
import {IUser} from "../../../../../core/interfaces/user/User.interface";
import {UserTable} from "../../../../interfaces/user-table.enum";
import {TitleCasePipe} from "@angular/common";
import {ModalAdminDeleteComponent} from "../modal-admin-delete/modal-admin-delete.component";

@Component({
  selector: 'users-table-admin-dashboard',
  standalone: true,
  imports: [
    TitleCasePipe,
    ModalAdminDeleteComponent
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
})
export class UsersTableAdminDashboardComponent {

  @Input({ required: true }) users: IUser[] = [];
  user= signal<IUser | undefined>(undefined);

  thTable: string[] = [
    UserTable.ID,
    UserTable.NOMBRE,
    UserTable.CORREO,
    UserTable.TELEFONO,
    UserTable.ROLE,
    'Acciones'
  ];

  onClickDelete(user: IUser) {
    this.user.set(user);
  }

  closeModal() {
    console.log('Cerrando modal');
  }

}
