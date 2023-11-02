import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TreatmentService } from '../treatment.service';

import { Treatment } from '../../../models/treatment.model';
import { TreatmentUpdateComponent } from '../treatment-update/treatment-update.component';
import { TreatmentDeleteComponent } from '../treatment-delete/treatment-delete.component';

@Component({
  selector: 'app-treatment-read',
  templateUrl: './treatment-read.component.html',
  styleUrls: ['./treatment-read.component.scss']
})
export class TreatmentReadComponent implements OnInit {

  treatments: Treatment[] = [];
  displayedColumns: string[] = ['treatment_name', 'description', 'cost', 'actions'];

  constructor(public dialog: MatDialog, private treatmentService: TreatmentService) { }

  ngOnInit(): void {
    this.treatmentService.getTreatments().subscribe(data => {
      this.treatments = data;
    });
  }

  openEditDialog(treatment: Treatment): void {
    this.dialog.open(TreatmentUpdateComponent, {
      data: { treatment }
    });
  }

  openDeleteDialog(treatment: Treatment): void {
    this.dialog.open(TreatmentDeleteComponent, {
      data: { treatment }
    });
  }

  refreshTreatments(): void {
    this.treatmentService.getTreatments().subscribe(data => {
      this.treatments = data;
    });
  }

}
