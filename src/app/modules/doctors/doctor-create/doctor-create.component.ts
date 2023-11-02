import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-doctor-create',
  templateUrl: './doctor-create.component.html',
  styleUrls: ['./doctor-create.component.scss']
})
export class DoctorCreateComponent {

  form: FormGroup;

  @Output() doctorAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private doctorService: DoctorService,
    public dialogRef: MatDialogRef<DoctorCreateComponent>
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      // Prepare data to match the server's expected format
      const doctorData = {
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone
      };

      // Use the doctorService to send the data to the server
      this.doctorService.createDoctor(doctorData)
        .subscribe(
          response => {
            console.log('Doctor added successfully:', response);
            this.doctorAdded.emit();
            this.dialogRef.close(); 
          },
          error => {
            console.error('There was an error:', error);
          }
        );
    }
  }
}
