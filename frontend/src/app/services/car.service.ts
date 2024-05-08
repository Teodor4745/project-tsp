// src/app/services/car.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsUrl = 'https://localhost:7165/api/Cars';  

  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.carsUrl);
  }

  orderCar(userId: number, carId: number): Observable<any> {
    const orderUrl = 'https://localhost:7165/api/Orders';
    const order = { userId, carId };  
    return this.http.post(orderUrl, order);
  }
}
