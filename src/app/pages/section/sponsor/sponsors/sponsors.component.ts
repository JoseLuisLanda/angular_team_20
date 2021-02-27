import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ElementId } from 'src/app/models/element';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit {
  sponsors:ElementId[] = [{uid:'as',name:'nombre'}];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection("sponsors").subscribe(data => {
     
      this.sponsors = data;
      console.log('getting sponsors: ', data);
    });
   }

  ngOnInit(): void {
  
  }


}
