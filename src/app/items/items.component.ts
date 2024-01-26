import { Component, OnInit } from '@angular/core';
import { ItemsService } from './items.service';
import { Observable, Subscription, catchError, tap } from 'rxjs';
import { Item } from './models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {

  constructor(private itemsService: ItemsService){
  }
  
  ngOnInit(): void {
  }
}
