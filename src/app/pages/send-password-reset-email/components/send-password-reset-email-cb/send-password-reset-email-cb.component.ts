import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-password-reset-email-cb',
  templateUrl: './send-password-reset-email-cb.component.html',
  styleUrls: ['./send-password-reset-email-cb.component.css']
})
export class SendPasswordResetEmailCbComponent implements OnInit {
  @Input() debug: boolean = false;
  public code = "";
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  confirmar() {
    this.router.navigate(['auth/confirm-password-reset']);
  }

}
