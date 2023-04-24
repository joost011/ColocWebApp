import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ColocService {

  constructor(
    private http: HttpClient,
    private mainService: MainService,
  ) { }


  public post(body: Object) {
    return this.http.post(environment.baseUrl + 'coloc', body, this.mainService.getHttpOptions());
  }
}
