import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, PasswordPattern } from '../../services/auth.service';
import { LoginRequestDto } from './login-request.dto';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, delay, of } from 'rxjs';
import { LoginResponseDto } from './login-response.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup = this.fb.group({});
  email: string = '';
  error: string | null = null;
  isLoading: boolean = false;
  private loginSub: Subscription | null = null;  

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.initEmailFromQueryParams();
    this.initloginForm();
  }

  private initloginForm(): void {
    this.loginForm = this.fb.group(
      {        
        email: this.fb.control(this.email, [Validators.required, Validators.email]),
        password: this.fb.control('', [Validators.required])
      }
    );
  }

  onSubmit(): void {    
    if (!this.loginForm.valid) {
      return;
    }

    let request: LoginRequestDto = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
      ExpireOnInSeconds: 60 * 60 * 24 // 1 day      
    };

    this.isLoading = true;   

    this.loginSub = this.authService.login(request).subscribe(
      (res: LoginResponseDto) => {
        this.isLoading = false;
        this.error = null;
        this.router.navigate(['/items']);
      }, 
      (errorRes: string) => {
        this.error = errorRes;
        this.isLoading = false;
      }
    );
  }
  
  private initEmailFromQueryParams() : void {
    var queryParams = this.route.snapshot.queryParams as Params;
    this.email = (queryParams && queryParams['email']) ? queryParams['email'] : '';
  }  

  ngOnDestroy(): void {
    this.loginSub?.unsubscribe();
  }

}
