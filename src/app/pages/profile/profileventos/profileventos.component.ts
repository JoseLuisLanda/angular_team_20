import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ElementId, Item } from 'src/app/shared/models/element';
import { Insignia } from '../../../shared/models/collections';

@Component({
  selector: 'app-profileventos',
  templateUrl: './profileventos.component.html',
  styleUrls: ['./profileventos.component.css'],
})
export class ProfileventosComponent implements OnInit, OnChanges {
  talleres: ElementId[] = [];
  currentUser: ElementId = {} as ElementId;
  errormsg = '';
  @Input() user: ElementId = {} as ElementId;
  @Input() item: ElementId = {} as ElementId;
  @Input() area = '';
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() removeImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() newItem: EventEmitter<string> = new EventEmitter<string>();
  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('talleres').subscribe((data) => {
      this.talleres = data as ElementId [];
      //console.log("TALLERES: "+JSON.stringify(this.talleres))
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = this.user;
  }
  ngOnInit(): void {
    this.currentUser = this.user;
  }
  AddEvent(event: ElementId) {
    this.currentUser.talleres = this.currentUser.talleres
      ? this.currentUser.talleres
      : [];
    this.currentUser.url = `users/${this.currentUser.uid}`;

    var newEvent: ElementId = {
      uid: event.id!,
      title: event.title,
      description: event.description,
      url: `talleres/${event.id}`,
    };

    const index = this.currentUser.talleres!.findIndex(
      (ev) => ev.uid === event.id
    );
    if (index === -1) {
      this.currentUser.talleres?.push(newEvent);
      this.addItem.emit(this.currentUser);
      this.fsService
        .getDoc('insignias', 'TaOJdHwQdbFBtqYzg2xz')
        .subscribe((v: Insignia) => {
          const f = v.owners.find((id) => id === this.currentUser.uid);
          if (!f) {
            v.owners.push(this.currentUser.uid);
            this.fsService.updateDoc('insignias', 'TaOJdHwQdbFBtqYzg2xz', v);
          }
        });
    } else {
      this.errormsg = 'Ya tienes agregado este evento en tu lista.';
    }
  }
  DeleteEvent(event: ElementId) {
    this.currentUser.talleres?.splice(
      this.currentUser.talleres!.findIndex((ev) => ev.uid === event.id),
      1
    );
    this.addItem.emit(this.currentUser);
  }
  EditEvent(event: ElementId) {
    //agrega un nuevo registro si no tiene un id que editar
    event.url = `talleres/${event.id}`;
    this.editItem.emit(event);
  }
  newEvent() {
    this.newItem.emit("taller");
  }
  insertImage(event: ElementId){
    event.url = `talleres/${event.id}`;
    this.uploadImage.emit(event);
  }
  deleteImage(event: ElementId, image: ElementId){
    //event.url = `comunidades/${event.id}`;
    event.item = image;
    this.removeImage.emit(event);
  }
}
