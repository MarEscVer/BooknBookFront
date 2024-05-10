import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddAutorModalComponent } from '../add-autor-modal/add-autor-modal.component';
import { AutorIcon } from 'src/app/shared/models/autor/autor';
import { Combo } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-add-autor-button',
  templateUrl: './add-autor-button.component.html',
  styleUrls: ['./add-autor-button.component.scss']
})
export class AddAutorButtonComponent implements OnDestroy {

  @Input() autorIcon!: AutorIcon;
  @Input() autorId?: number;
  @Output() autorCreado: EventEmitter<Combo> = new EventEmitter<Combo>();

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddAutorModalComponent, {
      width: '100%',
      data: { autorId: this.autorId }
    }).afterClosed().subscribe((combo: Combo) => {this.autorCreado.emit(combo)});
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
