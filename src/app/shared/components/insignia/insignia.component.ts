import { Component, Input, OnInit } from '@angular/core';
import { Insignia } from '../../models/collections';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-insignia',
  templateUrl: './insignia.component.html',
  styleUrls: ['./insignia.component.css'],
})
export class InsigniaComponent implements OnInit {
  @Input() insignia!: Insignia;
  own = false;
  constructor(private authSerivce: AngularFireAuth) {}

  ngOnInit(): void {
    this.isOwn();
  }
  isOwn(): void {
    this.authSerivce.user.subscribe((user) => {
      console.log(user?.uid, 'jkngjknsdgjknHJKNJKNJKNJKN');
      const v = this.insignia.owners.find((i) => i === user?.uid);
      if (v) {
        this.own = true;
      }
    });
  }
}
