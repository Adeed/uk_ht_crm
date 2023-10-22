import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Auth Guard
import { AuthGuard } from './guards/auth.guard';

// Authentication Components
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

// Layout Components
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';

// Patient Components
import { ListComponent as PatientListComponent } from './components/patient/list/list.component';
import { CreateComponent as PatientCreateComponent } from './components/patient/create/create.component';
import { DetailComponent as PatientDetailComponent } from './components/patient/detail/detail.component';
import { EditComponent as PatientEditComponent } from './components/patient/edit/edit.component';

// Doctor Components
import { ListComponent as DoctorListComponent } from './components/doctor/list/list.component';
import { CreateComponent as DoctorCreateComponent } from './components/doctor/create/create.component';
import { DetailComponent as DoctorDetailComponent } from './components/doctor/detail/detail.component';
import { EditComponent as DoctorEditComponent } from './components/doctor/edit/edit.component';

// Consultant Components
import { ListComponent as ConsultantListComponent } from './components/consultant/list/list.component';
import { CreateComponent as ConsultantCreateComponent } from './components/consultant/create/create.component';
import { DetailComponent as ConsultantDetailComponent } from './components/consultant/detail/detail.component';
import { EditComponent as ConsultantEditComponent } from './components/consultant/edit/edit.component';

// Appointment Components
import { ListComponent as AppointmentListComponent } from './components/appointment/list/list.component';
import { CreateComponent as AppointmentCreateComponent } from './components/appointment/create/create.component';
import { DetailComponent as AppointmentDetailComponent } from './components/appointment/detail/detail.component';
import { EditComponent as AppointmentEditComponent } from './components/appointment/edit/edit.component';

// Treatment Components
import { ListComponent as TreatmentListComponent } from './components/treatment/list/list.component';
import { CreateComponent as TreatmentCreateComponent } from './components/treatment/create/create.component';
import { DetailComponent as TreatmentDetailComponent } from './components/treatment/detail/detail.component';
import { EditComponent as TreatmentEditComponent } from './components/treatment/edit/edit.component';

// Payment Components
import { ListComponent as PaymentListComponent } from './components/payment/list/list.component';
import { CreateComponent as PaymentCreateComponent } from './components/payment/create/create.component';
import { DetailComponent as PaymentDetailComponent } from './components/payment/detail/detail.component';
import { EditComponent as PaymentEditComponent } from './components/payment/edit/edit.component';

// User Components
import { ListComponent as UserListComponent } from './components/user/list/list.component';
import { CreateComponent as UserCreateComponent } from './components/user/create/create.component';
import { DetailComponent as UserDetailComponent } from './components/user/detail/detail.component';
import { EditComponent as UserEditComponent } from './components/user/edit/edit.component';

// Pages
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent} from './pages/users/users.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { ConsultantsComponent } from './pages/consultants/consultants.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { PaymentsComponent } from './pages/payments/payments.component';

  const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  
  // Patient routes
  { 
    path: 'patients', 
    component: PatientsComponent,
    children: [
      { path: '', component: PatientListComponent },
      { path: 'create', component: PatientCreateComponent },
      { path: ':id', component: PatientDetailComponent },
      { path: ':id/edit', component: PatientEditComponent }
    ]
  },
  
  // Doctor routes
  { 
    path: 'doctors', 
    component: DoctorsComponent,
    children: [
      { path: '', component: DoctorListComponent },
      { path: 'create', component: DoctorCreateComponent },
      { path: ':id', component: DoctorDetailComponent },
      { path: ':id/edit', component: DoctorEditComponent }
    ]
  },
  
  // Consultant routes
  { 
    path: 'consultants', 
    component: ConsultantsComponent,
    children: [
      { path: '', component: ConsultantListComponent },
      { path: 'create', component: ConsultantCreateComponent },
      { path: ':id', component: ConsultantDetailComponent },
      { path: ':id/edit', component: ConsultantEditComponent }
    ]
  },

  // Appointment routes
  { 
    path: 'appointments', 
    component: AppointmentsComponent,
    children: [
      { path: '', component: AppointmentListComponent },
      { path: 'create', component: AppointmentCreateComponent },
      { path: ':id', component: AppointmentDetailComponent },
      { path: ':id/edit', component: AppointmentEditComponent }
    ]
  },

  // Treatment routes
  { 
    path: 'treatments', 
    component: TreatmentsComponent,
    children: [
      { path: '', component: TreatmentListComponent },
      { path: 'create', component: TreatmentCreateComponent },
      { path: ':id', component: TreatmentDetailComponent },
      { path: ':id/edit', component: TreatmentEditComponent }
    ]
  },

  // Payment routes
  { 
    path: 'payments', 
    component: PaymentsComponent,
    children: [
      { path: '', component: PaymentListComponent },
      { path: 'create', component: PaymentCreateComponent },
      { path: ':id', component: PaymentDetailComponent },
      { path: ':id/edit', component: PaymentEditComponent }
    ]
  },

  // User routes
  { 
    path: 'users', 
    component: UsersComponent,
    children: [
      { path: '', component: UserListComponent },
      { path: 'create', component: UserCreateComponent },
      { path: ':id', component: UserDetailComponent },
      { path: ':id/edit', component: UserEditComponent }
    ]
  },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }