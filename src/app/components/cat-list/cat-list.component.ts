import { Component, OnInit } from '@angular/core';
import { CatCollection } from 'src/app/firebase/collections/cat.collection';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit {

  constructor(private catCollection: CatCollection) { }

  ngOnInit(): void {
    this.catListAction();
  }

  protected catListAction() {
    this.catCollection.getCats().subscribe(
      this.catListActionOk.bind(this), 
      this.catListActionErr.bind(this)
    );
  }

  protected catListActionOk(response: any) {

  }

  protected catListActionErr(error: any) {
    
  }

}
