// src/app/register/register.component.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
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

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error = '';
    this.success = '';
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (res) => {
        this.success = 'Успешно създаден профил!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirect to login after successful registration
      },
      error: (err) => {
        this.error = 'Грешка при регистрация! Моля, опитайте по-късно!';
      }
    });
  }
}
