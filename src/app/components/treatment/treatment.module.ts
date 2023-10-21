import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { TreatmentService } from '../../services/treatment.service';

@NgModule({
  declarations: [
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    TreatmentService
  ],
  exports: [  // <-- add this block
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent
  ]
})
export class TreatmentModule { }
