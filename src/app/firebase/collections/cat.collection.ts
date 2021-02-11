import { Injectable } from "@angular/core";

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({providedIn: 'root'})
export class CatCollection {
  private static COLLECTION_KEY = 'cats';
  constructor(private firestore: AngularFirestore) {

  }

  public createCat(data: {nombre: string, url: string}) {
    return this.firestore.collection(CatCollection.COLLECTION_KEY).add(data);
  }

  public getCat(documentId: string) {
    return this.firestore.collection(CatCollection.COLLECTION_KEY).doc(documentId).snapshotChanges();
  }

  public getCats() {
    return this.firestore.collection(CatCollection.COLLECTION_KEY).snapshotChanges();
  }

  public updateCat(documentId: string, data: any) {
    return this.firestore.collection(CatCollection.COLLECTION_KEY).doc(documentId).set(data);
  }

}