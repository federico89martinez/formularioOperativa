import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';



const routes: Routes = [   //rutas para direccionar la pagina
  
  { path: '', component: HomeComponent }, //  ver privilegios de usuarios
  { path: 'offers', component: OffersComponent},
  { path: 'admin/list-books', component: ListBooksComponent},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent},
  { path: '**', component: Page404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
