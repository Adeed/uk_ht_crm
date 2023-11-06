
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TreatmentService } from '../treatment.service';
import { Treatment } from '../../../models/treatment.model';

@Component({
  selector: 'app-treatment-update',
  templateUrl: './treatment-update.component.html',
  styleUrls: ['./treatment-update.component.scss']
})
export class TreatmentUpdateComponent implements OnInit {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TreatmentUpdateComponent>,
    private fb: FormBuilder,
    private treatmentService: TreatmentService,
    @Inject(MAT_DIALOG_DATA) public data: { treatment: Treatment }
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      treatmentName: [this.data.treatment.treatment_name, Validators.required],
      description: [this.data.treatment.description]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const updatedTreatmentData = {
        treatment_name: this.form.value.treatmentName,
        description: this.form.value.description,
        cost: this.form.value.cost
      };

      this.treatmentService.updateTreatment(this.data.treatment.treatment_id, updatedTreatmentData)
        .subscribe(() => {
          this.dialogRef.close(true);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
