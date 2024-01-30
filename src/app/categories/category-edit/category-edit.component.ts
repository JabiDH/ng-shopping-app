import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { CategoriesService } from '../categories.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.css',
})
export class CategoryEditComponent implements OnInit {
  categoryId: number = 0;
  isEditMode: boolean = false;
  category$: Observable<Category | undefined> = of({} as Category);
  @ViewChild('form') catForm: NgForm = {} as NgForm;

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.categoryId = +params['id'] || 0;
      this.isEditMode = !!this.categoryId;

      if (this.isEditMode) {
        this.category$ = this.categoriesService.selectCategoryById(
          this.categoryId,
          true
        );
      }
      
    });
  }

  onSubmit() {
    if(this.catForm.valid) {
      let catData = {} as Category;
      catData.id = this.categoryId;
      catData.name = this.catForm.value.name;
      catData.description = this.catForm.value.description;
      catData.imagePath = this.catForm.value.imagePath;
      this.categoriesService.saveCategory(this.categoryId, catData);
    }
  }

  onCancel() { 
    if(this.catForm.touched) {
      if(!confirm('Are you sure you want to cancel?')) {
        return;
      }
    }
    this.router.navigate(['categories']);
  }
}
