import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-password-reset-email-cb',
  templateUrl: './send-password-reset-email-cb.component.html',
  styleUrls: ['./send-password-reset-email-cb.component.css']
})
export class SendPasswordResetEmailCbComponent implements OnInit {
  @Output() onConfirmar: EventEmitter<any> = new EventEmitter<any>();
  @Input() debug: boolean = false;
  public code = "";
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  confirmar() {
    this.onConfirmar.next(this.getCode(this.code));
  }

  protected getCode(_code: any) {
    let code = _code.split('&')[1].substring("oobCode=".length);
    return code;
  }

}
