// src/app/modules/consultants/doctor-update/doctor-update.component.ts

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-update',
  templateUrl: './doctor-update.component.html',
  styleUrls: ['./doctor-update.component.scss']
})
export class DoctorUpdateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DoctorUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { doctor: any },
    private fb: FormBuilder,
    private doctorService: DoctorService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.data.doctor.first_name, Validators.required],
      lastName: [this.data.doctor.last_name, Validators.required],
      email: [this.data.doctor.email, [Validators.required, Validators.email]],
      phone: [this.data.doctor.phone]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedDoctor = {
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone
      };

      this.doctorService.updateDoctor(this.data.doctor.doctor_id, updatedDoctor).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
