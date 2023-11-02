import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentReadComponent } from './treatment-read.component';

describe('TreatmentReadComponent', () => {
  let component: TreatmentReadComponent;
  let fixture: ComponentFixture<TreatmentReadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TreatmentReadComponent]
    });
    fixture = TestBed.createComponent(TreatmentReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
