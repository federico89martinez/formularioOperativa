import { Component, OnInit } from '@angular/core';
import { DataApiService } from '../../services/data-api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import { MatSort } from '@angular/material/sort';
import { MatFormField } from  '@angular/material';



@Component({
  selector: 'app-novedades',
  templateUrl: './novedades.component.html',
  styleUrls: ['./novedades.component.css']
})
export class NovedadesComponent implements OnInit {
  displayedColumns: string[] = ['nro', 'grado', 'name', 'presente','ausente','message', 'email'];
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

  constructor(private dataAs :  DataApiService) {
  
  this.date = (new Date()).getTime();
  
  }

  /*applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }*/

 

  ngOnInit() {
    this.dataAs.getContacts().subscribe(resp => {
      
      this.dataSource.data = resp.map((e:any) => {
            
        return{
         nro: e.payload.doc.data().nro,
         grado: e.payload.doc.data().grado,
         name: e.payload.doc.data().name, 
         presente: e.payload.doc.data().presente,
         ausente: e.payload.doc.data().ausente,
         message: e.payload.doc.data().message,
         email: e.payload.doc.data().email
         
        }
        
      })      
      this.cantTotalOficiales();
      this.cantTotalOficialesPresentes();
      this.cantTotalOficialesAusentes();
   },
   error=>{
     console.error(error)
   });




    this.dataAs.getContactsSub().subscribe(resp => {
      this.dataSource2.data = resp.map((e:any) => {
        return {
            nro: e.payload.doc.data().nro,
            grado: e.payload.doc.data().grado,
            name: e.payload.doc.data().name, 
            presente: e.payload.doc.data().presente,
            ausente: e.payload.doc.data().ausente,
            message: e.payload.doc.data().message,
            email: e.payload.doc.data().email
        }
      })
      this.cantTotalSubb();
      this.cantTotalSubOficialesPresentes();
      this.cantTotalSubOficialesAusentes();
    },
    error => {
      console.error(error)
    });
   


  }
  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  
/*

OFICIALES

*/
  cantTotalOficiales(){
   
   this.cantTotalOfi = this.dataSource.data.length
  
   
}

  cantTotalOficialesPresentes(){

    this.dataSource.data.forEach(element => {
      this.pregunta = Object.values(element)[3]
      if(this.pregunta == "si"){
        this.contadorPresentes = this.contadorPresentes + 1
      }
    })
    this.cantTotalOfiPresentes = this.contadorPresentes;
  
  }

  cantTotalOficialesAusentes(){

    this.dataSource.data.forEach(element => {
      this.pregunta = Object.values(element)[4]
      if(this.pregunta == "si"){
        this.contadorAusentes = this.contadorAusentes + 1
      }
    })
    this.cantTotalOfiAusentes = this.contadorAusentes;

  }

  /*
  SUBOFICIALES
  */
  cantTotalSubb(){
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

  }


}

export interface PeriodicElement {
  nro: number;
  grado: number;
  name: string;
  presente: string;
  ausente: string;
  causa: string;
}
