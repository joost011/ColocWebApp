import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { FileUploadRes } from '../interfaces/file-upload-res';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
   * Makes post request to API for storing a GWAS file
   *
   * @param {FormData} file - The file to be stored
   * @returns {FileUploadRes} - FileUploadRes object
   */
  public store(file: FormData) {
    return this.http.post<FileUploadRes>(environment.baseUrl + 'file', file);
  }
}
