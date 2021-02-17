import { Injectable } from "@angular/core";
import swal from "sweetalert2";

@Injectable({providedIn: 'root'})
export class SwalService { 
  constructor() {

  }

  success(title: any, text: any) {
    swal.fire({
      title: title,
      text: text,
      buttonsStyling: false,
      customClass:{
        confirmButton: "btn btn-success",
      },
      icon: "success"
    })
  }

  error(title: any, text: any) {
    swal.fire({
      title: title,
      text: text,
      buttonsStyling: false,
      customClass:{
        confirmButton: "btn btn-danger",
      },
      icon: "error"
    })
  }

}