import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ElementId } from 'src/app/shared/models/element';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() type: string = "";
  @Input() item: ElementId = {} as ElementId;
  @Input() area: string = "";
  @Input() isEditing = false;
  @Input() uploadImage = false;
  @Input() singleUpload = false;
  @Input() userProfile: ElementId = {} as ElementId;
    @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  title = 'ComfecoApp';
  caller = 'defaultArea';
  modalCaller = 'ejemplo';
 
  
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes modal: ", JSON.stringify(this.item))
    
    //this.isEditing = true;
  }

  ngOnInit(): void {
    //console.log("modal init: ", JSON.stringify(this.item))
  }
  insertItem(element: ElementId){
    //console.log("Profile: Recibiendo evento y data: "+JSON.stringify(element));
  }

}
