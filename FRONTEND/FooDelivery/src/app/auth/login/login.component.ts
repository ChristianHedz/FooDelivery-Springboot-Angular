import {
  GoogleSigninButtonModule,SocialAuthService,SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule,GoogleSigninButtonModule, SocialLoginModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  name!: string;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private socialAuthService: SocialAuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe({
      next: (result) => {
        this.name = result.name;
        this.authService.googleLogin(result.idToken).subscribe((res) => {
          if (res.token) {
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

  login(): void {
    if (this.loginForm.valid) {
      console.log('Formulario válido, enviando datos...');
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        () => {},
        error => {
          console.error('Error en el inicio de sesión:', error);
        }
      );
    } else {
      console.log('Formulario inválido, no se puede enviar.');
    }
  }
}
