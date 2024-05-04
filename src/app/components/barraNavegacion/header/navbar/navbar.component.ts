import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() userRole?: string;

  /**
   * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
   */
  private subscriptions: Subscription = new Subscription();

  /**
   * Aplicar una clase al elemento raíz.
   */
  @HostBinding('class') class = "app-navbar";

  @Output() SidenavToggle = new EventEmitter<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {}

  onToggleSidenav() {
    this.SidenavToggle.emit();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  toPerfil() {
    this.router.navigate(['/perfil']);
  }

  //TODO hacer el metodo para logout
  toLogout() {

  }

  toAdmin() {
    this.router.navigate(['/admin']);
  }
  
  cerrarSesion() {
    this.authService.closeSessionTotal();
    this.router.navigate(['/']);
  }

}
