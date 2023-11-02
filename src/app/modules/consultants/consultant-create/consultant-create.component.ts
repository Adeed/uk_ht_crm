// src/app/modules/consultants/consultant-create/consultant-create.component.ts

import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ConsultantService } from '../consultant.service';

@Component({
  selector: 'app-consultant-create',
  templateUrl: './consultant-create.component.html',
  styleUrls: ['./consultant-create.component.scss']
})
export class ConsultantCreateComponent {

  form: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['']
  });



  @Output() consultantAdded = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConsultantCreateComponent>,
    private consultantService: ConsultantService
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.form.valid) {
      const consultantData = {
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone
      };

      this.consultantService.createConsultant(consultantData)
        .subscribe(() => {
          this.consultantAdded.emit();
          this.dialogRef.close();
        });
    }
  }
}
