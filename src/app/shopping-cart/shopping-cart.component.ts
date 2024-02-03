import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from './models/cart-item.model';
import { Cart } from './models/cart.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css',
})
export class ShoppingCartComponent implements OnInit {
  cart$: Observable<Cart | null> = of(null);
  @ViewChild('form') cartForm: NgForm = {} as NgForm;
  disabledRemoves: boolean[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router) {}

  ngOnInit(): void {
    this.cart$ = this.shoppingCartService.selectCartItems();    
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

  onSubmit() {
    
  }
}
