import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
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
  providers: [AuthService, Router],
})
export class AppComponent {
  title = 'frontend';
  currentUser: any = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }


  logout() {
    if(confirm('Сигурни ли сте, че искате да излезете от вашия профил?')) {
      this.authService.logout();
    }

    this.router.navigateByUrl('/');
  }
}
