import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulNotesComponent } from './consul-notes.component';

describe('ConsulNotesComponent', () => {
  let component: ConsulNotesComponent;
  let fixture: ComponentFixture<ConsulNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsulNotesComponent]
    });
    fixture = TestBed.createComponent(ConsulNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
