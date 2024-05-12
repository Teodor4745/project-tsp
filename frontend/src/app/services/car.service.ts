// src/app/services/car.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private baseUrl = 'https://localhost:7165/api';

  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Cars`);
  }

  getCarBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/CarBrand`);
  }

  getCarModels(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/CarModel`);
  }

  createCarBrand(carBrand: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CarBrand`, carBrand);
  }

  createCarModel(carModel: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CarModel`, carModel);
  }

  createCarWithImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/Cars/createwithimage`, formData);
  }

  orderCars(userId: number, orderItems: any[]): Observable<any> {
    const orderData = { userId, orderItems };
    return this.http.post(`${this.baseUrl}/Order`, orderData);
  }

  getOrders(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Order?userId=${userId}`);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Order/All`);
  }

}
