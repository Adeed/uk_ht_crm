import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
    children: [
      { path: 'appointments', loadChildren: () => import('./modules/appointments/appointments.module').then(m => m.AppointmentsModule) },
      { path: 'patients', loadChildren: () => import('./modules/patients/patients.module').then(m => m.PatientsModule) },
      { path: 'doctors', loadChildren: () => import('./modules/doctors/doctors.module').then(m => m.DoctorsModule) },
      { path: 'consultants', loadChildren: () => import('./modules/consultants/consultants.module').then(m => m.ConsultantsModule) },
      { path: 'treatments', loadChildren: () => import('./modules/treatments/treatments.module').then(m => m.TreatmentsModule) },
      { path: 'payments', loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule) },
      { path: 'users', loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule) },
      { path: 'surgery-rooms', loadChildren: () => import('./modules/surgery-rooms/surgery-rooms.module').then(m => m.DefaultSlotsModule) },

    ]
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }