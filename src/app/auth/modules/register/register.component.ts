import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService, PasswordPattern } from '../../services/auth.service';
import { RegisterRequestDto } from '../../dtos/register-request.dto';
import { Subscription, catchError, map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  regForm: FormGroup = this.fb.group({});
  error: string | null = null;
  isLoading: boolean = false;
  private regSub: Subscription | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initRegForm();
  }

  private initRegForm(): void {
    this.regForm = this.fb.group(
      {
        email: this.fb.control('', [Validators.required, Validators.email]),
        password: this.fb.control('', [
          Validators.required,
          Validators.pattern(PasswordPattern),
        ]),
        confirmPassword: this.fb.control('', [
          Validators.required,
          Validators.pattern(PasswordPattern),
        ]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  private passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password &&
      confirmPassword &&
      password.value === confirmPassword.value
      ? null
      : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (!this.regForm.valid) {
      return;
    }

    this.isLoading = true;
    let request: RegisterRequestDto = {
      email: this.regForm.value.email,
      password: this.regForm.value.password,
      roles: ['User']
    };

    this.regSub = this.auth.register(request).subscribe(
      (res) => {
        this.isLoading = false;
        this.error = null;
      },
      (errorRes) => {
        this.isLoading = false;
        this.error = errorRes;
      }
    );
  }

  ngOnDestroy(): void {
    this.regSub?.unsubscribe();
  }
}
