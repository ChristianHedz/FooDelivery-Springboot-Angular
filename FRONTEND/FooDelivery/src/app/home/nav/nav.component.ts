import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';


import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  animations: [
    trigger('isLoggedInTrigger', [
  /*     state('true', style({ opacity: 1 })),
      state('false', style({ opacity: 0 })),
      transition('true => false', animate('300ms')),
      transition('false => true', animate('300ms')), */
    ])
  ]
})

export class NavComponent implements OnInit, OnDestroy {
  userLoginOn: boolean = false;
  private isLoggedInSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedInSubscription = this.authService.isLoggedIn.subscribe(isLoggedIn => {
      this.userLoginOn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/home']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
