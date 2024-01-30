import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Category } from './models/category.model';
import { DataService } from '../shared/services/data.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categriesSub: BehaviorSubject<Category[]> = new BehaviorSubject(
    [] as Category[]
  );
  private categories$: Observable<Category[]> =
    this.categriesSub.asObservable();

  constructor(private dataService: DataService, private router: Router) {
    this.loadCategories();
  }

  private loadCategories() {
    this.dataService
      .getAllCategories()
      .subscribe((cats) => this.categriesSub.next(cats));
  }

  selectAllCategories() {
    return this.categories$;
  }

  selectCategoryById(id: number, fromEdit: boolean = false) {
    return fromEdit
      ? this.dataService.getCategory(id).pipe(
          map((catDto) => {
            return { ...catDto } as Category;
          })
        )
      : this.categories$.pipe(map((cats) => cats.find((cat) => cat.id === id)));
  }

  filterCategories(searchTerm: string) {
    const search = searchTerm ? searchTerm.toLocaleLowerCase() : '';
    return this.categories$.pipe(
      map((cats) => {
        return cats.filter(
          (cat) =>
            cat.name.toLocaleLowerCase().includes(search) ||
            cat.description.toLocaleLowerCase().includes(search)
        );
      })
    );
  }

  saveCategory(id: number, category: Category) {
    this.dataService
    .upsertCategory(id, category)
    .pipe(
      map((catDto) => {
        return { ...catDto } as Category;
      })
    ).subscribe(savedCat => {
      const cates = this.categriesSub.getValue();
      const index = cates.findIndex(x => x.id === id);
      if(index === -1) {
        const newCates = [...cates, savedCat];
        this.categriesSub.next(newCates);
      }
      else {
        const newCates = [...cates];
        newCates[index] = {...cates[index], ...savedCat};
        this.categriesSub.next(newCates);
      }
      this.router.navigate(['/categories', savedCat.id]);
    });
  }

  deleteCategory(id: number) {
    this.dataService.deleteCategory(id)
    .pipe(map(catDto => {
      return {...catDto} as Category
    }))
    .subscribe(cat => {
      const cats = this.categriesSub.getValue();
      const newCats = cats.filter(c => c.id !== cat.id);
      this.categriesSub.next(newCats);
      this.router.navigate(['/categories']);
    });

  }
}
