import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
//import { FormularioComponent } from './components/admin/formulario/formulario.component';
import { LoginComponent } from './components/users/login/login.component';
// import { ProfileComponent } from './components/users/profile/profile.component';
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
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { DataApiService } from './services/data-api.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NovedadesComponent } from './components/novedades/novedades.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';


@NgModule({
  declarations: [
    AppComponent,
    //FormularioComponent,
    LoginComponent,
    //ProfileComponent,
    RegisterComponent,
    Page404Component,
    NavbarComponent,
    HeroComponent,
    HomeComponent,
    OffersComponent,
    ListBooksComponent,
    routingComponents,
   NovedadesComponent
   
   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
    

  ],
  providers: [AngularFireAuth, AngularFirestore,DataApiService], 
  bootstrap: [AppComponent]
})


export class AppModule { }
