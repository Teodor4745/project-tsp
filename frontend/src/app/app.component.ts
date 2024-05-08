import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService],
})
export class AppComponent {
  title = 'frontend';
  currentUser: any = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      console.log('Current user:', this.currentUser);
    });
  }


  logout() {
    this.authService.logout();
  }
}
