import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { DropdownComponent } from './dropdown/dropdown.component';



@NgModule({
  declarations: [
    PaginatorComponent,
    DropdownComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginatorComponent,
    DropdownComponent
  ]
})
export class SharedModule { }
