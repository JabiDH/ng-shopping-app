import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../categories/categories.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { Category } from '../models/category.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../models/item.model';
import { ItemsService } from '../items.service';

export class ItemForm {
  constructor(
    public categoryId: number | null = null,
    public name: string | null = null,
    public description: string | null = null,
    public price: number | null = null,
    public imagePath: string | null = null
  ) {}
}

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemEditComponent implements OnInit {
  form: FormGroup;
  itemId: number = 0;
  isEditMode: boolean = false;
  itemForm: ItemForm = {} as ItemForm;
  categories$: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private itemsService: ItemsService
  ) {
    this.form = this.fb.group({});
    this.categories$ = of();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.itemForm = new ItemForm();
      this.itemId = +params['id'] || 0;
      this.isEditMode = this.itemId && this.itemId > 0 ? true : false;

      if (this.isEditMode) {
        this.itemsService
          .selectItemById(this.itemId)
          .subscribe((selectedItem) => {
            this.itemForm = { ...selectedItem } as ItemForm;
            this.categories$ = this.categoriesService.selectAllCategories();
            this.initForm();
          });
      } else {
        this.categories$ = this.categoriesService.selectAllCategories();
        this.initForm();
      }
    });
  }

  initForm() {
    let images: FormArray = this.fb.array([]);

    if (this.isEditMode) {
      const imgPathes = this.itemForm?.imagePath?.split(';');      
      imgPathes?.forEach((path, index) => {
        const required = index === 0 ? null : Validators.required;
        const group = this.fb.group({
          path: this.fb.control(path, required),
        });
        images.push(group);
      });
      console.log('init form - edit mode -> ', images);
    } else {
      let imagesCtrls = this.fb.group({
        path: this.fb.control(''),
      });
      images.push(imagesCtrls);
    }

    console.log('init form -> ', this.itemForm);
    this.form = this.fb.group({
      category: this.fb.control(this.itemForm?.categoryId, [
        Validators.required,
      ]),
      name: this.fb.control(this.itemForm?.name, [Validators.required]),
      price: this.fb.control(this.itemForm?.price, [
        Validators.required,
        Validators.pattern(/^\d{0,9}(\.\d{1,2})?$/),
      ]),
      description: this.fb.control(this.itemForm?.description, [
        Validators.maxLength(1000),
      ]),
      images: images,
    });
  }

  get imagesFormArray(): FormArray {
    return this.form.get('images') as FormArray;
  }

  onAddImage() {
    this.imagesFormArray.push(
      this.fb.group({
        path: this.fb.control('', [Validators.required]),
      })
    );
  }

  onDeleteImage(index: number) {
    this.imagesFormArray.removeAt(index);
    this.form.markAsTouched();
  }

  onSubmit() {
    let itemToSave = {} as Item;
    itemToSave.categoryId = this.form.get('category')?.value;
    itemToSave.name = this.form.get('name')?.value;
    itemToSave.price = this.form.get('price')?.value;
    itemToSave.description = this.form.get('description')?.value;

    if (this.imagesFormArray && this.imagesFormArray.controls.length > 0) {
      const images = this.imagesFormArray.value as [{ path: string }];
      itemToSave.imagePath = images.map((image) => image.path).join(';');
    }

    console.log('Item to Save -> ', itemToSave);

    if (this.form.valid) {
      this.itemsService.saveItem(this.itemId, itemToSave);
    }
  }

  onCancel() {
    if (this.form.touched) {
      if (!confirm('Are you sure you want to cancel?')) {
        return;
      }
    }
    this.router.navigate(['items']);
  }
}
