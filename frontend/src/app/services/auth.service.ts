// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.localStorageService.getItem('currentUser') ?? 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`/api/users/register`, { username, email, password })
      .pipe(map(user => {
        if (user && user.token) {
          this.localStorageService.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  login(username: string, password: string) {
    return this.http.post<any>(`/api/users/login`, { username, password })
      .pipe(map(user => {
        this.localStorageService.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    this.localStorageService.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
