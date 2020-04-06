import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages/pages.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent, children: [
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
