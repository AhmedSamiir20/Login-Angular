import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  login(data: Login): Observable<any> {
    // console.log('data', data);
    return this.http.post<any>(this.apiUrl, data);
  }
}
