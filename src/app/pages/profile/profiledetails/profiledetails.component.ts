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
import { ElementId } from 'src/app/shared/models/element';

type DocPredicate<T> = string | AngularFirestoreDocument<T>;
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css'],
})
export class ProfiledetailsComponent implements OnInit, OnChanges {
  user: any;
  userProfile: any;
  @Input() type: string = '';
  @Input() item: ElementId = {} as ElementId;
  @Input() child: boolean = false;
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();

  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  
  constructor(private auth: AuthService, private dbservice: FirestoreService, 
    private fsService: AngularFirestore, private afsService : AfsService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.userProfile = this.item;
  }

  ngOnInit(): void {
    this.userProfile = this.item;
  }

  EditProfile(profile: ElementId){
    profile.dateBirth = profile.dateBirth === undefined ?"19/02/1991":profile.dateBirth;
    profile.pais = profile.pais === undefined ?"":profile.pais;
    profile.genero = profile.genero === undefined ?"":profile.genero;
    profile.facebook = profile.facebook === undefined ?"":profile.facebook;
    profile.linkedin = profile.linkedin === undefined ?"":profile.linkedin;
    profile.twitter = profile.twitter === undefined ?"":profile.twitter;
    profile.github = profile.github === undefined ?"":profile.github;

    this.editItem.emit(profile);
  }
  insertImage(profile: ElementId){
    this.uploadImage.emit(profile);
  }
  

}
