import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { FileModel } from '../../shared/models/file.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private itemsCollection!: AngularFirestoreCollection<any>;
  items!: Observable<any[]>;
  //private url = 'https://publicastv-a67df.firebaseio.com/';
  //private CARPETA_FILES = 'file';
  private newElements: any[] = [];
  public elementsId: any[] = [];
  private elementsString = '';

  constructor(private http: HttpClient, private db: AngularFirestore) {}

  public updateDoc(collection: string, uid: string, data: any) {
    // with ref = (collection,ref => ref.where('uid', '==', uid))
    this.db
      .collection(collection)
      .doc(uid)
      .set(data)
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch(function (error) {
        console.error('Error writing document: ', error);
      });
  }

  public getCollection(nameCollection: string, count: number = 5) {
    this.itemsCollection = this.db.collection<any>(nameCollection, (ref) =>
      ref.limit(count)
    );
    this.elementsString = '';
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    console.log('getting collection: ', nameCollection);
    return this.items;
  }

  public guardarFile(file: any, ruta: string) {
    this.db.collection(`/${ruta}`).add(file);
    this.getCollection(file);
  }
}
