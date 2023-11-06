import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';

import { PatientsComponent } from './patients.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { ConsulNotesComponent } from './consul-notes/consul-notes.component';
import { ContractComponent } from './contract/contract.component';
import { MedicalQsComponent } from './medical-qs/medical-qs.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';
import { PatientTreatmentsComponent } from './patient-treatments/patient-treatments.component';
import { PaymentPlanComponent } from './payment-plan/payment-plan.component';

// Define the routes directly here
const routes: Routes = [
  {
    path: '', component: PatientsComponent,
    children: [
      { path: 'register', component: PatientRegistrationComponent },
      { path: 'update/:patient_id', component: PatientUpdateComponent },
      { path: 'treatments/:patient_id', component: PatientTreatmentsComponent },
      { path: 'notes', component: ConsulNotesComponent },
      { path: 'contract', component: ContractComponent },
      { path: 'medical-qs', component: MedicalQsComponent }
    ]
  }
];

@NgModule({
  declarations: [
    PatientsComponent,
    PatientRegistrationComponent,
    ConsulNotesComponent,
    ContractComponent,
    MedicalQsComponent,
    PatientUpdateComponent,
    PatientTreatmentsComponent,
    PaymentPlanComponent
  ],
  imports: [
    MatRadioModule,
    MatDialogModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PatientsModule { }
