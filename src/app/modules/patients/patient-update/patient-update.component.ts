import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-update',
  templateUrl: './patient-update.component.html',
  styleUrls: ['./patient-update.component.scss']
})
export class PatientUpdateComponent implements OnInit {
  updateForm!: FormGroup;
  patientId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService
  ) { }

  async ngOnInit(): Promise<void> {
    // Getting the patientId from the parent route
    const patientIdStr = this.route.parent?.snapshot.paramMap.get('id') || '';
    this.patientId = parseInt(patientIdStr, 10);
    if (!this.patientId) {
      console.error('Patient ID not provided');
      // Handle this scenario as needed, perhaps by redirecting the user or showing an error message
      return;
    }

    // Initialize form
    this.updateForm = this.fb.group({
      // Define your form controls here...
      // Example:
      // firstName: ['', Validators.required],
      // lastName: ['', Validators.required]
      // ...
    });

    try {
      const patientData = await this.patientService.getPatientById(this.patientId).toPromise();
      if (!patientData) {
        console.error('Patient data not found for ID:', this.patientId);
        // Handle this scenario as needed
        return;
      }
      const patient: Patient = patientData;

      // Populate your form with the patient data...
      this.updateForm.patchValue(patient);
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.updateForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    try {
      await this.patientService.updatePatient(this.patientId, this.updateForm.value).toPromise();
      // Handle successful update, like redirecting the user or showing a success message
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  }
}
