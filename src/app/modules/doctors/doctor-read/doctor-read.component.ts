// src/app/modules/consultants/consultant-read/consultant-read.component.ts

import { Component, OnInit } from '@angular/core';
import { Doctor } from '../../../models/doctor.model';
import { MatDialog } from '@angular/material/dialog';

import { DoctorService } from '../doctor.service';

import { DoctorUpdateComponent } from '../doctor-update/doctor-update.component';
import { DoctorDeleteComponent } from '../doctor-delete/doctor-delete.component';

@Component({
  selector: 'app-doctor-read',
  templateUrl: './doctor-read.component.html',
  styleUrls: ['./doctor-read.component.scss']
})
export class DoctorReadComponent implements OnInit {

  // Define the doctors property as an array of Consultant
  doctors: Doctor[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'actions'];  // Specify the order of columns

  constructor(
    public dialog: MatDialog,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.fetchDoctors();
  }
  // Add this to the openEditDialog method:

  openEditDialog(doctor: Doctor): void {
    const dialogRef = this.dialog.open(DoctorUpdateComponent, {
      data: { doctor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchDoctors();  // Refresh the list if the doctor was updated
      }
    });
  }

  openDeleteDialog(doctor: Doctor): void {
    const dialogRef = this.dialog.open(DoctorDeleteComponent, {
      data: { doctor }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchDoctors();  // Refresh the list if the doctor was deleted
      }
    });
  }
  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

}
