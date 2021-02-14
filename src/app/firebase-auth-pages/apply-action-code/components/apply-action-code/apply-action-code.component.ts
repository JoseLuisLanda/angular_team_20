import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplyActionCode } from 'src/app/firebase/auth/apply-action-code';

@Component({
  selector: 'app-apply-action-code',
  templateUrl: './apply-action-code.component.html',
  styleUrls: ['./apply-action-code.component.css']
})
export class ApplyActionCodeComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private _applyActionCode: ApplyActionCode) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.applyActionCode(this.activatedRoute.snapshot.params);
    }, 1000);
  }

  protected applyActionCode(params: any) {
    let code = params['code'];
    return this._applyActionCode.handle(code)
      .then(this.applyActionCodeOk.bind(this))
      .catch(this.applyActionCodeErr.bind(this));
  }

  protected applyActionCodeOk(response: any) {
    alert("applyActionCodeOk:"+ JSON.stringify(response));
  }

  protected applyActionCodeErr(erro: any) {
    alert("applyActionCodeErr:"+ JSON.stringify(erro));
  }

}
