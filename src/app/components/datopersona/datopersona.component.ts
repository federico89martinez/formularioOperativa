import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { DataApiService } from '../../services/data-api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize, takeLast, withLatestFrom } from 'rxjs/operators';
import { observable, Observable, pipe } from 'rxjs';
import { element } from 'protractor';
import { GradoI, SeccionI } from '../../models/model.interface';
import { snapshotChanges } from '@angular/fire/database';



@Component({
  selector: 'app-datopersona',
  templateUrl: './datopersona.component.html',
  styleUrls: ['./datopersona.component.css'],
  providers: [DataApiService]
})
export class DatopersonaComponent implements OnInit {

  config: any;
  collection = { count :5, data: []}
  personaForm: FormGroup;
  idFireBaseActualizar : string;
  actualizar: boolean;
  responsabilidad: string;

  public selectedGrado : GradoI = { id: 0, name: ''}
  public grados: GradoI[];

  public secciones: SeccionI[];
  public selectedSeccion : SeccionI = { id: 0, name: ''}
  
  constructor(
    public fb: FormBuilder,
    private dataAs :  DataApiService,
    private router: Router, 
    private authService: AuthService,
    private storage: AngularFireStorage

  ){}
  
 @ViewChild('imageUser',{static: true}) inputImageUser: ElementRef;

 @ViewChild('responsaUser',{static: true}) inputSeccionUser: ElementRef;
 
  
 public email: string = '';
public password: string = '';
  closeResult = '';

  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  responsabilidad2: string;
  secc: Observable<string>;
  gradd: Observable<string>;
  //a: string;
  ngOnInit(): void {
    this.secciones = this.dataAs.getSecciones();
    this.grados = this.dataAs.getGrados();
    this.idFireBaseActualizar = "";
    this.actualizar= false;
    //this.getCurrentUser2();
    this.config = {
      itemsPerpage: 5,
      currentPage: 1,
      totalItems: this.collection.count
    }
    this.personaForm = this.fb.group({
      dni: ['', Validators.required],
      nroorden: ['', Validators.required],
      grado: ['', Validators.required],
      apellido: ['', Validators.required],
      nombre: ['', Validators.required],
      responsabilidad: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
      

    })

    this.dataAs.getPersona().subscribe(resp=> {
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
    },
    error=>{
      console.error(error)
    });

  
}


pageChanged(event){
  this.config.currentPage = event;
}

eliminar (item:any):void{
  this.dataAs.deletePersona(item.idFirebase);
}


guardarPersona():void {
  this.personaForm.value.responsabilidad = this.secc;
  this.personaForm.value.grado = this.gradd;
  this.dataAs.createPersona(this.personaForm.value).then(resp=> {
  this.personaForm.reset();
  this.router.navigate(['/datopersona']); 
  }).catch(error => {
    console.error(error);
  })
  //this.collection.data.push(this.personaForm.value);
  //this.modalService.dismissAll();
}

openEditar(content,item:any){
this.personaForm.setValue({
  dni: item.dni,
  nroorden: item.nroorden,
  grado: item.grado,
  apellido: item.apellido,
  nombre: item.nombre,
  responsabilidad: item.responsabilidad,
  password: item.password,
  email: item.email
});
this.idFireBaseActualizar = item.idFirebase;
this.actualizar = true;

}

open(){
  this.actualizar = false;
}


actualizarPersona():void{
  if(!isNullOrUndefined(this.idFireBaseActualizar)){

 /* this.dataAs.updatePersona(this.idFireBaseActualizar,this.personaForm.value).then(resp => {
      this.personaForm.reset();
  }).catch(error => {
    console.error(error);
  })*/
}

}
public isAdmin: any = null;
  public userUid: string = null;
  public userUid2: string = null;
  private imagen: any;

getCurrentUser2(){
  this.authService.isAuth().subscribe(auth => {
    if (auth){
      this.userUid = auth.uid;
     
      this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
        this.isAdmin = Object.assign({} , userRole.roles).hasOwnProperty('admin');
      })
    }
  })
}



onAddUser(){
 //this.getCurrentUser2();

  this.authService.registerUser(this.email,this.password)
  
  .then(res=> {  //res
    this.authService.isAuth().subscribe( user => {
      if (user){
        user.updateProfile({
          photoURL: this.inputImageUser.nativeElement.value,    

        }).then ( () => {
           this.router.navigate(['/datopersona']);
        }).catch((error) => console.log('error',error));
        }
    });
   
    
  }).catch( err => console.log('err',err.message));
}


onUpload(event){
  const id = Math.random().toString(36).substring(2);
  const file = event.target.files[0];
  const filePath = `uploads/profile_${id}`;
  const ref = this.storage.ref(filePath);
  const task = this.storage.upload(filePath, file);
  this.uploadPercent = task.percentageChanges();  // porcentaje de carga del file
  task.snapshotChanges().pipe( finalize(() => this.urlImage = ref.getDownloadURL()  )).subscribe();

}

onSelect(id:any):void{
  this.secc = id;
}

onGradoSelect(id:any):void{
  this.gradd = id;
}

}