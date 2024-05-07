import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss']
})
export class QuienesSomosComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ){}

  registrarse(){
    this.router.navigate(['/register']);
  }

}
