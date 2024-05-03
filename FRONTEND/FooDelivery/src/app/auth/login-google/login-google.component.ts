import { GoogleSigninButtonModule, SocialLoginModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-google',
  standalone: true,
  imports: [HttpClientModule, CommonModule,GoogleSigninButtonModule, SocialLoginModule],
  templateUrl: './login-google.component.html',
  styleUrl: './login-google.component.css'
})
export class LoginGoogleComponent implements OnInit{

  constructor(private socialAuthService: SocialAuthService, private authService: AuthService, private router: Router){
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe({
      next: (result) => {
        this.authService.googleLogin(result.idToken).subscribe((res) => {
          if (res.token) {
            Swal.fire('Bienvenido!', 'Has iniciado sesión correctamente', 'success');
            this.router.navigateByUrl('/home');
          }
        });
        console.log(result);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

}
