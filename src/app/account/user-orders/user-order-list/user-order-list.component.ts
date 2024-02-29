import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../../../shared/models/order.model';
import { UserOrdersService } from '../../services/user-orders.service';

@Component({
  selector: 'app-user-order-list',
  templateUrl: './user-order-list.component.html',
  styleUrl: './user-order-list.component.css'
})
export class UserOrderListComponent implements OnInit {
  orders$: Observable<Order[]> = of([]);
  constructor(private userOrdersService: UserOrdersService){}

  ngOnInit(): void {
    this.orders$ = this.userOrdersService.selectAllUserOrders();
  }
}
