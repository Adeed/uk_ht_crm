import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Payment } from '../../../models/payment.model';  

@Component({
  selector: 'app-payment-create',
  templateUrl: './payment-create.component.html',
  styleUrls: ['./payment-create.component.scss']
})

export class PaymentCreateComponent implements OnInit {
  paymentForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      patientId: ['', Validators.required],
      amountPaid: ['', [Validators.required, Validators.min(0.01)]],
      paymentDate: [new Date(), Validators.required],
      paymentStatus: ['', Validators.required],
      paymentMethod: ['', Validators.required],
      cardType: [''],
      cardLastFour: ['']
    });
  }

  get paymentMethod() {
    return this.paymentForm.get('paymentMethod');
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const newPayment: Payment = this.paymentForm.value;

      // Logic to send data to backend...

      console.log(newPayment);
    }
  }
}