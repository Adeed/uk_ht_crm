export interface Payment {
  payment_id?: number;
  patient_id?: number;
  amount_paid: number;
  payment_date: Date | string;
  payment_status: 'Pending' | 'Completed';
  payment_method: 'Cash' | 'Card' | 'Bank Transfer' | 'Credit';
  card_type?: string;
  card_last_four?: string;
  is_refundable: boolean;
}
