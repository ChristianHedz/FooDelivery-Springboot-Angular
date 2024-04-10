import {Component, inject, signal} from '@angular/core';
import {Location, TitleCasePipe} from "@angular/common";
import { TableAdminDashboardComponent } from "../../components/table/table.component";

@Component({
  selector: 'productos-admin',
  standalone: true,
  imports: [
    TitleCasePipe,
    TableAdminDashboardComponent
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
