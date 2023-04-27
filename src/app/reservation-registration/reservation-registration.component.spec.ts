import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationRegistrationComponent } from './reservation-registration.component';

describe('ReservationRegistrationComponent', () => {
  let component: ReservationRegistrationComponent;
  let fixture: ComponentFixture<ReservationRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
