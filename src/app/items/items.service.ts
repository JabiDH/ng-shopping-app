import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap, throwError } from 'rxjs';
import { Item } from './models/item.model';
import { environment } from '../../environments/environment';
import { ItemDto } from './dtos/item.dto';
import { HttpClient } from '@angular/common/http';
import { GetAllItemsResponseDto } from './dtos/getallitems-response.dts';

@Injectable({
  providedIn: 'root',
})
export class ItemsService implements OnInit {
    private subject = new BehaviorSubject<Item[]>([]);
    items$: Observable<Item[]> = this.subject.asObservable();

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loadAllItems().subscribe(
            items => this.subject.next(items)
        );
    }

    loadAllItems(): Observable<Item[]> {
        return this.http
        .get<GetAllItemsResponseDto>(`${environment.shoppingCartApiUrl}/item/GetAllItems`)      
        .pipe(
            catchError(throwError),
            tap((res) => console.log('GetAllItems -> ', res)),
            map((res) => [...res.items] as Item[])
        );
    }

    selectItems() {
        return this.items$.pipe(
            map(items => items)
        );
    }
}
