import { Component, OnInit } from '@angular/core';
import { Consultant } from '../../../models/consultant.model';  
import { MatDialog } from '@angular/material/dialog';
import { ConsultantService } from '../consultant.service';

import { ConsultantUpdateComponent } from '../consultant-update/consultant-update.component';
import { ConsultantDeleteComponent } from '../consultant-delete/consultant-delete.component';

@Component({
  selector: 'app-consultant-read',
  templateUrl: './consultant-read.component.html',
  styleUrls: ['./consultant-read.component.scss']
})
export class ConsultantReadComponent implements OnInit {

  // Define the consultants property as an array of Consultant
  consultants: Consultant[] = [];
  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'phone', 'actions'];

  constructor(
    public dialog: MatDialog,
    private consultantService: ConsultantService  // Inject the service here
  ) { }

  ngOnInit(): void {
    this.fetchConsultants();
  }

  fetchConsultants(): void {
    this.consultantService.getConsultants().subscribe(data => {
      this.consultants = data;
    });
  }

  openEditDialog(consultant: Consultant): void {
    const dialogRef = this.dialog.open(ConsultantUpdateComponent, {
      data: { consultant }
    });
    
    dialogRef.afterClosed().subscribe(() => {
      this.fetchConsultants();  // Refresh the list after updating
    });
  }

  openDeleteDialog(consultant: Consultant): void {
    const dialogRef = this.dialog.open(ConsultantDeleteComponent, {
      data: { consultant }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchConsultants();  // Refresh the list after deletion
    });
  }

}
