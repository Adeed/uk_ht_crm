import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { SidebarComponent } from './components/layout/sidebar/sidebar.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { ConsultantsComponent } from './pages/consultants/consultants.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { PaymentsComponent } from './pages/payments/payments.component';


import { AuthenticationService } from './services/authentication.service';
import { ListComponent } from './components/patient/list/list.component';
import { DetailComponent } from './components/patient/detail/detail.component';
import { EditComponent } from './components/patient/edit/edit.component';
import { CreateComponent } from './components/patient/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    PatientsComponent,
    DoctorsComponent,
    ConsultantsComponent,
    AppointmentsComponent,
    TreatmentsComponent,
    PaymentsComponent,
    ListComponent,
    DetailComponent,
    EditComponent,
    CreateComponent
  ],
  imports: [
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
