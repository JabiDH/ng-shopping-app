import { Component, Input } from '@angular/core';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrl: './item-card.component.css'
})
export class ItemCardComponent {
  @Input() item: Item = {} as Item;  
}
