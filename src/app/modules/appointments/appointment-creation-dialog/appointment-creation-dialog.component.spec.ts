import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCreationDialogComponent } from './appointment-creation-dialog.component';

describe('AppointmentCreationDialogComponent', () => {
  let component: AppointmentCreationDialogComponent;
  let fixture: ComponentFixture<AppointmentCreationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointmentCreationDialogComponent]
    });
    fixture = TestBed.createComponent(AppointmentCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
