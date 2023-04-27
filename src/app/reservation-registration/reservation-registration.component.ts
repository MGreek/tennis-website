import { Component } from '@angular/core';

@Component({
  selector: 'app-reservation-registration',
  templateUrl: './reservation-registration.component.html',
  styleUrls: ['./reservation-registration.component.css']
})
export class ReservationRegistrationComponent {
  showReservationMenu = true;
  showRegistrationMenu = false;

  onReservationMenuClick() {
    this.showReservationMenu = true;
    this.showRegistrationMenu = false;
  }

  onRegistrationMenuClick() {
    this.showReservationMenu = false;
    this.showRegistrationMenu = true;
  }
}
