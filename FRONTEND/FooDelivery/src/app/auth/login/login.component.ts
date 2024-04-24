import {
  FacebookLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginGoogleComponent } from '../login-google/login-google.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    LoginGoogleComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      Swal.fire('Bienvenido!', 'Has iniciado sesión correctamente', 'success');
      console.log('Formulario válido, enviando datos...');
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        () => {},
        (error) => {
          console.error('Error en el inicio de sesión:', error);
        }
      );
    } else {
      console.log('Formulario inválido, no se puede enviar.');
    }
  }

  facebookLogin(): void {
    this.socialAuthService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((data) => {
        console.log('inicio');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
