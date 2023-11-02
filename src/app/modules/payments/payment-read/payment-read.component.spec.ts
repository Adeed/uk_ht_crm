import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentReadComponent } from './payment-read.component';

describe('PaymentReadComponent', () => {
  let component: PaymentReadComponent;
  let fixture: ComponentFixture<PaymentReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentReadComponent]
    });
    fixture = TestBed.createComponent(PaymentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
