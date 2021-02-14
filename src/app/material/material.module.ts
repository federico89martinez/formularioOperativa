import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatSortModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSortModule,
    FormsModule,
    MatRadioModule
  ],
  exports: [MatTableModule,MatPaginatorModule,MatFormFieldModule,MatSortModule,FormsModule,MatRadioModule]
})
export class MaterialModule { }
