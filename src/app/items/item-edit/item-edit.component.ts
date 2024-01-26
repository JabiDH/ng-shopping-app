import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../categories/categories.service';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from '../models/item.model';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrl: './item-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemEditComponent implements OnInit {
  form: FormGroup;
  itemId: number = 0;
  isEditMode: boolean = false;
  item: Item | undefined = {} as Item;
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
      this.itemId = +params['id'] || 0;
      this.isEditMode = this.itemId && this.itemId > 0 ? true : false;
      if (this.isEditMode) {
        this.itemsService
          .selectItemById(this.itemId)
          .subscribe((selectedItem) => {
            this.item = selectedItem;
            const itemValues = {
              category: this.item?.categoryId,
              name: this.item?.name,
              price: this.item?.price,
              description: this.item?.description,
              imagePath: this.item?.imagePath,
            };
            this.form.patchValue(itemValues);
          });
      }
    });

    this.categories$ = this.categoriesService.selectAllCategories();

    this.initForm();
  }

  initForm() {
    console.log('init form -> ', this.item);
    this.form = this.fb.group({
      category: this.fb.control(this.item?.categoryId, [Validators.required]),
      name: this.fb.control(this.item?.name, [Validators.required]),
      price: this.fb.control(this.item?.price, [
        Validators.required,
        Validators.pattern(/^\d{0,9}(\.\d{1,2})?$/),
      ]),
      description: this.fb.control(this.item?.description, [
        Validators.maxLength(1000),
      ]),
      imagePath: this.fb.control(this.item?.imagePath),
    });
  }

  onSubmit() {
    let itemToSave = {} as Item;
    itemToSave.categoryId = this.form.get('category')?.value;
    itemToSave.name = this.form.get('name')?.value;
    itemToSave.price = this.form.get('price')?.value;
    itemToSave.description = this.form.get('description')?.value;
    itemToSave.imagePath = this.form.get('imagePath')?.value;

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
