import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-clubes',
  templateUrl: './clubes.component.html',
  styleUrls: ['./clubes.component.scss']
})
export class ClubesComponent implements OnInit {

  userLoged: boolean = false;
  iconoOpcion: boolean = true;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  registrarse() {
    this.router.navigate(['/register']);
  }

  ngOnInit() {
    this.subscriptions.add(
      this.authService.userRole$.subscribe(role => {
        if (role) {
          this.userLoged = true;
        }
      })
    );
  }


}
