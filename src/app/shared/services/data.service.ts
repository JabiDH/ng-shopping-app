import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ItemDto } from '../dtos/items/item.dto';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { CategoryDto } from '../dtos/categories/category.dto';
import { CategoriesResponseDto } from '../dtos/categories/categories-response.dto';
import { ItemsResponseDto } from '../dtos/items/items-response.dts';
import { ItemResponseDto } from '../dtos/items/item-response.dto';
import { CategoryResponseDto } from '../dtos/categories/category-response.dto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  // Get all items
  getAllItems(): Observable<ItemDto[]> {
    return this.http
      .get<ItemsResponseDto>(
        `${environment.shoppingCartApiUrl}/item/GetAllItems`
      )
      .pipe(
        catchError(throwError),
        map((res) => res.items)
      );
  }

  // Get all Categories
  getAllCategories(): Observable<CategoryDto[]> {
    return this.http
      .get<CategoriesResponseDto>(
        `${environment.shoppingCartApiUrl}/category/GetAllCategories`
      )
      .pipe(
        catchError(throwError),
        map((res) => res.categories)
      );
  }

  // Get item by id
  getItem(id: number): Observable<ItemDto> {
    return this.http
      .get<ItemResponseDto>(
        `${environment.shoppingCartApiUrl}/item/GetItem/${id}`
      )
      .pipe(
        catchError(throwError),
        map((res) => res.item)
      );
  }

  // Get category by id
  getCategory(id: number): Observable<CategoryDto> {
    return this.http
      .get<CategoryResponseDto>(
        `${environment.shoppingCartApiUrl}/category/GetCategory/${id}`
      )
      .pipe(
        catchError(throwError),
        map((res) => res.category)
      );
  }

  // Create or Update item
  upsertItem(id: number, item: ItemDto): Observable<ItemDto> {
    const upsert =
      id === 0
        ? this.http.post<ItemResponseDto>(
            `${environment.shoppingCartApiUrl}/item/CreateItem`,
            item
          )
        : this.http.put<ItemResponseDto>(
            `${environment.shoppingCartApiUrl}/item/UpdateItem/${id}`,
            item
          );

    return upsert.pipe(
      catchError(throwError),
      map((res) => res.item)
    );
  }

  // Delete an item
  deleteItem(id: number): Observable<ItemDto> {
    return this.http
      .delete<ItemResponseDto>(
        `${environment.shoppingCartApiUrl}/item/DeleteItem/${id}`
      )
      .pipe(
        catchError(throwError),
        map((res) => res.item)
      );
  }

  // Create or Update Category
  upsertCategory(id: number, category: CategoryDto) : Observable<CategoryDto>{
    const upsert =
      id === 0
        ? this.http.post<CategoryResponseDto>(
            `${environment.shoppingCartApiUrl}/category/CreateCategory`,
            category
          )
        : this.http.put<CategoryResponseDto>(
            `${environment.shoppingCartApiUrl}/category/UpdateCategory/${id}`,
            category
          );

    return upsert.pipe(
      catchError(throwError),
      map((res) => res.category)
    );
  }

  // Delete a category
  deleteCategory(id: number) : Observable<CategoryDto> {
    return this.http.delete<CategoryResponseDto>(`${environment.shoppingCartApiUrl}/category/DeleteCategory/${id}`)
    .pipe(
      catchError(throwError),
      map(res => res.category)
    )
  }
}
