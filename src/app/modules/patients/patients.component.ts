import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { PatientTreatmentsComponent } from './patient-treatments/patient-treatments.component';

import { PatientService } from './patient.service';
import { Patient } from '../../models/patient.model';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  dataSource = new MatTableDataSource<Patient>([]); // Use Patient model here
  displayedColumns: string[] = ['name', 'email', 'phone', 'nhs_number', 'treatments', 'actions'];
  showRegistration: boolean = false;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients().subscribe((patients: Patient[]) => {
      patients.forEach((patient, index) => {
        this.patientService.getTreatmentsForPatient(patient.patient_id).subscribe(treatments => {
          patients[index].treatments = treatments.map(t => t.treatment_name).join(', ');
        });
      });
      this.dataSource.data = patients;
    });
  }
  
  openRegistrationDialog(): void {
    const dialogRef = this.dialog.open(PatientRegistrationComponent, {
      width: '600px', // Adjust width as necessary
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Do something after you get the result, like refreshing the patients list
      this.getPatients();
    });
  }  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editPatient(patient_id: string) {
    if (patient_id) {
      this.router.navigate(['./update', patient_id], { relativeTo: this.route });
    }
  }

  deletePatient(id: string) {
    // Implement your delete logic here
  }

  prescribeTreatment(patient_id: string): void {
    if (patient_id) {
      const dialogRef = this.dialog.open(PatientTreatmentsComponent, {
        width: '600px', // Adjust width as necessary
        data: { patient_id: patient_id } // Pass the patient_id to the dialog
      });
  
      dialogRef.afterClosed().subscribe(result => {
        // Do something after the dialog is closed if needed
        // For instance, you can refresh the patients list or update any other UI elements
        this.getPatients();
      });
    } else {
      console.error('Patient ID is not defined!');
    }
  }
  
}
