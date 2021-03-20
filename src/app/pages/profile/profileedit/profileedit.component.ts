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
import { UserModel } from 'src/app/shared/models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.css'],
})
export class ProfileeditComponent implements OnInit {
 
  @Input() user: UserModel = {} as UserModel;
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();

  @Output() editProfile: EventEmitter<UserModel> = new EventEmitter<UserModel>();
  @Output()
  uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  forma: FormGroup = this.fb.group({} as ElementId);
  constructor(private fb: FormBuilder, 
    private auth: AuthService,
    private dbservice: FirestoreService,
    private fsService: AngularFirestore,
    private afsService: AfsService
  ) {}

 
  ngOnInit(): void {
    this.forma = this.fb.group(this.user);
  }

  insertImage(profile: ElementId) {
    this.uploadImage.emit(profile);
  }
}
