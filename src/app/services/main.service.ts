import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private http: HttpClient,
  ) { }

  public getHttpOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers: headers,
    }

    return options;
  }
}
