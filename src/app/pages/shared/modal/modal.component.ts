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
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  title = 'ComfecoApp';
  templateElement = {} as ElementId;
  caller = 'defaultArea';
  modalCaller = 'ejemplo';
  isEditing = false;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("changes modal: ", JSON.stringify(this.item))
    this.templateElement = this.item;
    this.isEditing = true;
  }

  ngOnInit(): void {
    //console.log("modal init: ", JSON.stringify(this.item))
  }
  insertItem(element: ElementId){
    //console.log("Profile: Recibiendo evento y data: "+JSON.stringify(element));
  }

}
