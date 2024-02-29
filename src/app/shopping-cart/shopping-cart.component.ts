import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from './models/cart-item.model';
import { Cart } from './models/cart.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderStatus } from '../shared/enums/order-status.enum';
import { TAX_RATE } from '../shared/models/constants.model';
import { UserOrdersService } from '../account/services/user-orders.service';
import { Order } from '../shared/models/order.model';
import { OrderItem } from '../shared/models/order-item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<Cart | null> = of(null);
  @ViewChild('form') cartForm: NgForm = {} as NgForm;
  disabledRemoves: boolean[] = [];
  cart: Cart | null = {} as Cart;
  isLoading: boolean = false;

  constructor(
    private shoppingCartService: ShoppingCartService,
    private userOrdersService: UserOrdersService,
    private router: Router) {}

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.selectCartItems();    
    this.cart$.subscribe(c => this.cart = c);
  }

  onQuantityChange(cartItem: CartItem, index: number) {
    cartItem.quantity < 1 ? this.disabledRemoves[index] = true : this.disabledRemoves[index] = false;
    if (this.cartForm && this.cartForm.valid) {
      this.shoppingCartService.updateCartItemQuantity(cartItem);
    }     
  }

  onRemoveItem(cartItem: CartItem) {
    this.shoppingCartService.deleteFromCart(cartItem);
  }

  onContinueShopping() {
    this.router.navigate(['/shop']);
  }

  onClearCart() {
    if(confirm("Are you sure you want to proceed with clearing your cart?")) {
      this.shoppingCartService.clearCart();
    }
  }

  onSubmit() {
    if(this.cartForm && this.cartForm.valid) { 
      this.isLoading = true;     
      this.placeOrder(this.cart?.cartItems as CartItem[]);
    }
  }

  private placeOrder(cartItems: CartItem[]) : void {
    const order = {
      email: this.shoppingCartService.user.email,
      status: OrderStatus.Created,
      taxRate: TAX_RATE,
      orderItems: cartItems.map((cartItem) => {
        return {
          itemId: cartItem.itemId,
          price: cartItem.item.price,
          taxRate: TAX_RATE,
          quantity: cartItem.quantity
        } as OrderItem
      })
    } as Order;

    this.userOrdersService.createUserOrder(order);    
    
    setTimeout(() => {
      this.userOrdersService.currentOrderSub.subscribe(order => {
        if(order) {
          this.router.navigate(['/account/orders', order.id]);
          this.shoppingCartService.clearCart();
          this.isLoading = false;
        }
      });
    }, 1000);
  }
}
