import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public active: boolean = false;
  userRole?: string;

  @ViewChild('sidenav') sidenav?: MatSidenav;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {
     this.userRole = this.authService.getCookie('rol');
  }

  setActive(): void {
    this.active = !this.active
  }

  closeSidenav(): void {
    this.sidenav?.close();
  }

  ngOnInit() {
  }

  cerrarSesion() {
    this.authService.closeSessionTotal();
    this.router.navigate(['/']);
  }
}
