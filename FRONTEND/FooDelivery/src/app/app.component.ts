import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router'; // Importar Router y NavigationEnd
import { PrimeNGConfig } from 'primeng/api';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToastModule } from "primeng/toast";
import { AuthService } from "./services/auth.service";
import { User } from './services/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    RouterLink,
    RouterLinkActive,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  authService = inject(AuthService);
  private primengConfig = inject(PrimeNGConfig);
  menuOption: string = '';
  showNavbarAndFooter: boolean = true;
  userLoginOn: boolean = false;
  title = 'FooDelivery';
  user: User | undefined;

  constructor(private router: Router, private http: HttpClient) {
    this.primengConfig.ripple = true;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/register') {
          this.showNavbarAndFooter = false;
        } else {
          this.authService.isAdminAuthenticated().subscribe((isAdmin) => {
            this.showNavbarAndFooter = !isAdmin;
          });
        }
      }
    });

    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.userLoginOn = isLoggedIn;
    });
  }
  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      },
    });
  }

  onOption(menuOption: string) {
    this.menuOption = menuOption;
  }
  logout() {
    this.authService.logout();
  }
}
