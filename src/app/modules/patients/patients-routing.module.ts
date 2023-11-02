import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientsComponent } from './patients.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { ConsulNotesComponent } from './consul-notes/consul-notes.component';
import { ContractComponent } from './contract/contract.component';
import { MedicalQsComponent } from './medical-qs/medical-qs.component';
import { PatientUpdateComponent } from './patient-update/patient-update.component';

const routes: Routes = [
  {
    path: '', component: PatientsComponent, children: [
      { path: 'update', component: PatientUpdateComponent },
    ]
  },
  { path: 'patient-registration', component: PatientRegistrationComponent },
  { path: 'consul-notes', component: ConsulNotesComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'medical-qs', component: MedicalQsComponent },
  // other routes...
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
