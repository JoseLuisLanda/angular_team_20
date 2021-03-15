import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { ElementId } from 'src/app/shared/models/element';

@Component({
  selector: 'app-profilegrupos',
  templateUrl: './profilegrupos.component.html',
  styleUrls: ['./profilegrupos.component.css']
})
export class ProfilegruposComponent implements OnInit, OnChanges {
  grupos: ElementId[] = [];
  currentUser: ElementId = {} as ElementId;
  errormsg = "";
  @Input() user: ElementId = {} as ElementId;
  @Input() item: ElementId = {} as ElementId;
  @Input() area: string = "";
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() editItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() uploadImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() removeImage: EventEmitter<ElementId> = new EventEmitter<ElementId>();


  constructor(private fsService: FirestoreService) {
    this.fsService.getCollection('comunidades').subscribe((data) => {
      this.grupos = data as ElementId [];
    });
   }
  ngOnChanges(changes: SimpleChanges): void {
    this.currentUser = this.user;
  }

  ngOnInit(): void {
    this.currentUser = this.user;
  }

    AddEvent(event: ElementId){
      this.currentUser.grupos = this.currentUser.grupos ? this.currentUser.grupos : [];
      this.currentUser.url = `users/${this.currentUser.uid}`;
          
      var newEvent:ElementId = {
      uid : event.id!,
      title : event.title,
      description : event.description,
      url: `comunidades/${event.id}`
      };
  
      const index = this.currentUser.grupos!.findIndex(ev=>ev.uid === event.id);
      if(index === -1){
        this.currentUser.grupos?.push(newEvent);
        this.addItem.emit(this.currentUser);
      }
      else
      {
        this.errormsg = "Ya tienes agregado este evento en tu lista.";
      }
    }
  DeleteEvent(event: ElementId){
    this.currentUser.grupos?.splice(this.currentUser.grupos!.findIndex(ev=>ev.uid === event.id),1);
    this.addItem.emit(this.currentUser);
  }
  EditEvent(event: ElementId){
    event.url = `comunidades/${event.id}`;
    this.editItem.emit(event);
  }
  insertImage(event: ElementId){
    event.url = `comunidades/${event.id}`;
    this.uploadImage.emit(event);
  }
  deleteImage(event: ElementId, image: ElementId){
    //event.url = `comunidades/${event.id}`;
    //console.log("antes de eliminar:"+JSON.stringify(image))
    event.item = image;
    /*console.log("antes de eliminar:"+JSON.stringify(event))
    event.images?.splice(event.images?.indexOf(event.item!),1)
    console.log("despues de eliminar:"+JSON.stringify(event))*/
    this.removeImage.emit(event);
  }
}
