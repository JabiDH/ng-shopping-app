import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { AuthGuard } from './auth/services/auth.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full' },
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard], data: { requiredRole: 'user' } },
  { path: 'shoppingcart', component: ShoppingCartComponent, canActivate: [AuthGuard], data: { requiredRole: 'user' } },
  { path: 'register', loadChildren: () => import('./auth/modules/register/register.module').then(x => x.RegisterModule) },
  { path: 'login', loadChildren: () => import('./auth/modules/login/login.module').then(x => x.LoginModule) },
  { path: 'items', loadChildren: () => import('./items/items.module').then(x => x.ItemsModule) },
  { path: 'categories', loadChildren: () => import('./categories/categories.module').then(x => x.CategoriesModule) },
  { path: 'account', loadChildren: () => import('./account/account.module').then(x => x.AccountModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
