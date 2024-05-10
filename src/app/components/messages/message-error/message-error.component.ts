import { Component, Input } from '@angular/core';
import { ErrorHttp } from 'src/app/shared/models/error/error';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.scss'],
  animations: [
    trigger('flyInOut', [
      state(
        'inactive',
        style({
          display: 'none',
          opacity: 0,
        })
      ),
      transition(
        'inactive => active',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 0,
            }),
            style({
              opacity: 1,
            }),
          ])
        )
      ),
      transition(
        'active => removed',
        animate(
          '400ms ease-out',
          keyframes([
            style({
              opacity: 1,
            }),
            style({
              transform: 'translate3d(10%, 0, 0) skewX(10deg)',
              opacity: 0,
            }),
          ])
        )
      ),
    ]),
  ],
  preserveWhitespaces: false,
})
export class MessageErrorComponent extends Toast {
  // used for demo purposes
  //undoString = 'undo';
  completeErrorMessage!: ErrorHttp;
  displayMessage!: string;
  numberRepeats!: number;

  @Input() toast!: Toast;

  // constructor is only necessary when not using AoT
  constructor(
    protected override toastrService: ToastrService,
    public override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
    //this.width = 500;
    if (toastPackage?.message) {
      try {
        this.completeErrorMessage = JSON.parse(toastPackage?.message);
        this.displayMessage = this.completeErrorMessage.isTrusted
          ? 'Error de conexión'
          : this.completeErrorMessage.largeDescription;
      } catch (e) {
        this.displayMessage = toastPackage?.message;
      }
    }

    //this.completeErrorMessage = this.snackBarRef?.containerInstance.snackBarConfig.data.message;
    //this.message = this.snackBarRef?.containerInstance.snackBarConfig.data.message.largeDescription;
    //this.action = this.snackBarRef?.containerInstance.snackBarConfig.data.action;
  }

  action(event: Event) {
    event.stopPropagation();
    //this.undoString = 'undid';
    this.toastPackage.triggerAction();
    return false;
  }
}
