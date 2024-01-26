import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../items.service';
import { Observable } from 'rxjs';
import { Item } from '../models/item.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.css'
})
export class ItemDetailComponent implements OnInit {
  itemId: number = 0;
  item$: Observable<Item | undefined> = new Observable<Item | undefined>();
  constructor(
    private itemsService: ItemsService,
    private route: ActivatedRoute,
    private router: Router) {

  }
  
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.itemId = +params['id'];
        this.item$ = this.itemsService.selectItemById(this.itemId);
      }
    );    
  }

  onEditItem() {
    this.router.navigate(['/items', this.itemId, 'edit']);
  }
}
