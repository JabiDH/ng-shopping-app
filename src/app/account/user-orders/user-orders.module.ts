import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../auth/services/auth.guard';
import { UserOrdersComponent } from './user-orders.component';
import { UserOrderListComponent } from './user-order-list/user-order-list.component';
import { UserOrderDetailComponent } from './user-order-detail/user-order-detail.component';

const routes: Routes = [
  {
    path: '',
    component: UserOrdersComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'user' },
    children: [
      { path: ':id', component: UserOrderDetailComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UserOrdersComponent,
    UserOrderListComponent,
    UserOrderDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class UserOrdersModule {}
