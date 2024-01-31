import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items/items.service';
import { Observable, of } from 'rxjs';
import { Item } from '../items/models/item.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit {

  items$: Observable<Item[]> = of();

  constructor(
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.items$ = this.itemsService.selectAllItems();
  }

  getItemImages(item: Item) {
    return item.images.length > 0 ? item.images.map(img => img.path) : [item.imagePath];
  }
}
