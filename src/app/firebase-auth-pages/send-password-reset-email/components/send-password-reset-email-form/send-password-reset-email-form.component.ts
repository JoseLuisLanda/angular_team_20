import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-send-password-reset-email-form',
  templateUrl: './send-password-reset-email-form.component.html',
  styleUrls: ['./send-password-reset-email-form.component.css']
})
export class SendPasswordResetEmailFormComponent implements OnInit {

  @Input() email = "";
  @Output() onResetPassword: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  resetPassword() {
    this.onResetPassword.next();
  }

}
