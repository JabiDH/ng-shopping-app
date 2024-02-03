import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Observable, Subscription, of } from 'rxjs';
import { PermissionService } from '../shared/services/permission.service';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

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
  cartCount$: Observable<number> = of();

  constructor(
    private authService: AuthService,
    private permissionService: PermissionService,
    private shoppingCartService: ShoppingCartService
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
    this.cartCount$ = this.shoppingCartService.selectItemsCount();
  }

  onLogout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
