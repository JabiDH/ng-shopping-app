import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated: boolean = false;
  private userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.loggedInUser.subscribe(
      user => this.isAuthenticated = !!user
    );
  }
  
  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

}
