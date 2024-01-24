import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  exhaustMap,
  interval,
  map,
  of,
  pipe,
  tap,
  throwError,
  timer,
} from 'rxjs';
import { Router } from '@angular/router';
import { RegisterRequestDto } from '../modules/register/register-request.dto';
import { RegisterResponseDto } from '../modules/register/register-response.dto';
import { LoginResponseDto } from '../modules/login/login-response.dto';
import { LoginRequestDto } from '../modules/login/login-request.dto';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';

export const PasswordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

@Injectable({ providedIn: 'root' })
export class AuthService {
  loggedInUser = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {

  }

  register(registerDto: RegisterRequestDto): Observable<RegisterResponseDto> {
    const registerEndpoint = `${environment.shoppingCartApiUrl}/auth/register`;
    return this.http
      .post<RegisterResponseDto>(registerEndpoint, registerDto)
      .pipe(        
        catchError(this.handleError),
        tap((res) => this.handleRegister(res)),
      );
  }

  login(loginDto: LoginRequestDto): Observable<LoginResponseDto> {
    const loginEndpoint = `${environment.shoppingCartApiUrl}/auth/login`;    
    return this.http.post<LoginResponseDto>(loginEndpoint, loginDto).pipe(
      catchError(this.handleError),
      tap(this.handleLogin),
    );
  }

  logout() {
    this.loggedInUser.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userDataStr = localStorage.getItem('userData');
    if (!userDataStr) {
      return;
    }

    const userData = JSON.parse(userDataStr) as {
      email: string;
      _token: string;
      _tokenExpireDate: string;
    };

    if (userData._token) {
      const tokenExpireDate = new Date(userData._tokenExpireDate);
      const leftOverDuration = tokenExpireDate.getTime() - new Date().getTime();
      this.loggedInUser.next(
        new User(userData.email, userData._token, tokenExpireDate)
      );
      this.autoLogout(leftOverDuration);
    } else {
      this.logout();
    }
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'Unhandle exception while registering the user.';
    if (error && error.error) {
      if (error.error.errors) {
        const validationErrors = error.error.errors;
        for (const propertyName in validationErrors) {
          if (validationErrors.hasOwnProperty(propertyName)) {
            errorMessage = validationErrors[propertyName].join(', ');
          }
        }
      } else if (error.error.error) {
        errorMessage = error.error.error;
      }
    }
    return throwError(errorMessage);
  };

  private handleRegister = (res: RegisterResponseDto) => {
    if (res && res.email) {
      this.router.navigate(['/login'], { queryParams: { email: res.email } });
    }
  };

  private handleLogin = (res: LoginResponseDto) => {
    if (res) {
      console.log('handle login -> ', res);
      const expireDate = new Date(
        new Date().getTime() + res.expireOnInSeconds * 1000
      );
      const userData = new User(res.email, res.token, expireDate);
      this.loggedInUser.next(userData);
      this.autoLogout(res.expireOnInSeconds * 1000);
      localStorage.setItem('userData', JSON.stringify(userData));
      this.router.navigate(['/home']);
    }
  };

  private autoLogout = (expirationPeriod: number) => {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationPeriod);
  };
}
