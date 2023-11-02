import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConsultantCreateComponent } from '../consultant-create/consultant-create.component';
import { ConsultantReadComponent } from '../consultant-read/consultant-read.component';


@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.scss']
})
export class ConsultantsComponent {

  @ViewChild(ConsultantReadComponent) consultantReadComponent!: ConsultantReadComponent;

  constructor(public dialog: MatDialog) {}

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ConsultantCreateComponent);
    dialogRef.componentInstance.consultantAdded.subscribe(() => {
      // Call fetchDoctors of DoctorReadComponent
      this.consultantReadComponent.fetchConsultants();
    });
  }

  onSearch(query: string): void {
    // Implement your search logic here, e.g., filter the consultants list
  }

}
