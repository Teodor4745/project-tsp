// src/app/cars/cars.component.ts
import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  imports:[HttpClientModule, CommonModule] ,
  standalone: true,
  providers: [CarService],
  styleUrl: './cars.component.scss'
})
export class CarsComponent implements OnInit {
  cars: any[] = [];
  error: string = '';
  currentUser: any = {};
  selectedCars: any[] = [];

  constructor(private carService: CarService, private authService: AuthService) {}

  ngOnInit() {
    this.carService.getCars().subscribe({
      next: (cars) => {
        this.cars = cars;
      },
      error: (err) => this.error = 'Failed to load cars'
    });

    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });

  }

  toggleCarSelection(car: any) {
    const index = this.selectedCars.findIndex(c => c.carId === car.id);
    if (index > -1) {
      this.selectedCars.splice(index, 1);
    } else {
      this.selectedCars.push({ carId: car.id, price: car.price });
    }
  }

    isCarSelected(carId: number): boolean {
      return this.selectedCars.some(car => car.carId === carId);
    }

    orderCars() {
      if (this.selectedCars.length) {
        this.carService.orderCars(this.currentUser.id, this.selectedCars).subscribe({
          next: () => {
            alert('Успешно резервирани автомобили за оглед! Екипът ни ще се свърже с вас скоро!');
            this.selectedCars = [];
          },
          error: (err) => alert('Грешка при резервирането на автомобили')
        });
      } else {
        alert('Грешка! Няма избрани автомобили!');
      }
    }
}
