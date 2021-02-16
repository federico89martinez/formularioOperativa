import { Component, OnInit } from '@angular/core';

import { DataApiService } from '../../services/data-api.service';
import {AfterViewInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';

import {NgbPaginationConfig} from '@ng-bootstrap/ng-bootstrap'; 
import { MatSort } from '@angular/material/sort';
import { MatFormField } from  '@angular/material';

@Component({
  selector: 'app-novssvv',
  templateUrl: './novssvv.component.html',
  styleUrls: ['./novssvv.component.css']
})
export class NovssvvComponent implements OnInit {

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

  cantTotalSSVV: number;
  cantTotalSSVVPresentes: number;
  cantTotalSSVVAusentes: number;

  pregunta: string;
  contadorPresentes: number = 0;
  contadorSSVVPresentes: number= 0;
  contadorSSVVAusentes: number = 0;

 
  constructor(private dataAs :  DataApiService) {
  
    this.date = (new Date()).getTime();
    
    }

  ngOnInit() {
    this.dataAs.getContactsSSVV().subscribe(resp => {
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
      this.cantTotalSSVVV();
      this.cantTotalSSVVPresentess();
      this.cantTotalSSVVAusentess();
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
 cantTotalSSVVV(){
  this.cantTotalSSVV = this.dataSource.data.length   
}

cantTotalSSVVPresentess(){
  this.dataSource.data.forEach(element => {
    this.pregunta = Object.values(element)[3]
    if(this.pregunta == "X"){
      this.contadorSSVVPresentes = this.contadorSSVVPresentes + 1
    }
  })
  this.cantTotalSSVVPresentes = this.contadorSSVVPresentes;
}

cantTotalSSVVAusentess(){
  this.dataSource.data.forEach(element => {
    this.pregunta = Object.values(element)[4]
    if(this.pregunta == "X"){
      this.contadorSSVVAusentes = this.contadorSSVVAusentes + 1
    }
  })
  this.cantTotalSSVVAusentes = this.contadorSSVVAusentes;

}

}
