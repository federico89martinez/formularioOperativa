import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import { MatSort } from '@angular/material/sort';
import { MatFormField } from  '@angular/material';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user';
import { withLatestFrom } from 'rxjs/operators';



@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  displayedColumns: string[] = ['nro', 'grado', 'name', 'seccion', 'presente','ausente','causa', 'especificar', 'email'];
  dataSource = new MatTableDataSource();
  dataSource2 = new MatTableDataSource();
  

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatPaginator,{static: true}) paginator2: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatSort,{static: true}) sort2: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;


    /*this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort2;*/
    
    
  }
  
  date : number;
  collection = { count :5, data: []}
  email2: any;

  pres: string;
  totalItems: number;
  page: number;
  previousPage: number;
  showPagination: boolean;
  cantTotalOfi: number;
  cantTotalOfiPresentes: number;
  cantTotalOfiAusentes: number;
  cantTotalSub: number;
  cantTotalSubPresentes: number;
  cantTotalSubAusentes: number;
  pregunta: string;
  contadorPresentes: number = 0;
  contadorSubPresentes: number= 0;
  contadorAusentes: number = 0;
  contadorSubAusentes: number = 0;
  
  //cantTotalOficialesPresentes: number;

  constructor(private dataAs :  DataApiService, private authService: AuthService) {
  
  this.date = (new Date()).getTime();
  
  }

  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/
  user: UserInterface ={
    name: '',
    email: '',
    photoUrl: '',
    displayName: '',
    roles: {}
  } ;
 

  ngOnInit() {
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

   
    novedades(){
      console.log(this.user.displayName)
    if(this.user.displayName == "Pl My"){

      this.dataAs.getContactsPlMy().subscribe(resp => {
        
        this.dataSource.data = resp.map((e:any) => {
              
          return{
           nro: e.payload.doc.data().nro,
           grado: e.payload.doc.data().grado,
           name: e.payload.doc.data().name,
           seccion: e.payload.doc.data().seccion, 
           presente: e.payload.doc.data().presente,
           ausente: e.payload.doc.data().ausente,
           causa: e.payload.doc.data().causa,
           email: e.payload.doc.data().email,
           especificar: e.payload.doc.data().especificar
           
          }
          
        })      
        this.cantTotalOficiales();
        this.cantTotalOficialesPresentes();
        this.cantTotalOficialesAusentes();
     },
     error=>{
       console.error(error)
     });
    }  else if (this.user.displayName == "Sec Cdo Ser"){
  
        this.dataAs.getContactsSecCdoSer().subscribe(resp => {
          
          this.dataSource.data = resp.map((e:any) => {
                
            return{
             nro: e.payload.doc.data().nro,
             grado: e.payload.doc.data().grado,
             name: e.payload.doc.data().name,
             seccion: e.payload.doc.data().seccion, 
             presente: e.payload.doc.data().presente,
             ausente: e.payload.doc.data().ausente,
             causa: e.payload.doc.data().causa,
             email: e.payload.doc.data().email,
             especificar: e.payload.doc.data().especificar
             
            }
            
          })      
          this.cantTotalOficiales();
          this.cantTotalOficialesPresentes();
          this.cantTotalOficialesAusentes();
       },
       error=>{
         console.error(error)
       });
    
  } else if (this.user.displayName == "CCPr"){
  
    this.dataAs.getContactsCCPr().subscribe(resp => {
      
      this.dataSource.data = resp.map((e:any) => {
            
        return{
         nro: e.payload.doc.data().nro,
         grado: e.payload.doc.data().grado,
         name: e.payload.doc.data().name,
         seccion: e.payload.doc.data().seccion, 
         presente: e.payload.doc.data().presente,
         ausente: e.payload.doc.data().ausente,
         causa: e.payload.doc.data().causa,
         email: e.payload.doc.data().email,
         especificar: e.payload.doc.data().especificar
         
        }
        
      })      
      this.cantTotalOficiales();
      this.cantTotalOficialesPresentes();
      this.cantTotalOficialesAusentes();
   },
   error=>{
     console.error(error)
   });

}  else if (this.user.displayName == "Enl Int"){
  
  this.dataAs.getContactsEnlInt().subscribe(resp => {
    
    this.dataSource.data = resp.map((e:any) => {
          
      return{
       nro: e.payload.doc.data().nro,
       grado: e.payload.doc.data().grado,
       name: e.payload.doc.data().name,
       seccion: e.payload.doc.data().seccion, 
       presente: e.payload.doc.data().presente,
       ausente: e.payload.doc.data().ausente,
       causa: e.payload.doc.data().causa,
       email: e.payload.doc.data().email,
       especificar: e.payload.doc.data().especificar
       
      }
      
    })      
    this.cantTotalOficiales();
    this.cantTotalOficialesPresentes();
    this.cantTotalOficialesAusentes();
 },
 error=>{
   console.error(error)
 });

} else if (this.user.displayName == "CC Secund"){
  
  this.dataAs.getContactsCCSecund().subscribe(resp => {
    
    this.dataSource.data = resp.map((e:any) => {
          
      return{
       nro: e.payload.doc.data().nro,
       grado: e.payload.doc.data().grado,
       name: e.payload.doc.data().name,
       seccion: e.payload.doc.data().seccion, 
       presente: e.payload.doc.data().presente,
       ausente: e.payload.doc.data().ausente,
       causa: e.payload.doc.data().causa,
       email: e.payload.doc.data().email,
       especificar: e.payload.doc.data().especificar
       
      }
      
    })      
    this.cantTotalOficiales();
    this.cantTotalOficialesPresentes();
    this.cantTotalOficialesAusentes();
 },
 error=>{
   console.error(error)
 });

} else if (this.user.displayName == "Telecom PC"){
  
  this.dataAs.getContactsTelecomPC().subscribe(resp => {
    
    this.dataSource.data = resp.map((e:any) => {
          
      return{
       nro: e.payload.doc.data().nro,
       grado: e.payload.doc.data().grado,
       name: e.payload.doc.data().name,
       seccion: e.payload.doc.data().seccion, 
       presente: e.payload.doc.data().presente,
       ausente: e.payload.doc.data().ausente,
       causa: e.payload.doc.data().causa,
       email: e.payload.doc.data().email,
       especificar: e.payload.doc.data().especificar
       
      }
      
    })      
    this.cantTotalOficiales();
    this.cantTotalOficialesPresentes();
    this.cantTotalOficialesAusentes();
 },
 error=>{
   console.error(error)
 });

 }
}
  
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  buscarResponsabilidad(){
    
    this.collection.data.forEach(element => {
      this.email2 = Object.values(element)[7];
    if(this.user.email == this.email2){
      this.user.displayName =  Object.values(element)[5];
    }
  });

  this.novedades();
  
  }
  
/*

OFICIALES

*/
  cantTotalOficiales(){
   
   this.cantTotalOfi = this.dataSource.data.length
  
   
}

  cantTotalOficialesPresentes(){

    this.dataSource.data.forEach(element => {
      this.pregunta = Object.values(element)[4]
      if(this.pregunta == "X"){
        this.contadorPresentes = this.contadorPresentes + 1
      }
    })
    this.cantTotalOfiPresentes = this.contadorPresentes;
  
  }

  cantTotalOficialesAusentes(){

    this.dataSource.data.forEach(element => {
      this.pregunta = Object.values(element)[5]
      if(this.pregunta == "X"){
        this.contadorAusentes = this.contadorAusentes + 1
      }
    })
    this.cantTotalOfiAusentes = this.contadorAusentes;

  }

  /*
  SUBOFICIALES
  */
  /*cantTotalSubb(){
    this.cantTotalSub = this.dataSource2.data.length   
  }

  cantTotalSubOficialesPresentes(){
    this.dataSource2.data.forEach(element => {
      this.pregunta = Object.values(element)[3]
      if(this.pregunta == "si"){
        this.contadorSubPresentes = this.contadorSubPresentes + 1
      }
    })
    this.cantTotalSubPresentes = this.contadorSubPresentes;
  }

  cantTotalSubOficialesAusentes(){
    this.dataSource2.data.forEach(element => {
      this.pregunta = Object.values(element)[4]
      if(this.pregunta == "si"){
        this.contadorSubAusentes = this.contadorSubAusentes + 1
      }
    })
    this.cantTotalSubAusentes = this.contadorSubAusentes;

  }*/


}

export interface PeriodicElement {
  nro: number;
  grado: number;
  name: string;
  presente: string;
  ausente: string;
  causa: string;
}
