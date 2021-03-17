import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FileModel } from 'src/app/shared/models/file.model';
import { ElementId, ElementModel } from 'src/app/shared/models/element';
import { FileService } from 'src/app/core/services/file.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent implements OnInit , OnChanges{
  estaSobreElemento = false;
  archivos: FileModel[] = [];
  imagenes : ElementId[] = [];
  element = new ElementModel();
  @Input() caller: string = "";
  @Input() path: string = "files";
  @Input() item: ElementId = {} as ElementId;
  @Input() singleUpload = false;
  @Output() addImage: EventEmitter<ElementId[]> ;
  constructor(private fileSvc: FileService) { 
    this.addImage = new EventEmitter<ElementId[]>();
  }
  ngOnChanges(changes: SimpleChanges): void {
    //console.log("ITEM UPLOADIMAGE COMPONENT: "+JSON.stringify(this.item))
    //console.log("SINGLEUPLOAD UPLOADIMAGE COMPONENT: "+this.singleUpload)
  }

  ngOnInit(): void {
  }
  borrarElementos() {
    this.archivos = [];
    }
  async cargarImagenes() {
    //console.log("saving image with SingleUpload: "+this.singleUpload)
    this.fileSvc.guaradarFile(this.archivos, this.item, this.singleUpload).then(()=>{
      console.log("FILE uploaded");
      this.borrarElementos();
      (<HTMLInputElement> document.getElementById("dismissModal")).click();
    }).catch((error)=>{
       console.log("ERROR AL SUBIOR:"+JSON.stringify(error))
    })
//this.addImage.emit(imagenes);
 }
 guardar(form: any){
   console.log("saving: "+JSON.stringify(form))
 }

}
