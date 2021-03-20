import { Component, OnInit, Input } from '@angular/core';
import { Comunidad } from '../../models/collections';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';
@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.component.html',
  styleUrls: ['./comunidad.component.css'],
})
export class ComunidadComponent implements OnInit {
  // @Input() comunidad!: Comunidad;
  defaultImage =
    'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/91_Discord_logo_logos-512.png';
  
  comunidades: Comunidad[] = [];
  constructor(private auth: AuthService, private fsService: FirestoreService,
    private profileService: ProfileService, private router: Router) {}

  ngOnInit(): void {
    this.fsService.getCollection('comunidades', 5).subscribe((v: any) => {
      this.comunidades = v;
    });
  }
  irGrupos(){
    this.profileService.setSelectedTab("grupo");
    this.router.navigate(['/profile']);
  }
}
