import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { PaymentCreateComponent } from './payment-create/payment-create.component';
import { PaymentReadComponent } from './payment-read/payment-read.component';
import { PaymentUpdateComponent } from './payment-update/payment-update.component';
import { PaymentDeleteComponent } from './payment-delete/payment-delete.component';
import { PaymentsComponent } from './payments/payments.component';

import { MaterialModule } from 'src/app/material.module';

const routes: Routes = [
  { path: '', component: PaymentsComponent, children: [
    { path: 'create', component: PaymentCreateComponent },
    { path: 'read', component: PaymentReadComponent },
    { path: 'update', component: PaymentUpdateComponent },
    { path: 'delete', component: PaymentDeleteComponent }
  ]}
];
@NgModule({
  declarations: [
    PaymentCreateComponent,
    PaymentReadComponent,
    PaymentUpdateComponent,
    PaymentDeleteComponent,
    PaymentsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class PaymentsModule { }
