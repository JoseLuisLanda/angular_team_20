import { Component, OnInit } from '@angular/core';
import { auth } from 'firebase-admin';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayName:any;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
  
      
  }


}
