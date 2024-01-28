import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, take } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.loggedInUser.pipe(
      take(1),
      exhaustMap((user) => {
        if (user) {
          const reqWithToken = req.clone({
            setHeaders: {
              Authorization: `Bearer ${user.getToken()}`,
            },
          });
          return next.handle(reqWithToken);
        }
        return next.handle(req);
      })
    );
  }
}
