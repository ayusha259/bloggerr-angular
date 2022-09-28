import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

const URL = 'https://bloggerr-api.onrender.com/api/';
// const URL = 'http://localhost:8000/api/';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token = '';
    let isAuth = this.auth.isAuth.getValue();
    let newUrlReq = req.clone({
      url: URL + req.url,
    });

    if (!isAuth) {
      return next.handle(newUrlReq);
    } else {
      token = this.auth.user?.token;
    }

    let newAuthReq = newUrlReq.clone({
      headers: newUrlReq.headers.append('Authorization', `Bearer ${token}`),
    });
    return next.handle(newAuthReq);
  }
}
