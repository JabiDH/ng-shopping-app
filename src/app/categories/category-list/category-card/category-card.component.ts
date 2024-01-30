import { Component, Input } from '@angular/core';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css'
})
export class CategoryCardComponent {
  @Input() category: Category = {} as Category;
}
