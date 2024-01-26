import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ItemDto } from '../dtos/items/item.dto';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { GetAllItemsResponseDto } from '../dtos/items/getallitems-response.dts';
import { CategoryDto } from '../dtos/items/category.dto';
import { GetAllCategoriesResponseDto } from '../dtos/categories/getallcategories-response.dto';
import { GetItemResponseDto } from '../dtos/items/getitem-response.dto';
import { UpsertItemResponseDto } from '../dtos/items/upsertitem-response.dto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Get all items
  GetAllItems(): Observable<ItemDto[]> {
    return this.http
      .get<GetAllItemsResponseDto>(
        `${environment.shoppingCartApiUrl}/item/GetAllItems`
      )
      .pipe(
        catchError(throwError),
        tap((res) => console.log('GetAllItems -> ', res)),
        map((res) => res.items)
      );
  }

  // Get all Categories
  GetAllCategories(): Observable<CategoryDto[]> {
    return this.http
      .get<GetAllCategoriesResponseDto>(
        `${environment.shoppingCartApiUrl}/category/GetAllCategories`
      )
      .pipe(
        catchError(throwError),
        tap((res) => console.log('GetAllCategories -> ', res)),
        map((res) => res.categories)
      );
  }

  // Get item by id
  GetItem(id: number) : Observable<ItemDto> {
    return this.http
      .get<GetItemResponseDto>(`${environment.shoppingCartApiUrl}/item/GetItem/${id}`)
      .pipe(
        catchError(throwError),
        tap(res => console.log(`GetItem/${id} ->`, res)),
        map(res => res.item)
      )
  }

  // Create or Update item
  UpsertItem(id: number, item: ItemDto) : Observable<ItemDto> {    
    const upsert = id === 0 ? 
      this.http.post<UpsertItemResponseDto>(`${environment.shoppingCartApiUrl}/item/CreateItem`, item) :
      this.http.put<UpsertItemResponseDto>(`${environment.shoppingCartApiUrl}/item/UpdateItem/${id}`, item);

    return upsert
      .pipe(
        catchError(throwError),
        tap(res => {
          console.log(`Upsert/${id} -> `, res);
        }),        
        map(res => res.item)
      );
  }
}
