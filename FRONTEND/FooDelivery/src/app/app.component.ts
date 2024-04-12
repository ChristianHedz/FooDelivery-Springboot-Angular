import { Component, inject,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd } from '@angular/router'; // Importar Router y NavigationEnd
import { HttpClient } from '@angular/common/http';
import { PrimeNGConfig } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  menuOption: string = '';
  showNavbarAndFooter: boolean = true;
  userLoginOn: boolean = false;
  title = 'FooDelivery';


  constructor(private router: Router, private http: HttpClient, private primengConfig: PrimeNGConfig,private authService: AuthService) {
    this.primengConfig.ripple = true;

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/login' || event.url === '/register') {
          this.showNavbarAndFooter = true;
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

