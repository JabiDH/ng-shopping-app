import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { Item } from './models/item.model';
import { DataService } from '../shared/services/data.service';
import { HttpStatusCode } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  private items$: Observable<Item[]> = this.itemsSubject.asObservable();

  constructor(private dataService: DataService, private router: Router) {
    this.loadAllItems();
  }

  private loadAllItems(): void {
    console.log('ItemsService -> loadData()');
    this.dataService
      .getAllItems()
      .pipe(
        catchError(throwError),
        tap((res) => console.log('GetAllItems -> ', res))
      )
      .subscribe((items) => this.itemsSubject.next(items));
  }

  selectAllItems(): Observable<Item[]> {
    return this.items$;
  }

  filterItems(searchTerm: string, catIds: number[]): Observable<Item[]> {
    return this.items$.pipe(
      map((items) => {
        if (catIds.length > 0) {
          items = items.filter((item) => catIds.includes(item.categoryId));
          console.log('filterItems() -> ', items);
        }

        return items.filter(
          (item) =>
            item.name
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase()) ||
            item.description
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
        );
      })
    );
  }

  selectItem(id: number) : Observable<Item | undefined> {
    return this.items$.pipe(
      map(items => {
        return items.find(item => item.id === id);
      })
    );
  }

  selectItemById(id: number): Observable<Item | undefined> {
    return this.dataService.getItem(id).pipe(
      catchError((err) => {
        if (err.status === HttpStatusCode.NotFound) {
          this.router.navigate(['/items']);
        }
        return throwError(() => err);
      }),
      tap((res) => console.log('SelectItemById -> ', res))
    );
  }

  saveItem(id: number, item: Item): void {
    this.dataService
      .upsertItem(id, item)
      .pipe(map((itemDto) => itemDto as Item))
      .subscribe((savedItem) => {
        // Push or update a new state to item$
        const items = this.itemsSubject.getValue();
        const index = items.findIndex((x) => x.id === id);
        if (index === -1) {
          const newItems = [...items, savedItem];
          this.itemsSubject.next(newItems as Item[]);
          console.log('newItems -> ', newItems);
        } else {
          const newItems = items.slice(0);
          newItems[index] = {
            ...items[index],
            ...savedItem,
          };
          this.itemsSubject.next(newItems as Item[]);
        }
        this.router.navigate(['/items', savedItem.id]);
      });
  }

  deleteItem(id: number) : void {
    this.dataService.deleteItem(id)
    .pipe(
      map(itemDto => { return { ...itemDto } as Item })      
    )
    .subscribe(item => {
      const items = this.itemsSubject.getValue();
      const newItems = items.filter(item => item.id != id);
      this.itemsSubject.next(newItems);
    });
    this.router.navigate(['/items']);
  }
}
