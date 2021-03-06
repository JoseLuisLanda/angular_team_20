import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  menu:any=[]
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.obtenerMenu();
  }
  obtenerMenu(){
    this.menu = [
      { id: 1, tema: 'Mi Perfil'},
      { id: 2, tema: 'Insignias'},
      { id: 3, tema: 'Grupos'},
      { id: 4, tema: 'Eventos'}
    ];
    console.log(this.menu)
  }
}
