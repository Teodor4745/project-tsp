import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('/api/users/login', { username: this.username, password: this.password })
      .pipe(
        catchError(err => {
          this.error = 'Username or password is incorrect';
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/home']); 
        }
      });
  }
}
