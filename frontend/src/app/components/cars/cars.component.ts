// src/app/cars/cars.component.ts
import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  imports:[HttpClientModule, CommonModule] ,
  standalone: true,
  providers: [CarService],
})
export class CarsComponent implements OnInit {
  cars: any[] = [];
  error: string = '';

  constructor(private carService: CarService) {}

  ngOnInit() {
    this.carService.getCars().subscribe({
      next: (cars) => this.cars = cars,
      error: (err) => this.error = 'Failed to load cars'
    });
  }

  orderCar(carId: number) {
    const userId = 1; // Assuming a logged-in user ID
    this.carService.orderCar(userId, carId).subscribe({
      next: (response) => alert('Car ordered successfully!'),
      error: (err) => alert('Failed to order car')
    });
  }
}
