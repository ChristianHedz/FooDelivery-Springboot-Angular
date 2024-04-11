import {Component, inject, signal} from '@angular/core';
import {Location, TitleCasePipe} from "@angular/common";
import { UsersTableAdminDashboardComponent } from "../usuarios/components/users-table/users-table.component";

@Component({
  selector: 'productos-admin',
  standalone: true,
  imports: [
    TitleCasePipe,
    UsersTableAdminDashboardComponent
  ],
  templateUrl: './productos.component.html',
  styles: ``
})
export default class ProductosComponent {
  location = inject(Location);
  subtitle = signal('')

  constructor() {
    const currentUrl = this.location.path();
    const urls = currentUrl.split('/');
    const lastUrl = urls[urls.length - 1];
    this.subtitle.set(lastUrl);
  }
}
