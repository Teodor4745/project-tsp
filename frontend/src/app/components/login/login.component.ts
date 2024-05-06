import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/localstorage.service';

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

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {}

  login() {
    this.error = ''; 
    this.success = '';
    this.http.post<any>('https://localhost:7165/api/User/login', { username: this.username, password: this.password }) // Ensure the URL is correct
      .pipe(
        catchError(err => {
          this.error = 'Username or password is incorrect';
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          this.localStorageService.setItem('user', JSON.stringify(res)); 
          this.success = 'Login successful!';
          setTimeout(() => {
            this.router.navigate(['/']); 
          }, 2000); 
        }
      });
  }
}
