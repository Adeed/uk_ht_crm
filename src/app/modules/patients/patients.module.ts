import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio'

import { PatientsRoutingModule } from './patients-routing.module';
import { PatientsComponent } from './patients.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { ConsulNotesComponent } from './consul-notes/consul-notes.component';
import { ContractComponent } from './contract/contract.component';
import { MedicalQsComponent } from './medical-qs/medical-qs.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';


@NgModule({
  declarations: [
    PatientsComponent,
    PatientRegistrationComponent,
    ConsulNotesComponent,
    ContractComponent,
    MedicalQsComponent,
    PatientUpdateComponent
  ],
  imports: [
    MatRadioModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    PatientsRoutingModule
  ]
})
export class PatientsModule { }
