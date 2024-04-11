import {ChangeDetectionStrategy, Component, Input, signal, ViewEncapsulation} from '@angular/core';
import {IUser} from "../../../../../core/interfaces/user/User.interface";
import {UserTable} from "../../../../interfaces/user-table.enum";
import {TitleCasePipe} from "@angular/common";
import {ModalAdminDeleteComponent} from "../modal-admin-delete/modal-admin-delete.component";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToggleButtonModule} from "primeng/togglebutton";

@Component({
  selector: 'users-table-admin-dashboard',
  standalone: true,
  imports: [
    TitleCasePipe,
    ModalAdminDeleteComponent,
    FormsModule,
  ],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UsersTableAdminDashboardComponent {

  @Input({ required: true }) users: IUser[] = [];
  user= signal<IUser | undefined>(undefined);

  date: Date | undefined;
  checked: boolean = false;

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
