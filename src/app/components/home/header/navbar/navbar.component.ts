import { Component, EventEmitter, HostBinding, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userRole?: string;
  Breakpoints = Breakpoints;
  currentBreakpoint:string = '';

  /**
   * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
   */
  private subscriptions: Subscription = new Subscription();

  /**
   * Aplicar una clase al elemento raíz.
   */
  @HostBinding('class') class = "app-navbar";

  @Output() SidenavToggle = new EventEmitter<void>();

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    //this.userRole = 'NORMAL';
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
  }

  onToggleSidenav() {
    this.SidenavToggle.emit();
  }

  public toLogin(){
    this.router.navigate(['/login']);
  }

  private breakpointChanged() {
    if(this.breakpointObserver.isMatched(Breakpoints.Large)) {
      this.currentBreakpoint = Breakpoints.Large;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      this.currentBreakpoint = Breakpoints.Medium;
    } else if(this.breakpointObserver.isMatched(Breakpoints.Small)) {
      this.currentBreakpoint = Breakpoints.Small;
    } else if(this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      this.currentBreakpoint = Breakpoints.XSmall;
    }
  }
}
