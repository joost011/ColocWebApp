import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  public loading: boolean = false;

  constructor(
  ) { }

  /**
   * Creates a HTTP headers object for a HTTP requests
   *
   * @returns {object} - HTTP options
   */
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
