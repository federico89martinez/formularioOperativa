import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { FormularioComponent } from './components/admin/formulario/formulario.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfileComponent } from './components/users/profile/profile.component';
import { RegisterComponent } from './components/users/register/register.component';
import { Page404Component } from './components/page404/page404.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { HomeComponent } from './components/home/home.component';
import { OffersComponent } from './components/offers/offers.component';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth} from '@angular/fire/auth';
import { ListBooksComponent } from './components/admin/list-books/list-books.component';



@NgModule({
  declarations: [
    AppComponent,
    //FormularioComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    Page404Component,
    NavbarComponent,
    HeroComponent,
    HomeComponent,
    OffersComponent,
    ListBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule

  ],
  providers: [AngularFireAuth], 
  bootstrap: [AppComponent]
})


export class AppModule { }
