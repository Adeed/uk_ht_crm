import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ListComponent],
  exports: [ListComponent]  // if you want to use ListComponent in other modules
})
export class ListModule { }
