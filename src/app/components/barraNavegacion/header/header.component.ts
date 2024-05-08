import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public active: boolean = false;
  userRole?: string | null;

  @ViewChild('sidenav') sidenav?: MatSidenav;

  /**
 * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
 */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
  ) { }

  setActive(): void {
    this.active = !this.active
  }

  closeSidenav(): void {
    this.sidenav?.close();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        this.userRole = role;
      })
    );
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
