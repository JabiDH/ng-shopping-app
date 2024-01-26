import { Component, EventEmitter, OnInit } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { ItemsService } from '../items.service';
import { Item } from '../models/item.model';
import { Category } from '../models/category.model';
import { CategoriesService } from '../../categories/categories.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css',
})
export class ItemListComponent implements OnInit {
  items$: Observable<Item[]> = new Observable();
  categories$: Observable<Category[]> = new Observable();
  searchTerm: string = '';
  selectedCatIds: number[] = [];

  constructor(
    private itemsService: ItemsService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items$ = this.itemsService.selectAllItems();
    this.categories$ = this.categoriesService.selectAllCategories();
  }

  filterItems(catId: number | null = null) {
    // Add/Remove category Id
    if (catId != null && catId != 0) {
      if (this.selectedCatIds.find((id) => id === catId)) {
        this.selectedCatIds = this.selectedCatIds.filter((id) => id !== catId);
      } else {
        this.selectedCatIds.push(catId);
      }
    }    
    
    // Filtering items
    console.log('calling item service filterItems() -> ', this.selectedCatIds);
    this.items$ = this.itemsService.filterItems(this.searchTerm, this.selectedCatIds);    
    console.log('selected cats -> ', this.selectedCatIds);
  }

  onNewItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
