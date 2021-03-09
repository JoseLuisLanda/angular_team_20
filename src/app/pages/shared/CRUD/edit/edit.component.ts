import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { AfsService } from 'src/app/core/services/afs.service';
import { ElementId, Elemento } from 'src/app/shared/models/element';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnChanges {

  forma: FormGroup = this.fb.group({} as ElementId);
  @Input() type: string = "";
  @Input() item: ElementId = {} as ElementId;
  @Input() area: string = "";
  @Output() addItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();

  constructor(private fb: FormBuilder, private afsService : AfsService) { 
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.crearFormulario();
  }

  ngOnInit(): void {
    
    this.crearFormulario();
  }
  crearFormulario() {
    this.forma = this.fb.group(this.item);
    //ading default fields to form name and description
    this.item.name !== undefined ? this.addTextInput('name', this.item.name != null ? this.item.name : "") : null;
    this.item.description !== undefined ? this.addTextInput('description',
      this.item.description != null ? this.item.description : "") : null;
   // this.item.status !== undefined ? this.agregarStatus() : null;
   this.item.title !== undefined ? this.addTextInput('title', this.item.title != null ? this.item.title : "") : null;

    this.item.displayName != undefined ? this.addTextInput('displayName',
      this.item.displayName != null ? this.item.displayName : '') : null;
    this.item.psw !== undefined ? this.agregarPassword() : null;
  }
  //ADDING FIELDS
  agregarPassword() {
    this.forma.setControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));
  }
  addTextInput(field: string, value: string) {
    this.forma.setControl(field, this.fb.control(value, [Validators.required, Validators.minLength(4)]));
  }
  addNumberInput(field: string, value: number) {
    this.forma.setControl(field, this.fb.control(value, [Validators.required, Validators.min(0), Validators.max(1000000000000000)]));
  }
  agregarName() {
    let enabled = this.item.name !== '' ? true : false;
    this.forma.setControl('name', this.fb.control({ value: this.item.name, disabled: enabled }, [Validators.required, Validators.minLength(6)]));
  }
  formReset() {
    const description = this.item.description;
    this.forma.reset();
    this.item.elements = [];
    this.item.description = 'Público en General';
  }

  //DELETINGS CONTROLS
  deleteControl(element: string) {
    this.forma.removeControl(element);
  }

  get descriptionNoValido() {
    return this.forma.get('description')!.invalid && this.forma.get('description')!.touched
  }
  get displayNameNoValido() {
    return this.forma.get('displayName')!.invalid && this.forma.get('displayName')!.touched
  }
  get correoNoValido() {
    return this.forma.get('email')!.invalid && this.forma.get('email')!.touched
  }
  get nombreNoValido() {
    return this.forma.get('name')!.invalid && this.forma.get('name')!.touched
  }

  guardar() {
    this.item = this.forma.value;

      this.afsService.set(this.item.url!,this.item).then(res =>{
        console.log("EDITADO: ",JSON.stringify(res))
      }).catch(error=>{
        console.log("ERROR DE EDICION: ");
      }).finally(()=>{(<HTMLInputElement> document.getElementById("dismissModal")).click();});

    
  }
}
