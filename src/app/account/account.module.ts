import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserOrderComponent } from './user-orders/user-order/user-order.component';



@NgModule({
  declarations: [
    UserOrdersComponent,
    UserOrderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
