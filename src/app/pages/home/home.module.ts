// src/app/pages/home/home.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { PatientModule } from 'src/app/components/patient/patient.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    PatientModule,
    CommonModule,
    MatGridListModule,
    MatCardModule
  ]
})
export class HomeModule { }
