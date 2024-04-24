import { Component, Input, OnDestroy } from '@angular/core';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfo } from 'src/app/shared/models/modal/modal';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnDestroy{

  @Input() modalInfo?: ModalInfo;
  @Input() deleteService: any;

  /**
   * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
   */
  private subscriptions: Subscription = new Subscription();

  constructor(private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      data: {
        modalInfo: this.modalInfo,
        deleteService: this.deleteService
      }
    });

    this.subscriptions.add(dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("ACEPTADO");
      }
    }));
  }

  public ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

}

