import { Injectable } from '@angular/core';
import { Appelfond } from './app/appelfond';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppelfondService {

  constructor(private http: HttpClient) { }

  addAF(service: Appelfond): Observable<any> {
    return this.http.post<any>('http://localhost:8080/appelfond', service);
  }
}
