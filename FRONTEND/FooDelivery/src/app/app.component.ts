import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { PrimeNGConfig } from 'primeng/api';
import { CommonModule } from '@angular/common';
import {AuthService} from "./services/auth.service";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive, ConfirmDialogModule, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  authService = inject(AuthService);
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
