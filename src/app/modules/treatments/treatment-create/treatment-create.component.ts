import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TreatmentService } from '../treatment.service';

import { Treatment } from 'src/app/models/treatment.model';
@Component({
  selector: 'app-treatment-create',
  templateUrl: './treatment-create.component.html',
  styleUrls: ['./treatment-create.component.scss']
})
export class TreatmentCreateComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private treatmentService: TreatmentService,
    public dialogRef: MatDialogRef<TreatmentCreateComponent>
  ) {
    this.form = this.fb.group({
      treatmentName: ['', Validators.required],
      description: [''],
      cost: ['', Validators.required]
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }


  submit(): void {
    if (this.form.valid) {
      const treatmentData: Treatment = {
        treatment_id: 0,  // This will be replaced by the backend
        treatment_name: this.form.value.treatmentName,
        description: this.form.value.description
      };
      // Adjust the payload
      const payload = {
        treatment_name: this.form.value.treatmentName,
        description: this.form.value.description,
        cost: this.form.value.cost
      };
      this.treatmentService.createTreatment(payload).subscribe(() => {
        this.dialogRef.close(true); // Close the dialog and indicate success
      });
    }
  }
}
