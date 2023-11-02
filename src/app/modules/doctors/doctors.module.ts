import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../../material.module'; 

import { DoctorService } from './doctor.service';
import { DoctorCreateComponent } from './doctor-create/doctor-create.component';
import { DoctorReadComponent } from './doctor-read/doctor-read.component';
import { DoctorUpdateComponent } from './doctor-update/doctor-update.component';
import { DoctorDeleteComponent } from './doctor-delete/doctor-delete.component';
import { DoctorsComponent } from './doctors/doctors.component';

import { SharedModule } from '../../common/shared.module';

const routes: Routes = [
  { path: '', component: DoctorsComponent, children: [
    { path: 'create', component: DoctorCreateComponent },
    { path: 'read', component: DoctorReadComponent },
    { path: 'update', component: DoctorUpdateComponent },
    { path: 'delete', component: DoctorDeleteComponent }
  ]}
];

@NgModule({
  declarations: [
    DoctorCreateComponent,
    DoctorReadComponent,
    DoctorUpdateComponent,
    DoctorDeleteComponent,
    DoctorsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    HttpClientModule,
    MaterialModule,  
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DoctorService
  ]
})
export class DoctorsModule { }
