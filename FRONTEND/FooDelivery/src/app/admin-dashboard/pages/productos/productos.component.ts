import {Component, inject, signal} from '@angular/core';
import {Location, TitleCasePipe} from "@angular/common";

@Component({
  selector: 'productos-admin',
  standalone: true,
  imports: [
    TitleCasePipe,
  ],
  templateUrl: './productos.component.html',
  styleUrl: `./productos.component.css`
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
