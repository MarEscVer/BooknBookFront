import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from 'src/app/services/club/club.service';
import { ClubItemList } from 'src/app/shared/models/club/club';

@Component({
  selector: 'app-listado-clubes-admin',
  templateUrl: './listado-clubes-admin.component.html',
  styleUrls: ['./listado-clubes-admin.component.scss']
})
export class ListadoClubesAdminComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

}