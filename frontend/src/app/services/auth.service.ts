// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7165/api';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.localStorageService.getItem('user') ?? 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  register(firstname: string, lastname:string, username: string, email: string, phone: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/User/register`, { firstname, lastname,username, email, phone, password })
      .pipe(
        catchError(err => {
          return throwError(() => new Error('Грешка при регистрация! Моля, опитайте по-късно!'));
        }),
        map(user => {
          return user;
        })
      );
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/User/login`, { username, password })
      .pipe(
        catchError(err => {
          return throwError(() => new Error('Грешка при влизане!'));
        }),
        map(res => {
          this.localStorageService.setItem('user', JSON.stringify(res));
          this.currentUserSubject.next(res);
          return res;
        })
      );
  }

  logout() {
    this.localStorageService.removeItem('user');
    this.currentUserSubject.next(null); 
  }
}
