import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../models/patient.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  
  patient: Patient | undefined;

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadPatient(id);
      }
      // Handle else case where id is null
    });
  }

  loadPatient(id: string) {
    this.patientService.getPatient(id).subscribe(
      data => this.patient = data,
      error => console.error(error)
    );
  }
}
