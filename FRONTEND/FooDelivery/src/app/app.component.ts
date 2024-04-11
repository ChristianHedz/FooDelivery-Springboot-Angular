import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PrimeNGConfig } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private primengConfig = inject(PrimeNGConfig);
  menuOption: string = '';

  onOption(menuOption: string) {
    this.menuOption = menuOption;
  }

  title = 'FooDelivery';
  constructor(private http: HttpClient) {
    this.primengConfig.ripple = true;
  }
}
