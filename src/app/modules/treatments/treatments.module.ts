import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule, Routes } from '@angular/router';

import { TreatmentCreateComponent } from './treatment-create/treatment-create.component';
import { TreatmentReadComponent } from './treatment-read/treatment-read.component';
import { TreatmentUpdateComponent } from './treatment-update/treatment-update.component';
import { TreatmentDeleteComponent } from './treatment-delete/treatment-delete.component';
import { TreatmentsComponent } from './treatments/treatments.component';

import { SharedModule } from '../../common/shared.module';

const routes: Routes = [
  { path: '', component: TreatmentsComponent, children: [
    { path: 'create', component: TreatmentCreateComponent },
    { path: 'read', component: TreatmentReadComponent },
    { path: 'update', component: TreatmentUpdateComponent },
    { path: 'delete', component: TreatmentDeleteComponent }
  ]}
];

@NgModule({
  declarations: [
    TreatmentCreateComponent,
    TreatmentReadComponent,
    TreatmentUpdateComponent,
    TreatmentDeleteComponent,
    TreatmentsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class TreatmentsModule { }
