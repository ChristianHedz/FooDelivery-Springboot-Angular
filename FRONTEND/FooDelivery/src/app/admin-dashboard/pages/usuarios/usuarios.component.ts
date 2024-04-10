import {Component, inject, OnInit, signal} from '@angular/core';
import {TableAdminDashboardComponent} from "../../components/table/table.component";
import {JsonPipe, TitleCasePipe} from "@angular/common";
import {UserService} from "./services/user.service";
import {IUser} from "../../../core/interfaces/user/User.interface";
import {Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    TableAdminDashboardComponent,
    TitleCasePipe,
    JsonPipe
  ],
  templateUrl: './usuarios.component.html',
  styles: ``
})
export default class UsuariosComponent implements OnInit {
  userService = inject(UserService);
  private router = inject(Router);

  subtitle = signal('Usuarios');
  user = signal<IUser | null>(null);

  ngOnInit(): void {
    this.userService
      .getUserByToken()
      .pipe( tap(console.log) )
      .subscribe({
        next: user => this.user.set(user),
        error: (error) => console.error('Error al obtener el usuario', error),
      })
  }


}
