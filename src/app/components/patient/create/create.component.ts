import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  patientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      // ... other form controls
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.patientForm.valid) {
      this.patientService.createPatient(this.patientForm.value).subscribe(
        () => this.router.navigate(['/patient/list']),
        error => console.error(error)
      );
    }
  }
}
