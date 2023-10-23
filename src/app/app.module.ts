import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './pages/home/home.module';

import { PatientsComponent } from './pages/patients/patients.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { ConsultantsComponent } from './pages/consultants/consultants.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { TreatmentsComponent } from './pages/treatments/treatments.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { UsersComponent } from './pages/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientsComponent,
    DoctorsComponent,
    ConsultantsComponent,
    AppointmentsComponent,
    TreatmentsComponent,
    PaymentsComponent,
    UsersComponent
  ],
  imports: [
    HomeModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
