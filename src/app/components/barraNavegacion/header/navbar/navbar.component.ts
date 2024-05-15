import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() userRole?: string;
  isAuthenticated: boolean = false;

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
    private notification: NotificationService,
  ) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void { }

  onToggleSidenav() {
    this.SidenavToggle.emit();
  }

  toLogin() {
    this.router.navigate(['/login']);
  }

  toPerfil() {
    this.router.navigate(['/mi-despacho/perfil']);
  }

  toAdmin() {
    this.router.navigate(['/admin']);
  }

  cerrarSesion() {
    if (this.authService.closeSessionTotal()) {
      this.notification.show(
        'Se ha cerrado sesion Correctamente',
        'success'
      );
      this.router.navigate(['/']);
    }
  }

}
