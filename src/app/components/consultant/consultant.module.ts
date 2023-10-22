import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ConsultantService } from '../../services/consultant.service';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    ReactiveFormsModule
  ],
  providers: [
    ConsultantService
  ],
  exports: [  // <-- add this block
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent
  ]
})
export class ConsultantModule { }
