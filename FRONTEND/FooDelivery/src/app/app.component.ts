import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router'; // Importar Router y NavigationEnd
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
  showNavbarAndFooter: boolean = true;
  userLoginOn: boolean = false;
  title = 'FooDelivery';

  constructor(private router: Router, private http: HttpClient ) {
    this.primengConfig.ripple = true;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/register') {
          this.showNavbarAndFooter = false;
        } else {
          this.authService.isAdminAuthenticated().subscribe(isAdmin => {
            this.showNavbarAndFooter = !isAdmin;
          });
        }
      }
    });

    this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.userLoginOn = isLoggedIn;});
  }

    onOption(menuOption: string) {
      this.menuOption = menuOption;
    }
    logout() {
      this.authService.logout();
    }
  }
