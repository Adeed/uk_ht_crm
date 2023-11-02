import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';

import { PatientService } from './patient.service';  // Import the service

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'email', 'phone', 'nhs_number', 'actions'];
  showRegistration: boolean = false;

  constructor(private patientService: PatientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPatients(); // Fetch patients on initialization
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe(patients => {
      this.dataSource.data = patients;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPatient(id: string) {
    // Ensure that the ID is not undefined before navigating
    if (id) {
      this.router.navigate(['./update', id], { relativeTo: this.route });
    }
  }
  

  deletePatient(id: string) {
    // Implement your delete logic here
  }

}
