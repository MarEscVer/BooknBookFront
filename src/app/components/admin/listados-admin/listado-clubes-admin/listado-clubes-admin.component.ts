import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubItemList } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-listado-clubes-admin',
  templateUrl: './listado-clubes-admin.component.html',
  styleUrls: ['./listado-clubes-admin.component.scss']
})
export class ListadoClubesAdminComponent {
  // MOCK DATA
  data: ClubItemList[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    for (let i = 1; i <= 20; i++) {
      this.data.push({
        id: i,
        img: `url_de_la_imagen_${i}`,
        name: `Club ${i}`,
        tipe: `Tipo ${i}`,
        gender: `Género ${i}`,
        users: 100 + i
      });
    }
  }

  agregarClub(): void {
    //TODO redireccionar a add libro
    this.router.navigate(['/']);
  }
}