import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../../../services/patient.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Patient } from '../../../models/patient.model';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  patientForm: FormGroup;
  patient: Patient | undefined;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.patientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      // ... other form controls
    });
  }

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
      data => {
        this.patient = data;
        this.patientForm.patchValue(data);
      },
      error => console.error(error)
    );
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const updatedPatient: Patient = {
        ...this.patient,
        ...this.patientForm.value
      };
      this.patientService.updatePatient(updatedPatient).subscribe(
        () => this.router.navigate(['/patient/list']),
        error => console.error(error)
      );
    }
  }
}
