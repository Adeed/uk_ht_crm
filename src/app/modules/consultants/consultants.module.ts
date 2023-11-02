import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module'; 

import { ConsultantCreateComponent } from './consultant-create/consultant-create.component';
import { ConsultantReadComponent } from './consultant-read/consultant-read.component';
import { ConsultantUpdateComponent } from './consultant-update/consultant-update.component';
import { ConsultantDeleteComponent } from './consultant-delete/consultant-delete.component';
import { ConsultantsComponent } from './consultants/consultants.component';

import { SharedModule } from '../../common/shared.module';

const routes: Routes = [
  { path: '', component: ConsultantsComponent, children: [
    { path: 'create', component: ConsultantCreateComponent },
    { path: 'read', component: ConsultantReadComponent },
    { path: 'update', component: ConsultantUpdateComponent },
    { path: 'delete', component: ConsultantDeleteComponent }
  ]}
];

@NgModule({
  declarations: [
    ConsultantCreateComponent,
    ConsultantReadComponent,
    ConsultantUpdateComponent,
    ConsultantDeleteComponent,
    ConsultantsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MaterialModule,  
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ConsultantsModule { }
