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
import { GradoI , CausaI} from '../../../models/model.interface';
import { observable, Observable, pipe } from 'rxjs';

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
    nro: '',
    seccion:'',
    especificar:''
   
    };

    user: UserInterface ={
      name: '',
      email: '',
      photoUrl: '',
      displayName: '',
      roles: {}
    } ;

  contacts: MessageI [];
  collection = { count :10, data: []}
  editState: boolean = false;
  formToEdit: MessageI;
  seccion2: String;
  email2: any;

  public selectedGrado : GradoI = { id: 0, name: ''}
  public grados: GradoI[];


  public selectedCausa : CausaI = { id: 0, name: ''}
  public causas: CausaI[];
  



   
  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  createFormGroup() {
    
    return new FormGroup({
      email: new FormControl('',[Validators.required,Validators.pattern(this.emailPattern)]),
      name: new FormControl('',[Validators.required,Validators.minLength(5)]),
      seccion: new FormControl(''),
      nro: new FormControl('',[Validators.required,Validators.minLength(1)]),
      grado: new FormControl('',[Validators.required,Validators.minLength(2)]),
      causa: new FormControl(''),
      especificar: new FormControl('')
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

  ngOnInit(){
    this.grados = this.dataApi.getGrados();
    this.causas = this.dataApi.getCausas();
    this.dataApi.getPersona().subscribe(resp=> {
      this.collection.data = resp.map((e:any) => {
        return{
         dni: e.payload.doc.data().dni,
         nroorden: e.payload.doc.data().nroorden,
         grado: e.payload.doc.data().grado,
         apellido: e.payload.doc.data().apellido,
         nombre: e.payload.doc.data().nombre,
         responsabilidad: e.payload.doc.data().responsabilidad,
         password: e.payload.doc.data().password,
         email: e.payload.doc.data().email,
         idFirebase: e.payload.doc.id
        }
      })
      
      this.buscarResponsabilidad();
   },
   error=>{
     console.error(error)
   });
  
   this.authService.isAuth().subscribe(user => {
    if (user) {
     // this.user = user
     this.user.displayName = user.displayName;
      this.user.email = user.email;
     this.user.photoUrl = user.photoURL;
      console.log('USER', user);
      }
  })
  }
  
  buscarResponsabilidad(){
      
    this.collection.data.forEach(element => {
      this.email2 = Object.values(element)[7];
    if(this.user.email == this.email2){
  
      this.user.displayName =  Object.values(element)[5];
    }
  });
  
  }

  onResetForm(){
    this.contactForm.reset();
  }

  
  gradopre: string;
  seccionpre: string;
  gradd: Observable<string>;
  causs: Observable<string>;

  onSaveForm(myForm:NgForm){
    this.contactForm.value.grado = this.gradd;
    if(this.causs != null){
      this.contactForm.value.causa = this.causs;
    }
    if(this.contactForm.valid){
      
      if(this.respuesta2==1){
        this.respuesta = 'X';
        this.contactForm.value.presente = this.respuesta;
      }
      if(this.respuesta3==1){
        this.respuesta = 'X'
        this.contactForm.value.ausente = this.respuesta;
      }
      //this.seccionpre = this.contactForm.value.seccion;
      this.seccionpre = this.user.displayName;
      this.dataApi.clasificarColeccion(this.seccionpre)
     // if(this.seccionpre == 'Pl My'){
        this.dataApi.saveMessage(this.contactForm.value);
     // }
    /*  if(this.seccionpre == 'Sub'){
        this.dataApi.saveMessage(this.contactForm.value);
      }
      if(this.seccionpre == 'SSVV'){
        this.dataApi.saveMessage(this.contactForm.value);
      }*/
      
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
  get seccion() { return this.contactForm.get('seccion');}
  get especificar() { return this.contactForm.get('especificar');}
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
    
    onGradoSelect(id:any):void{
      this.gradd = id;
    }

    onCausaSelect(id:any):void{
      this.causs = id;
    }

}
