import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { PaymentService } from '../../services/payment.service';

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
    PaymentService
  ],
  exports: [  // <-- add this block
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent
  ]
})
export class PaymentModule { }
