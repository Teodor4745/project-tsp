import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post<any>('/api/users/register', { username: this.username, email: this.email, password: this.password })
      .pipe(
        catchError(err => {
          this.error = 'Error during registration';
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          this.router.navigate(['/login']); // Adjust as per your route
        }
      });
  }
}
