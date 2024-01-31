import { NgModule } from '@angular/core';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { CategoryCardComponent } from './category-list/category-card/category-card.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    canActivate: [AuthGuard],
    data: { requiredRole: 'admin' },
    children: [
      { path: 'new', component: CategoryEditComponent },
      { path: ':id', component: CategoryDetailComponent },
      { path: ':id/edit', component: CategoryEditComponent },
    ],
  },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryListComponent,
    CategoryCardComponent,
    CategoryDetailComponent,
    CategoryEditComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes),
  ],
})
export class CategoriesModule {}
