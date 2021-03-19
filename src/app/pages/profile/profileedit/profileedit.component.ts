import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import firebase from 'firebase/app';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
  QueryFn,
} from '@angular/fire/firestore';
import { AfsService } from 'src/app/core/services/afs.service';


@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css'],
})
export class ProfileeditComponent implements OnInit {
 

  constructor(
    private auth: AuthService,
    private dbservice: FirestoreService,
    private fsService: AngularFirestore,
    private afsService: AfsService
  ) {}

 
  ngOnInit(): void {
    
  }

 
}
