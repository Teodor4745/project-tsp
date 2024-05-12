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
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  phone: string = '';
  error: string = '';
  success: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error = '';
    this.success = '';
    this.authService.register(this.firstname, this.lastname, this.username, this.email, this.phone, this.password).subscribe({
      next: (res) => {
        this.success = 'Успешно създаден профил!';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); 
      },
      error: (err) => {
        this.error = 'Грешка при регистрация!';
      }
    });
  }
}
