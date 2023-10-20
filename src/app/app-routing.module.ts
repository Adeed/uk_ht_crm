import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

import { ListComponent } from './components/patient/list/list.component';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { ConsultantsComponent } from './pages/consultants/consultants.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { PaymentsComponent } from './pages/payments/payments.component';

const routes: Routes = [
  { path: '**', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'patients', component: PatientsComponent },
  { path: 'patients', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'doctors', component: DoctorsComponent },
  { path: 'consultants', component: ConsultantsComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'treatments', component: TreatmentsComponent },
  { path: 'payments', component: PaymentsComponent },
  // any other routes go here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
