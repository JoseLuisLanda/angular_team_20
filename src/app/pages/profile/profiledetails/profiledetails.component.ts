import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profiledetails',
  templateUrl: './profiledetails.component.html',
  styleUrls: ['./profiledetails.component.css']
})
export class ProfiledetailsComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.loadUser();
  }
  async loadUser() {
    this.user = await this.auth.isAuthenticated();
  }

}
