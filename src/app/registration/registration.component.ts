import { Component, ViewChild, ElementRef } from '@angular/core';
import { Database, ref, set, onValue, get } from '@angular/fire/database'
import { User } from 'src/models/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  @ViewChild('username') username?:ElementRef;
  @ViewChild('elo') elo?:ElementRef;

  rows: User[] = []
  constructor(public db: Database) {
    onValue(ref(this.db, 'users'), (snapshot) => {
      this.updateTable(snapshot);
    });
  }

  registerUser()
  {
    if (!this.rows.some((val) => { return val.username === this.username?.nativeElement.value; }))
    {
      set(ref(this.db, 'users/' + this.username?.nativeElement.value), {
        username: this.username?.nativeElement.value,
        elo: this.elo?.nativeElement.value
      });
    }
    else
    {
      alert("Username taken.");
    }
  }

  updateTable(snapshot: any) {
    this.rows = [];
    snapshot.forEach((childSnapshot: any) => {
      this.rows.push({ username: childSnapshot.val().username, elo: childSnapshot.val().elo });
    })
  }
}
