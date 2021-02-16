import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';
import { DataApiService } from 'src/app/services/data-api.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { MessageI } from 'src/app/models/message.interface';
//import { NgForm } from '@angular/forms/src/directives/ng_form';
import { NgForm } from '@angular/forms';
import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms'





@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {
   
  contact: MessageI = {
    id: '',
    email: '',
    name: '',
    message: '',
    grado: '',
    presente: '',
    ausente: '',
    nro: ''
   
    };

  contacts: MessageI [];

  editState: boolean = false;
  formToEdit: MessageI;
  
  
   
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup() {
    
    return new FormGroup({
      email: new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      name: new FormControl('',[Validators.required,Validators.minLength(5)]),
      //message: new FormControl(''),
      nro: new FormControl('',[Validators.required,Validators.minLength(1)]),
      grado: new FormControl('',[Validators.required,Validators.minLength(2)]),
      causa: new FormControl('')
     // presente: new FormControl('')
      //ausente: new FormControl('',[Validators.required,Validators.minLength(2)]),
      // [Validators.required,Validators.minLength(10),Validators.maxLength(100)]
    });
  }
 
  contactForm: FormGroup;
  nombre: string;
  constructor(private dataApi: DataApiService, private authService: AuthService) {
  this.contactForm = this.createFormGroup();
  console.log(this.contactForm.value.grado)
}
  public isAdmin: any = null;
  public userUid: string = null;
  public respuesta: any = 0;
  public respuesta2: any;
  public respuesta3: any;
  

  ngOnInit() {
    //this.getCurrentUser();

   /* this.dataApi.getContacts().subscribe( contacts => {
      this.contacts = contacts;
    }*/
   
  }

  onResetForm(){
    this.contactForm.reset();
  }
  
  gradopre: string;

  onSaveForm(myForm:NgForm){
    if(this.contactForm.valid){
      
      if(this.respuesta2==1){
        this.respuesta = 'X';
        this.contactForm.value.presente = this.respuesta;
      }
      if(this.respuesta3==1){
        this.respuesta = 'X'
        this.contactForm.value.ausente = this.respuesta;
      }
      
      this.gradopre = this.contactForm.value.grado;
      this.dataApi.clasificarColeccion(this.gradopre)
      if(this.gradopre == "Cap"){
        this.dataApi.saveMessage(this.contactForm.value);
      }
      if(this.gradopre == 'Sub'){
        this.dataApi.saveMessage(this.contactForm.value);
      }
      if(this.gradopre == 'SSVV'){
        this.dataApi.saveMessage(this.contactForm.value);
      }
      
      this.onResetForm();
      console.log('valido');

    } else{
      console.log('no valido');
    }

    /* const fechaNow = Date.now();
    this.contact.fecha = fechaNow; */
    
    //agrega el formulario
    //this.dataApi.addForm(this.contact); 


    
  }


  getCurrentUser(){
    this.authService.isAuth().subscribe(auth => {
      if (auth){
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({} , userRole.roles).hasOwnProperty('admin');
        })
      }
    })
  }


  enviarFormulario(){
    alert('El formulario se envio correctamente');


  }


  get name() { return this.contactForm.get('name');}
  get email() { return this.contactForm.get('email');}
  //get message() { return this.contactForm.get('message');}
  get grado() { return this.contactForm.get('grado');}
  get nro() { return this.contactForm.get('nro');}
  get causa() { return this.contactForm.get('causa');}
  //get presente() { return this.contactForm.get('presente');}
  //get ausente() { return this.contactForm.get('ausente');}
  

    editForm(event, contact:MessageI){
        this.editState = true;
        this.formToEdit = contact;
    }

    onUpdateForm(contact: MessageI){
          this.dataApi.updateForm(contact);
          this.clearState();
    }
     
    deleteForm(event, contact: MessageI){
      this.dataApi.deleteForm(contact);
      this.clearState();

    }


    clearState(){
      this.editState = false;
      this.formToEdit = null;
    }


    elejirPresencia(respuesta2){
      console.log(respuesta2)
      this.respuesta = respuesta2;
      console.log(this.respuesta)
    }
    

}
