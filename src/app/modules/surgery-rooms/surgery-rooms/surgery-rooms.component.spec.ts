import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSlotsComponent } from './surgery-rooms.component';

describe('DefaultSlotsComponent', () => {
  let component: DefaultSlotsComponent;
  let fixture: ComponentFixture<DefaultSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultSlotsComponent]
    });
    fixture = TestBed.createComponent(DefaultSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
