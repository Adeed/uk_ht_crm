import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DoctorCreateComponent } from '../doctor-create/doctor-create.component';
import { DoctorReadComponent } from '../doctor-read/doctor-read.component';  // Adjust the path

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  
  @ViewChild(DoctorReadComponent) doctorReadComponent!: DoctorReadComponent;

  constructor(public dialog: MatDialog) {}

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DoctorCreateComponent);
    dialogRef.componentInstance.doctorAdded.subscribe(() => {
      // Call fetchDoctors of DoctorReadComponent
      this.doctorReadComponent.fetchDoctors();
    });
  }

  onSearch(query: string): void {
    // Implement your search logic here, e.g., filter the consultants list
  }

}
