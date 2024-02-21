import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items/items.service';
import { Observable, delay, of } from 'rxjs';
import { Item } from '../items/models/item.model';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {
  isLoading: boolean[] = [];
  items$: Observable<Item[]> = of();

  constructor(
    private itemsService: ItemsService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.items$ = this.itemsService.selectAllItems();
  }

  getItemImages(item: Item) {
    return item.images.length > 0 ? item.images.map(img => img.path) : [item.imagePath];
  }

  onAddToCart(item: Item, index: number) {
    this.isLoading[index] = true;
    
    setTimeout(() => 
    { 
      this.shoppingCartService.addToCart(item);
      this.isLoading[index] = false;
    }, 500);

  }

}
