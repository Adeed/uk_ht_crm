import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PatientService } from '../patient.service';
import { TreatmentService } from '../../treatments/treatment.service';

@Component({
  selector: 'app-patient-treatments',
  templateUrl: './patient-treatments.component.html',
  styleUrls: ['./patient-treatments.component.scss']
})

export class PatientTreatmentsComponent implements OnInit {

  selectedPatientId!: number;
  availableTreatments: any[] = [];
  treatmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private treatmentService: TreatmentService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.selectedPatientId = this.data.patient_id;
    this.loadAvailableTreatments();
    this.initForm();
  }

  initForm(): void {
    this.treatmentForm = this.fb.group({
      treatment_name: ['', Validators.required],
      no_of_grafts: ['', Validators.required],
      area_of_transplant: ['', Validators.required],
      sessions_agreed: ['', Validators.required]
    });
  }

  loadAvailableTreatments(): void {
    // Assuming you have a method to get all treatments
    this.treatmentService.getTreatments().subscribe(treatments => {
      this.availableTreatments = treatments;
    });
  }

  addTreatment(): void {
    const treatmentData = this.treatmentForm.value;
    const combinedData = {
      ...treatmentData,
      patient_id: this.selectedPatientId
    };
    console.log('Sending combined data:', combinedData);

    this.patientService.addTreatmentForPatient(combinedData).subscribe(response => {
      console.log('Success:', response);
    }, error => {
      console.error('Error adding treatment:', error);
    });
  }

}