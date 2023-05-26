import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from './main.service';
import { environment } from 'src/environments/environment.development';
import { ColocAnalysis } from '../interfaces/coloc-analysis';
import { Result } from '../interfaces/result';

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

  public getStatus(uuid: string) {
    return this.http.get<ColocAnalysis>(environment.baseUrl + 'coloc/' + uuid, this.mainService.getHttpOptions());
  }

  public getResult(uuid: string){
    return this.http.get<Result>(environment.baseUrl + 'result/' + uuid, this.mainService.getHttpOptions());
  }
}
