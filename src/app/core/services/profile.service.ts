import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';
import { AuthService } from './auth.service';
import firebase from 'firebase/app';

@Injectable({
    providedIn: 'root',
  })

  export class ProfileService {
    private itemsCollection!: AngularFirestoreCollection<any>;
    items!: Observable<any[]>;
    user!: UserModel |null;
    //private url = 'https://publicastv-a67df.firebaseio.com/';
    //private CARPETA_FILES = 'file';
    private newElements: any[] = [];
    public elementsId: any[] = [];
    private elementsString = '';
  
    constructor(private http: HttpClient, private db: AngularFirestore, private auth:AuthService ) {
      this.auth.afAuth.user.subscribe((v: any) => {
        if (v) {
          this.user = v;
        }
      });
    }
    public updateDoc(collection: string, uid: string, data: any): void {
      // with ref = (collection,ref => ref.where('uid', '==', uid))
      this.db
        .collection(collection)
        .doc(uid)
        .update(data)
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
    nuevaActvidad(description: string): void {
      if(this.user) {
        if(!this.user.actividadReciente) {
          this.user.actividadReciente = [];
        }
        this.user.actividadReciente.push({ date: new Date().toISOString(), description });
        this.updateDoc('users', this.user.uid,  { actividadReciente: this.user.actividadReciente });
      }
    }
  }
  