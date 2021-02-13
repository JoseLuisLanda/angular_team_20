import { Component, OnInit } from '@angular/core';
import { SendEmailVerification } from 'src/app/firebase/auth/send-email-verification';

@Component({
  selector: 'app-send-email-verification',
  templateUrl: './send-email-verification.component.html',
  styleUrls: ['./send-email-verification.component.css']
})
export class SendEmailVerificationComponent implements OnInit {

  constructor(private sendEmailVerification: SendEmailVerification) { }

  ngOnInit(): void {
  }

  verificarEmail() {
    this.sendEmailVerification.handle()
      .then(this.verificarEmailOk.bind(this))
      .catch(this.verificarEmailError.bind(this))
  }

  protected verificarEmailOk(response: any) {
    console.log("verificarEmailOk", response);
  }

  protected verificarEmailError(response: any) {
    console.log("verificarEmailError", response);
  }

}
