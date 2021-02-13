import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-send-password-reset-email-cb',
  templateUrl: './send-password-reset-email-cb.component.html',
  styleUrls: ['./send-password-reset-email-cb.component.css']
})
export class SendPasswordResetEmailCbComponent implements OnInit {
  @Input() debug: boolean = false;
  public code = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
