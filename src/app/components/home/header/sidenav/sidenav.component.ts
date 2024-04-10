import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public active: boolean = false;
  userRole?: string;

  constructor() {
  }

  setActive(): void {
    this.active = !this.active
  }

  ngOnInit() {
  }

}
