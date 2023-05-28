import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { MainService } from './main.service';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor(
    private http: HttpClient,
    private mainService: MainService,
  ) { }

  public exportToCSV(uuid: string) {
    let body = {
      uuid: uuid,
      format: 'csv',
    }

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post<any>(environment.baseUrl + 'export', body, { headers, responseType: 'blob' as 'json'});
  }
}
