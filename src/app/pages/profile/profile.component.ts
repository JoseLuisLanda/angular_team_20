import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }
  async loadUser() {
    this.user = await this.auth.isAuthenticated();
  }
}
