import { Component, ViewChild, ElementRef } from '@angular/core';
import { Database, ref, onValue, get, set } from '@angular/fire/database';
import { User } from 'src/models/user';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
  @ViewChild('location', { static: false }) location?: ElementRef;
  @ViewChild('playerA', { static: false }) playerA?: ElementRef;
  @ViewChild('playerB', { static: false }) playerB?: ElementRef;
  @ViewChild('time', { static: false }) time?: ElementRef;
  playersA: User[] = []
  playersB: User[] = []
  rows: string[] = []
  selectedHour: string = '';

  constructor(public db: Database) {
    onValue(ref(this.db, 'users'), (snapshot) => {
      this.updateOptions(snapshot);
    });
    onValue(ref(this.db, 'matches'), (_snapshot) => {
      this.updateTable();
    })
  }

  updateOptions(snapshot: any) {
    this.playersA = [];
    this.playersB = [];
    snapshot.forEach((childSnapshot: any) => {
        this.playersA.push(childSnapshot.key);
        this.playersB.push(childSnapshot.key);
    })
  }

  onSubmit() {
    if (this.time?.nativeElement.value == '')
    {
      alert("Select a date.")
      return;
    }
    if (this.playerA?.nativeElement.value == this.playerB?.nativeElement.value)
    {
      alert("Players need to be different.")
      return;
    }
    if (this.selectedHour == '')
    {
      alert("Select a time.")
      return;
    }

    set(ref(this.db, 'matches/' + this.location?.nativeElement.value + '/' + this.time?.nativeElement.value + '/' + this.selectedHour), {
      playerA: this.playerA?.nativeElement.value,
      playerB: this.playerB?.nativeElement.value
    });
  }

  updateTable() {
    this.rows = [];
    if (this.time?.nativeElement.value == '')
    {
      return;
    }
    for (let i = 10; i <= 20; ++i)
    {
      get(ref(this.db, 'matches/' + this.location?.nativeElement.value + '/' + this.time?.nativeElement.value + '/' + i + ":00")).then((snapshot: any) => {
        if (!snapshot.exists())
        {
          this.rows.push(i.toString() + ":00");
        }
      })
    }
  }

  onChange(e: any) {
    this.selectedHour = e.target.value;
  }
}
