import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ElementId, Item } from 'src/app/shared/models/element';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() type: string = "";
  @Input() item: ElementId = {} as ElementId;
  @Input() newitem: string = {} as string;
  @Input() area: string = "";
  @Input() isEditing = false;
  @Input() isNewItem = false;
  @Input() uploadImage = false;
  @Input() singleUpload = false;
  @Input() userProfile: ElementId = {} as ElementId;
    @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  title = 'ComfecoApp';
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.title = this.isNewItem ? "Insertando ":"Editando";
    //console.log("changes modal: ", JSON.stringify(this.item))
    
    //this.isEditing = true;
  }

  ngOnInit(): void {
    this.title = this.isNewItem ? "Insertando ":"Editando";
    //console.log("modal init: ", JSON.stringify(this.item))
  }
 

}
