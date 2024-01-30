import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrl: './category-detail.component.css',
})
export class CategoryDetailComponent implements OnInit {
  categoryId: number = 0;
  category$: Observable<Category | undefined> = of();
  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.categoryId = +params['id'];
      this.category$ = this.categoriesService.selectCategoryById(this.categoryId);
    });
  }

  onEditCategory() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteCategory() {
    if(confirm('Are you sure you want to delete the category?')) {
      this.categoriesService.deleteCategory(this.categoryId);
    }
  }
}
