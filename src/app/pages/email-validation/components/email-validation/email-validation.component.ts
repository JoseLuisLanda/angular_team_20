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
    private emailVerificationCallback: EmailVerificationCallback) { }

  ngOnInit(): void {
    console.log(42342);
    this.validateEmailHandler(this.activatedRoute.snapshot.params);
  }

  protected validateEmailHandler(params: any) {
    console.log("params", 32423);
  }

}
