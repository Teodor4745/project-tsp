import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/localstorage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  success: string = ''; 

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService, private authService: AuthService) {}

  login() {
    this.error = '';
    this.success = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        this.success = 'Успешен вход!';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      },
      error: (err) => {
        this.error = 'Грешка при вход!';
      }
    });
  }
}
