import {
  FacebookLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginGoogleComponent } from '../login-google/login-google.component';
import {MessageService} from "primeng/api";
import {getFirstMessageOfError} from "../../shared/utils/messages-values";

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
  private messageService = inject(MessageService);

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
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
  () => {
          this.messageService.add({
            key: 'toast',
            severity: 'success',
            summary: 'Bienvenido',
            detail: "Inicio de sesión exitoso",
          });
        },
  ({ error }) => {
          console.error('Error en el inicio de sesión:', error);
          this.messageService.add({
            key: 'toast',
            severity: 'error',
            summary: '¡Error al iniciar sesión!',
            detail: !error ? "Ocurrio un problema al intentar iniciar sesión. " : getFirstMessageOfError(error.messages),
          });
        }
      );
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
