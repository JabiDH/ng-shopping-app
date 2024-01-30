import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  categories$: Observable<Category[]> = of();
  searchTerm: string = '';

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoriesService.selectAllCategories();
  }

  onNewCategory() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  filterCategories() {
    this.categories$ = this.categoriesService.filterCategories(this.searchTerm);
  }
}
