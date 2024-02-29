import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../../../shared/models/order.model';
import { UserOrdersService } from '../../services/user-orders.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrl: './user-order-detail.component.css'
})
export class UserOrderDetailComponent implements OnInit {
  orderId: number = 0;
  order$ : Observable<Order> = of();

  constructor(private userOrdersService: UserOrdersService, private route: ActivatedRoute) {
    
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.order$ = this.userOrdersService.selectUserOrder(this.orderId);
    });    
  }
}
