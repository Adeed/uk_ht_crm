import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TreatmentService } from '../treatment.service';
import { Treatment } from '../../../models/treatment.model';

@Component({
  selector: 'app-treatment-delete',
  templateUrl: './treatment-delete.component.html',
  styleUrls: ['./treatment-delete.component.scss']
})
export class TreatmentDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<TreatmentDeleteComponent>,
    private treatmentService: TreatmentService,
    @Inject(MAT_DIALOG_DATA) public data: { treatment: Treatment }
  ) {}

  deleteTreatment(): void {
    this.treatmentService.deleteTreatment(this.data.treatment.treatment_id)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
