import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ElementId } from 'src/app/shared/models/element';

@Component({
  selector: 'app-profileinsignias',
  templateUrl: './profileinsignias.component.html',
  styleUrls: ['./profileinsignias.component.css']
})
export class ProfileinsigniasComponent implements OnInit {
  insignias: ElementId[] = [{ uid: 'as', name: 'nombre' }];
  constructor(private fsService: FirestoreService) { 
    this.fsService.getCollection('insignias').subscribe((data) => {
      this.insignias = data;
    });
  }

  ngOnInit(): void {
  }

}
