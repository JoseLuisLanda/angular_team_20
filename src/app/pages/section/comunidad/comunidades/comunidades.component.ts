import { Component, OnInit } from '@angular/core';
import { ElementId } from 'src/app/models/element';
import { FirestoreService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-comunidades',
  templateUrl: './comunidades.component.html',
  styleUrls: ['./comunidades.component.css']
})
export class ComunidadesComponent implements OnInit {
  comunidades:ElementId[] = [{uid:'as',name:'nombre'}];
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection("comunidades").subscribe(data => {
     
      this.comunidades = data;
      console.log('getting sponsors: ', data);
    });
   }


  ngOnInit(): void {
  }

}
