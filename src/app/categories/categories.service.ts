import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../items/models/category.model';
import { DataService } from '../shared/services/data.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categriesSub: BehaviorSubject<Category[]> = new BehaviorSubject(
    [] as Category[]
  );
  private categories$: Observable<Category[]> = this.categriesSub.asObservable();

  constructor(private dataService: DataService) {
    this.loadCategories();
  }

  private loadCategories() {
    this.dataService
      .GetAllCategories()
      .subscribe((cats) => this.categriesSub.next(cats));
  }

  selectAllCategories() {
    return this.categories$;
  }
}
