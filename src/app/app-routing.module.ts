import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { UsersComponent} from './pages/users/users.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { ConsultantsComponent } from './pages/consultants/consultants.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { PaymentsComponent } from './pages/payments/payments.component';

  const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }