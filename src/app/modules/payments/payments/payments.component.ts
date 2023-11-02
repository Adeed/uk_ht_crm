import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Payment } from 'src/app/models/payment.model';
import { PaymentCreateComponent } from '../payment-create/payment-create.component';
import { PaymentDeleteComponent } from '../payment-delete/payment-delete.component';
import { PaymentUpdateComponent } from '../payment-update/payment-update.component';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  payments: Payment[] = [];
  displayedColumns: string[] = ['paymentId', 'patientId', 'amountPaid', 'paymentDate', 'paymentStatus', 'paymentMethod', 'cardType', 'cardLastFour', 'actions'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    // Fetch the payments data
    // Placeholder for now, replace with actual data fetching logic later
    this.payments = [
      // Sample data...
      
      // ... More sample payments as needed for testing
    ];
  }

  openCreateDialog(): void {
    this.dialog.open(PaymentCreateComponent);
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