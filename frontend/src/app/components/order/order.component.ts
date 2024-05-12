import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth.service';
import { BulgarianDatePipe } from '../../pipes/bulgarian-date.pipe';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, BulgarianDatePipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss',
  providers: [HttpClient, CarService, AuthService],
})
export class OrderComponent {
  orders: any[] = [];
  error: string = '';
  currentUser: any = {};

  constructor(private http: HttpClient, private carService: CarService, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

    if(this.currentUser?.role?.name === 'Admin') {
      this.carService.getAllOrders().subscribe({
        next: (orders) => this.orders = orders,
        error: (err) => this.error = 'Грешка при зареждането на резервациите!'
      })
    }
    else {
      this.carService.getOrders(this.currentUser.id).subscribe({
        next: (orders) => this.orders = orders,
        error: (err) => this.error = 'Грешка при зареждането на резервациите!'
      })
    } 
  }

}
