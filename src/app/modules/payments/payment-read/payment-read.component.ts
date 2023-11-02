import { Component, OnInit } from '@angular/core';
import { Payment } from '../../../models/payment.model';
import { MatDialog } from '@angular/material/dialog';

import { PaymentUpdateComponent } from '../payment-update/payment-update.component';
import { PaymentDeleteComponent } from '../payment-delete/payment-delete.component';

@Component({
  selector: 'app-payment-read',
  templateUrl: './payment-read.component.html',
  styleUrls: ['./payment-read.component.scss']
})
export class PaymentReadComponent implements OnInit {

  payments: Payment[] = [];
  displayedColumns: string[] = ['paymentId', 'patientId', 'amountPaid', 'paymentDate', 'paymentStatus', 'paymentMethod', 'actions'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  openEditDialog(payment: Payment): void {
    this.dialog.open(PaymentUpdateComponent, {
      data: { payment }
    });
  }

  openDeleteDialog(payment: Payment): void {
    this.dialog.open(PaymentDeleteComponent, {
      data: { payment }
    });
  }
}
