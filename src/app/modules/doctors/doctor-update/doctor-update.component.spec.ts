import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorUpdateComponent } from './doctor-update.component';

describe('DoctorUpdateComponent', () => {
  let component: DoctorUpdateComponent;
  let fixture: ComponentFixture<DoctorUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DoctorUpdateComponent]
    });
    fixture = TestBed.createComponent(DoctorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
