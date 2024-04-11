import {Component, EventEmitter, Input, Output} from '@angular/core';
import { IUser } from "../../../../../core/interfaces/user/User.interface";

@Component({
  selector: 'app-modal-admin-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-admin-delete.component.html',
  styleUrl: './modal-admin-delete.component.css'
})
export class ModalAdminDeleteComponent {

  @Input({ required: true }) user: IUser | undefined = undefined;
  @Output() deleteCompleted = new EventEmitter<void>();

  onDelete() {

    console.log(`Eliminando usuario ${this.user?.id} - ${this.user?.fullName}`);

    setTimeout(() => {
      console.log('Usuario eliminado');
    }, 5000);
    this.deleteCompleted.emit();
  }

}
