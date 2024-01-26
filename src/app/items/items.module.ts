import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { RouterModule, Routes } from '@angular/router';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ItemEditComponent } from './item-edit/item-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ItemCardComponent } from './item-list/item-card/item-card.component';

const routes: Routes = [
  { path: '', component: ItemsComponent },
  { path: 'new', component: ItemEditComponent },
  { path: ':id' , component: ItemDetailComponent },
  { path: ':id/edit', component: ItemEditComponent }
];

@NgModule({
  declarations: [
    ItemsComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemEditComponent,
    ItemCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ItemsModule { }
