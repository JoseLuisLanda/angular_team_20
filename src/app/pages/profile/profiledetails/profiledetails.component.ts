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
import { Taller } from 'src/app/shared/models/collections';
import { UserModel } from '../../../shared/models/user.model';

type DocPredicate<T> = string | AngularFirestoreDocument<T>;
type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css'],
})
export class ProfiledetailsComponent implements OnInit, OnChanges {
  user: any;
  userProfile!: UserModel;
  @Input() type: string = '';
  @Input() item: any = {};
  @Input() child: boolean = false;
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();

  @Output() editProfile: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  @Output()
  uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();

  constructor(
    private auth: AuthService,
    private dbservice: FirestoreService,
    private fsService: AngularFirestore,
    private afsService: AfsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.userProfile = this.item;
    if(this.item?.images && this.item?.images[0])
    this.userProfile.photoURL = this.item?.images[0].url;
  }

  ngOnInit(): void {
    
    this.userProfile = this.item;
    if(this.item?.images && this.item?.images[0])
    this.userProfile.photoURL = this.item?.images[0].url;
  }

  editarPerfil(){
    
    
    this.userProfile.dateBirth = this.userProfile.dateBirth === undefined ?"19/02/1991":this.userProfile.dateBirth;
    this.userProfile.pais = this.userProfile.pais === undefined ?"":this.userProfile.pais;
    this.userProfile.genero = this.userProfile.genero === undefined ?"":this.userProfile.genero;
    this.userProfile.facebook = this.userProfile.facebook === undefined ?"":this.userProfile.facebook;
    this.userProfile.linkedin = this.userProfile.linkedin === undefined ?"":this.userProfile.linkedin;
    this.userProfile.twitter = this.userProfile.twitter === undefined ?"":this.userProfile.twitter;
    this.userProfile.github = this.userProfile.github === undefined ?"":this.userProfile.github;

    
    //console.log("editar profile");
    this.editProfile.emit(this.userProfile);
  }
  insertImage(profile: ElementId){
    this.uploadImage.emit(profile);
  }
 
}
