// src/app/modules/consultants/doctor-delete/doctor-delete.component.ts

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-delete',
  templateUrl: './doctor-delete.component.html',
  styleUrls: ['./doctor-delete.component.scss']
})
export class DoctorDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<DoctorDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctor: any },
    private doctorService: DoctorService
  ) { }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onDelete(): void {
    this.doctorService.deleteDoctor(this.data.doctor.doctor_id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
