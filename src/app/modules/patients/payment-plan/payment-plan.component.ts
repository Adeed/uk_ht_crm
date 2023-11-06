import { Component, Inject, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-payment-plan',
  templateUrl: './payment-plan.component.html',
  styleUrls: ['./payment-plan.component.scss']
})
export class PaymentPlanComponent implements OnInit {
  
  constructor(
   
  ) {
  
  }

  ngOnInit(): void {
    
  }

}
