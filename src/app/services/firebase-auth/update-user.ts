import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { UserModel } from "src/app/models/user.model";

@Injectable({providedIn: 'root'})
export class UpdateUser {
  constructor(private db: AngularFirestore) {}

  handle(user: any) {
    const userRef: AngularFirestoreDocument<UserModel> = this.db.doc(`users/${user.uid}`);
    const data: UserModel = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL ? user.photoURL : "assets/photo",
      refreshToken: user.refreshToken ? user.refreshToken : "",
      organization: user.email!.split("@")[1]
    };

    userRef.set(data, { merge: true });

    return Promise.resolve(data);
  }
}