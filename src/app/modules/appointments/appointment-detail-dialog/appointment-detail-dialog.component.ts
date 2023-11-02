import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
   selector: 'app-appointment-detail-dialog',
   templateUrl: './appointment-detail-dialog.component.html'
})
export class AppointmentDetailDialogComponent {
   constructor(
      public dialogRef: MatDialogRef<AppointmentDetailDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
      this.dialogRef.close();
    }
}
