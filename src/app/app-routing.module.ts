import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { Page404Component } from './components/page404/page404.component';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';
import { DatopersonaComponent } from './components/datopersona/datopersona.component';
import { NovedadesComponent } from './components/novedades/novedades.component';
import { NovsubofiComponent } from './components/novsubofi/novsubofi.component';
import { NovssvvComponent } from './components/novssvv/novssvv.component';
import { AuthGuard } from './guards/auth.guard';



const routes: Routes = [   //rutas para direccionar la pagina
  
  { path: '', component: HomeComponent }, //  ver privilegios de usuarios
  { path: 'offers', component: OffersComponent},
  { path: 'admin/list-books', component: ListBooksComponent, canActivate: [AuthGuard]},
  { path: 'user/login', component: LoginComponent},
  { path: 'user/register', component: RegisterComponent},
  { path: 'user/profile', component: ProfileComponent},
  { path: 'datopersona', component: DatopersonaComponent },
  { path: 'novedades', component: NovedadesComponent }, 
  { path: 'novsubofi', component: NovsubofiComponent}, 
  { path: 'novssvv', component: NovssvvComponent},
  { path: '**', component: Page404Component}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [DatopersonaComponent,ProfileComponent]