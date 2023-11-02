import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TreatmentCreateComponent } from '../treatment-create/treatment-create.component';
import { TreatmentReadComponent } from '../treatment-read/treatment-read.component';
import { TreatmentUpdateComponent } from '../treatment-update/treatment-update.component';
import { TreatmentDeleteComponent } from '../treatment-delete/treatment-delete.component';

import { Treatment } from 'src/app/models/treatment.model';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss']
})
export class TreatmentsComponent {

  @ViewChild(TreatmentReadComponent) treatmentReadComponent!: TreatmentReadComponent;

  constructor(public dialog: MatDialog) {}

  openCreateTreatmentDialog(): void {
    const dialogRef = this.dialog.open(TreatmentCreateComponent, {
      width: '700px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Call a method on TreatmentReadComponent to refresh the treatments list
        this.treatmentReadComponent.refreshTreatments();
      }
    });
  }

  openEditDialog(treatment: Treatment): void {
    const dialogRef = this.dialog.open(TreatmentUpdateComponent, {
      data: { treatment }
    });
  
    dialogRef.afterClosed().subscribe(updatedTreatment => {
      if (updatedTreatment) {
        this.treatmentReadComponent.refreshTreatments();
      }
    });
  }
  
  openDeleteDialog(treatment: Treatment): void {
    const dialogRef = this.dialog.open(TreatmentDeleteComponent, {
      data: { treatment }
    });
  
    dialogRef.afterClosed().subscribe(deletedTreatment => {
      if (deletedTreatment) {
        this.treatmentReadComponent.refreshTreatments();
      }
    });
  }
  

  onSearch(query: string): void {
    // Implement your search logic here, e.g., filter the treatments list
  }
}
