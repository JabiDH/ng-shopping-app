import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable, Subscription, of } from 'rxjs';
import { PermissionService } from '../shared/services/permission.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;
  private userSubscription: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.loggedInUser.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (this.isAuthenticated) {
        this.permissionService
          .hasPermission(user?.email as string, 'admin')
          .subscribe(hasAdminRole => this.isAdmin = hasAdminRole);
      }
    });
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
