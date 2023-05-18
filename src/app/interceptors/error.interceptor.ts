import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ModalService } from '../services/modal.service';
import { MainService } from '../services/main.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private modalService: ModalService,
    private mainService: MainService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this.modalService.error.code = error.status;
        this.modalService.error.message = error.statusText;
        this.modalService.openErrorModal();
        this.mainService.loading = false;
        return throwError(() => error);
      })
    );
  }
}
