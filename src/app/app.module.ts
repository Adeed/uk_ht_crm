import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListModule as PatientListModule} from './components/patient/list/list.module';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { ConsultantsComponent } from './pages/consultants/consultants.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { UsersComponent } from './pages/users/users.component';

import { CreateComponent } from './components/doctor/create/create.component';
import { DetailComponent } from './components/doctor/detail/detail.component';
import { EditComponent } from './components/doctor/edit/edit.component';
import { ListComponent } from './components/doctor/list/list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { FooterComponent } from './components/layout/footer/footer.component';


import { AuthenticationService } from './services/authentication.service';
import { PatientService } from './services/patient.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PatientsComponent,
    DoctorsComponent,
    ConsultantsComponent,
    AppointmentsComponent,
    TreatmentsComponent,
    PaymentsComponent,
    CreateComponent,
    DetailComponent,
    EditComponent,
    ListComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    UsersComponent
  ],
  imports: [
    PatientListModule,

    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService,PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
