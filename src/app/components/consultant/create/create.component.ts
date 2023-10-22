// src/app/components/consultant/create/create.component.ts

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConsultantService } from '../../../services/consultant.service';

@Component({
  selector: 'app-create-consultant',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  consultantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private consultantService: ConsultantService
  ) {
    this.consultantForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['']
    });
  }

  ngOnInit(): void { }

  public onSubmit(): void {
    if (this.consultantForm.valid) {
      this.consultantService.createConsultant(this.consultantForm.value).subscribe(
        response => {
          console.log('Consultant created:', response);
          // Navigate back to the list or show a success message
        },
        error => console.error(error)
      );
    }
  }
}
