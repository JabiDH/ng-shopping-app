import { Injectable } from '@angular/core';
import { Item } from '../items/models/item.model';
import { BehaviorSubject, Observable, count, map, of, tap } from 'rxjs';
import { DataService } from '../shared/services/data.service';
import { CartItem } from './models/cart-item.model';
import { AuthService } from '../auth/services/auth.service';
import { CartItemsRequestDto } from '../shared/dtos/cart-items/cart-items-request.dto';
import { User } from '../auth/models/user.model';
import { CartItemDto } from '../shared/dtos/cart-items/cart-item.dto';
import { Cart } from './models/cart.model';
import { CartItemsResponseDto } from '../shared/dtos/cart-items/cart-items-response.dto';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartSub: BehaviorSubject<Cart | null> = new BehaviorSubject<Cart | null>(null);
  private cart$: Observable<Cart | null> = this.cartSub.asObservable();
  private user: User = {} as User;

  constructor(
    private dataService: DataService,
    private authService: AuthService
  ) {
    this.loadCartItems();
  }

  private loadCartItems() {
    this.authService.loggedInUser.subscribe((user) => {
      if (user && user?.email) {
        this.user = user;
        this.dataService.getCartItems(user.email)
        .pipe(map(this.mapCart))
        .subscribe(cart => this.cartSub.next(cart));
      }
    });
  }

  selectCartItems() {
    return this.cart$;
  }

  selectItemsCount() : Observable<number> {
    let count = 0;
    return this.cart$.pipe(
      map(cart => {
        count = 0;        
        cart?.cartItems.forEach(items => {
          count += items.quantity
        });
        return count;
      }),
      tap(count => console.log('Items count -> ', count))
    );
  }

  addToCart(item: Item): void {
    let quantity = 1;

    this.cart$.pipe(
        tap(cart => {
            const cartItem = cart?.cartItems.find(x => x.itemId === item.id)
            quantity = cartItem ? cartItem.quantity + 1 : 1;
        })
    ).subscribe();

    const cartItem = {
      item: item,
      itemId: item.id,
      email: this.user.email,
      quantity: quantity,
    } as CartItem;
    this.saveCartItems([cartItem]);
  }

  deleteFromCart(cartItem: CartItem): void {
    this.removeCartItems([cartItem]);
  }

  updateCartItemQuantity(cartItem: CartItem) {
    this.saveCartItems([cartItem]);
  }

  private saveCartItems(cartItems: CartItem[]): void {
    const request = {
      email: this.user.email,
      cartItems: cartItems.map((cartItem) => {
        return { ...cartItem } as CartItemDto;
      }),
    } as CartItemsRequestDto;

    this.dataService
      .saveCartItems(request)
      .pipe(map(this.mapCart))
      .subscribe((cart) => {
        this.cartSub.next(cart);
      });
  }

  private removeCartItems(cartItems: CartItem[]): void {
    const request = {
      email: this.user.email,
      cartItems: cartItems.map((cartItem) => {
        return { ...cartItem } as CartItemDto;
      }),
    } as CartItemsRequestDto;

    this.dataService
      .removeCartItems(request)
      .pipe(map(this.mapCart))
      .subscribe((cart) => {
        this.cartSub.next(cart);
      });
  }

  private mapCart(res: CartItemsResponseDto) {
    if(res.cartItems?.length === 0) return null;
    return {
      cartItems: [...res.cartItems] as CartItem[],
      subtotal: res.subtotal,
      salesTax: res.salesTax,
      total: res.total,
    } as Cart;
  }
}
