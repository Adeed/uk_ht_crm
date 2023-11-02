import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from 'src/app/material.module';
import { MatDialogModule } from '@angular/material/dialog';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';

import { Consultant } from '../../models/consultant.model';
import { Doctor } from '../../models/doctor.model';
import { Patient } from '../../models/patient.model';
import { Treatment } from '../../models/treatment.model';

import { AppointmentService } from './appointment.service';

import { AppointmentSchedulerComponent } from './appointment-scheduler/appointment-scheduler.component';
import { AppointmentDetailDialogComponent } from './appointment-detail-dialog/appointment-detail-dialog.component';
import { AppointmentCreationDialogComponent } from './appointment-creation-dialog/appointment-creation-dialog.component';

const routes: Routes = [
  { path: '', component: AppointmentSchedulerComponent, children: [ ]}
];


@NgModule({
  declarations: [
    AppointmentSchedulerComponent,
    AppointmentDetailDialogComponent,
    AppointmentCreationDialogComponent,
  ],
  imports: [
    MatDialogModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
    RouterModule.forChild(routes)
  ],
  
})
export class AppointmentsModule { }
