import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-password-reset',
  templateUrl: './confirm-password-reset.component.html',
  styleUrls: ['./confirm-password-reset.component.css']
})
export class ConfirmPasswordResetComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let params = this.activatedRoute.snapshot.params;
  }

  confirmarPasswordResetAction(form: any) {
    console.log("ConfirmPasswordResetComponent", form);
  }

}
