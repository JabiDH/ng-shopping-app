import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { UserOrdersComponent } from './user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/account/orders', pathMatch: 'full'
  },
  {
    path: 'orders',
    loadChildren: () => import('./user-orders/user-orders.module').then((x) => x.UserOrdersModule)
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AccountModule {}
