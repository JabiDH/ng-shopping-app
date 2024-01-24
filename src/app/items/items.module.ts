import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsComponent } from './items.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ItemsComponent }
];

@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ItemsModule { }
