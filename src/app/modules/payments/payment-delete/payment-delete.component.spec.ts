import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentDeleteComponent } from './payment-delete.component';

describe('PaymentDeleteComponent', () => {
  let component: PaymentDeleteComponent;
  let fixture: ComponentFixture<PaymentDeleteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentDeleteComponent]
    });
    fixture = TestBed.createComponent(PaymentDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
