import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DataService } from '../../shared/services/data.service';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../../auth/models/user.model';
import { Order } from '../../shared/models/order.model';
import { OrderRequestDto } from '../../shared/dtos/orders/order-request.dto';

@Injectable({
  providedIn: 'root',
})
export class UserOrdersService {
  private userOrdersSub: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  private userOrders$: Observable<Order[]> = this.userOrdersSub.asObservable();
  private user: User = {} as User;
  currentOrderSub: BehaviorSubject<Order> = new BehaviorSubject<Order>({} as Order);

  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) {
    this.loadUserOrders();
  }

  private loadUserOrders() {
    this.authService.loggedInUser.subscribe((user) => {
      if (user && user?.email) {
        this.user = user;
        this.dataService
          .getUserOrders(user?.email)
          .pipe(map((res) => res.orders as Order[]))
          .subscribe((orders) => {
            this.userOrdersSub.next(orders);
          });
      }
    });
  }

  selectAllUserOrders(): Observable<Order[]> {
    return this.userOrders$;
  }

  selectUserOrder(id: number): Observable<Order> {
    return this.userOrders$.pipe(
        map(orders => orders.find(o => o.id === id) as Order)
    );
  }

  createUserOrder(order: Order): void {
    this.dataService
      .upsertOrder(0, { ...order } as OrderRequestDto)
      .pipe(
        map(order => { 
            return {...order} as Order
        })
      )
      .subscribe(
        order => {
            const orders = this.userOrdersSub.getValue();
            const newOrders = [...orders, order];
            this.userOrdersSub.next(newOrders);
            this.currentOrderSub.next(order);
        }
      );
  }

}
