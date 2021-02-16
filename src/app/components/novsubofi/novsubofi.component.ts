import { Component, OnInit } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import { MatSort } from '@angular/material/sort';
import { MatFormField } from  '@angular/material';

@Component({
  selector: 'app-novsubofi',
  templateUrl: './novsubofi.component.html',
  styleUrls: ['./novsubofi.component.css']
})
export class NovsubofiComponent implements OnInit {

  displayedColumns: string[] = ['nro', 'grado', 'name', 'presente','ausente','causa', 'email'];
  dataSource = new MatTableDataSource();
  

  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  constructor(private dataAs :  DataApiService) {
  
    this.date = (new Date()).getTime();
    
    }

  ngOnInit() {

    this.dataAs.getContactsSub().subscribe(resp => {
      this.dataSource.data = resp.map((e:any) => {
        return {
            nro: e.payload.doc.data().nro,
            grado: e.payload.doc.data().grado,
            name: e.payload.doc.data().name, 
            presente: e.payload.doc.data().presente,
            ausente: e.payload.doc.data().ausente,
            causa: e.payload.doc.data().causa,
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
SUBOFICIALES
  */
 cantTotalSubb(){
  this.cantTotalSub = this.dataSource.data.length   
}

cantTotalSubOficialesPresentes(){
  this.dataSource.data.forEach(element => {
    this.pregunta = Object.values(element)[3]
    if(this.pregunta == "X"){
      this.contadorSubPresentes = this.contadorSubPresentes + 1
    }
  })
  this.cantTotalSubPresentes = this.contadorSubPresentes;
}

cantTotalSubOficialesAusentes(){
  this.dataSource.data.forEach(element => {
    this.pregunta = Object.values(element)[4]
    if(this.pregunta == "X"){
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
