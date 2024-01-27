import {
  Component,
  OnInit,
} from '@angular/core';
import { ItemsService } from '../items.service';
import { tap } from 'rxjs';
import { Item } from '../models/item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent implements OnInit {
  itemId: number = 0;
  item: Item | undefined = {} as Item;
  private itemImages: string[] = [];
  //afterViewReady: boolean = false;
  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.itemId = +params['id'];
      this.itemsService
        .selectItem(this.itemId)
        .pipe(
          tap((item) => {
            this.item = item;
            if (this.item && this.item.images?.length > 0) {
              this.itemImages = this.item.images.map((image) => image.path);
            }
            else {
              this.itemImages = [];
            }
          })
        )
        .subscribe();
    });
  }

  get getItemImages() {
    return this.itemImages && this.itemImages.length > 0 ? this.itemImages : null;
  }

  onEditItem() {
    this.router.navigate(['/items', this.itemId, 'edit']);
  }

  onDeleteItem() {
    if (confirm('Are you sure you want to delete item?')) {
      this.itemsService.deleteItem(this.itemId);
    }
  }
}
