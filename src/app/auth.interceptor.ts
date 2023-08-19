import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router:Router, private auth:AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(localStorage.getItem('token')) {
      return next.handle(request.clone({ setHeaders: { 'Authorization': 'Bearer '+localStorage.getItem('token') } })).pipe(
        tap({
          error: (err: any) => {
            if (err instanceof HttpErrorResponse) {
              if (err.status != 401) {
                return;
              }
              this.auth.logout();
              this.router.navigate(['register']);
            }
          }
        }))
  ;
    }
    return next.handle(request);
  }
}
