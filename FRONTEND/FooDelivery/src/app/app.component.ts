import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PrimeNGConfig } from "primeng/api";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private primengConfig = inject(PrimeNGConfig);

  title = 'FooDelivery';
  constructor(private http: HttpClient) {
    this.primengConfig.ripple = true;
  }
}
