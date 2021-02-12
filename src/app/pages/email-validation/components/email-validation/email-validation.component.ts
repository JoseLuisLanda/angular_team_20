import { Component, OnInit } from '@angular/core';
import { EmailVerificationCallback } from 'src/app/firebase/auth/email-verification-callback';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.css']
})
export class EmailValidationComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _emailVerificationCallback: EmailVerificationCallback) { }

  ngOnInit(): void {
    this.emailVerificationCallback(this.activatedRoute.snapshot.params);
  }

  protected emailVerificationCallback(params: any) {    
    return this._emailVerificationCallback.handle(params['code'].toString())
      .then(this.emailVerificationCallbackOk.bind(this))
      .catch(this.emailVerificationCallbackErr.bind(this));
  }

  protected emailVerificationCallbackOk(response: any) {
    console.log("emailVerificationCallbackOk", response);
  }

  protected emailVerificationCallbackErr(erro: any) {
    console.log("emailVerificationCallbackErr", erro);
  }

}
