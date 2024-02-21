import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, concatMap, map, of, switchMap, take, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { PermissionService } from '../../shared/services/permission.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private permissionService: PermissionService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {        
    const user$ = this.authService.loggedInUser;    
    return user$
      .pipe(
        switchMap(user =>
          user? this.permissionService.hasPermission(
            user?.email as string,
            route.data['requiredRole']
          ) : of(this.router.createUrlTree(['/login']))          
        )
      );      
  }
}
