import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ConsultantService } from '../consultant.service';

@Component({
  selector: 'app-consultant-update',
  templateUrl: './consultant-update.component.html',
  styleUrls: ['./consultant-update.component.scss']
})
export class ConsultantUpdateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ConsultantUpdateComponent>,
    private fb: FormBuilder,
    private consultantService: ConsultantService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [this.data.consultant.first_name, Validators.required],
      lastName: [this.data.consultant.last_name, Validators.required],
      email: [this.data.consultant.email, [Validators.required, Validators.email]],
      phone: [this.data.consultant.phone]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const consultantData = {
        first_name: this.form.value.firstName,
        last_name: this.form.value.lastName,
        email: this.form.value.email,
        phone: this.form.value.phone
      };

      this.consultantService.updateConsultant(this.data.consultant.consultant_id, consultantData)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }
}
