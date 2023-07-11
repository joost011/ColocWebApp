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


  /**
 * Makes post request to API for starting a coloc process
 *
 * @param {Object} body - Body of the request
 * @returns {any} - Response from the server
 */
  public post(body: Object) {
    return this.http.post(environment.baseUrl + 'coloc', body, this.mainService.getHttpOptions());
  }

  /**
 * Makes get request to the API for getting a process status
 *
 * @param {string} uuid - Ticket
 * @returns {ColocAnalysis} - ColocAnalysis object for ticket
 */
  public getStatus(uuid: string) {
    return this.http.get<ColocAnalysis>(environment.baseUrl + 'coloc/' + uuid, this.mainService.getHttpOptions());
  }

  /**
 * Makes get request to the API for getting the results of an analysis
 *
 * @param {string} uuid - Ticket
 * @returns {Result} - Result object for ticket
 */
  public getResult(uuid: string) {
    return this.http.get<Result>(environment.baseUrl + 'result/' + uuid, this.mainService.getHttpOptions());
  }
}
