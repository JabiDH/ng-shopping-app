import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', loadChildren: () => import('./auth/modules/register/register.module').then(x => x.RegisterModule) },
  { path: 'login', loadChildren: () => import('./auth/modules/login/login.module').then(x => x.LoginModule) },
  { path: 'items', loadChildren: () => import('./items/items.module').then(x => x.ItemsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
