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
  success: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.error = '';
    this.success = '';
    this.http.post<any>('https://localhost:7165/api/User/register', {
      username: this.username,
      email: this.email,
      password: this.password
    })
      .pipe(
        catchError(err => {
          console.error(err);
          this.error = 'Грешка при регистрация! Моля, опитайте по-късно!';
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (res) => {
          this.success = 'Успешно създаден профил!';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); 
        }
      });
  }
}
