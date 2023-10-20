import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

@NgModule({
  imports:      [ FormsModule ],  // add FormsModule to your imports array
  declarations: [ ListComponent ],
  // ... other metadata
})

export class ListComponent implements OnInit {
  patients: Patient[] = [];
  searchTerm: string = '';

  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit() {
    this.loadPatients();
  }

  search(): void {
    this.patientService.searchPatients(this.searchTerm).subscribe(
      data => this.patients = data,
      error => console.error(error)
    );
  }
  
  loadPatients() {
    this.patientService.getPatients().subscribe(
      data => this.patients = data,
      error => console.error(error)
    );
  }

  viewPatient(id: string) {
    this.router.navigate([`/patient/detail/${id}`]);
  }

  editPatient(id: string) {
    this.router.navigate([`/patient/edit/${id}`]);
  }

  deletePatient(id: string) {
    this.patientService.deletePatient(id).subscribe(
      () => this.loadPatients(),
      error => console.error(error)
    );
  }
}