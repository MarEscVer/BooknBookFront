import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-confirmacion-desactivar-modal',
  templateUrl: './confirmacion-desactivar-modal.component.html',
  styleUrls: ['./confirmacion-desactivar-modal.component.scss']
})
export class ConfirmacionDesactivarModalComponent {
  private subscriptions: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ConfirmacionDesactivarModalComponent>) { }

  onConfirmClick(): void {
    this.subscriptions.add(this.userService.desactivarCuenta()
      .subscribe({
        next: (success) => {
          if (success) {
            this.authService.closeSessionTotal();
            this.notification.show(success.message, 'success');
            this.dialogRef.close(true);
            this.router.navigate(['/']);
          }
        }, error: (error) => {
          this.notification.show('No se ha podido desactivar la cuenta', 'error');
        },
      }));
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
