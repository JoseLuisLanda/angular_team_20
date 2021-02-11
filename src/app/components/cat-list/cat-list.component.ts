import { Component, OnInit } from '@angular/core';
import { CatCollection } from 'src/app/firebase/collections/cat.collection';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})
export class CatListComponent implements OnInit {

  public cats: any;

  constructor(private catCollection: CatCollection) { }

  ngOnInit(): void {
    this.setCats([]);
    this.catListAction();
  }

  protected setCats(cats: any) {
    this.cats = cats;
  }

  protected catListAction() {
    this.catCollection.getCats().subscribe(
      this.catListActionOk.bind(this), 
      this.catListActionErr.bind(this)
    );
  }

  protected catListActionOk(response: any) {
    let data = response.map((catData:any) => {
      return {
        id: catData.payload.doc.id,
        ...catData.payload.doc.data()
      }
    });
   this.setCats(data);
  }

  protected catListActionErr(error: any) {
    console.log('error',error);
  }

}
