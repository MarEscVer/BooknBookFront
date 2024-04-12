import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public active: boolean = false;
  userRole?: string;

  @ViewChild('sidenav') sidenav?: MatSidenav;

  constructor() {
     //MOCK
     this.userRole = 'ADMIN';
  }

  setActive(): void {
    this.active = !this.active
  }

  closeSidenav(): void {
    this.sidenav?.close();
  }

  ngOnInit() {
  }

}
