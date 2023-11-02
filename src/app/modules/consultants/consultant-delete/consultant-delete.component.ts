import { Component, Inject } from '@angular/core';
import { ConsultantService } from '../consultant.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-consultant-delete',
  templateUrl: './consultant-delete.component.html',
  styleUrls: ['./consultant-delete.component.scss']
})
export class ConsultantDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<ConsultantDeleteComponent>,

    private consultantService: ConsultantService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  deleteConsultant(): void {
    this.consultantService.deleteConsultant(this.data.consultant.consultant_id)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
  }
}
