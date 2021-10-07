import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiConfig } from '../config/api.config';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private hitUrl: string = '';

  constructor(private http: HttpClient, private config: ApiConfig) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser')!)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  postLoginDataToService(Url: string, body: any) {
    this.hitUrl = this.config.baseUrl + Url;
    return this.http.post<any>(this.hitUrl, body).pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  postDataToService(Url: string, body: any) {
    this.hitUrl = this.config.baseUrl + Url;
    return this.http.post(this.hitUrl, body)
  }

  putDataToService(Url: string, body: any) {
    this.hitUrl = this.config.baseUrl + Url;
    return this.http.put<any>(this.hitUrl, body).pipe(
      map((res) => {
        this.currentUserSubject.next(res);
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userToken');
    sessionStorage.removeItem('emailToken');
    localStorage.removeItem('resetToken');
    this.currentUserSubject.next(null!); 
  }
}
