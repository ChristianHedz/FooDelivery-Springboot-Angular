import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private http: HttpClient, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    if (this.loginForm.valid) {
      console.log('Formulario válido, enviando datos...');
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password)
        .pipe(
          tap(response => {
            console.log('Inicio de sesión exitoso');
            this.authService.setToken(response.token);
            this.router.navigate(['/home']); 
          })
        )
        .subscribe(
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
