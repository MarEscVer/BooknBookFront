import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageErrorComponent } from 'src/app/components/messages/message-error/message-error.component';
import { ErrorHttp } from 'src/app/shared/models/error/error';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}
  show(message: any, type?: string, options?: any) {
    if (!options) {
      options = {
        toastComponent: MessageErrorComponent,
        //disableTimeOut: true,
        timeOut: 5000,
        closeButton: false,
        progressBar: true,
        progressAnimation: 'decreasing',
        countDuplicates: true,
        preventDuplicates: true,
      };
    }
    if (
      message instanceof Object &&
      ('largeDescription' in message || 'isTrusted' in message)
    ) {
      this.jsonParse(message, type, options);
    } else if (message instanceof Object && 'path' in message && 'error' in message) {
      this.message(
        'Error Inesperado del Sistema, Intentelo de nuevo más tarde',
        'error',
        options
      );
    } else {
      this.message(message, type, options);
    }
  }

  jsonParse(message: ErrorHttp, type?: string, options?: any) {
    switch (type) {
      case 'success':
        this.toastr.success(JSON.stringify(message), 'Success', options);
        break;
      case 'warning':
        this.toastr.warning(JSON.stringify(message), 'Warning', options);
        break;
      case 'error':
        this.toastr.error(JSON.stringify(message), 'Error', options);
        break;
      default:
        this.toastr.info(JSON.stringify(message), 'Info', options);
    }
  }

  message(message: string, type?: string, options?: any) {
    switch (type) {
      case 'success':
        this.toastr.success(message, 'Success', options);
        break;
      case 'warning':
        this.toastr.warning(message, 'Warning', options);
        break;
      case 'error':
        this.toastr.error(message, 'Error', options);
        break;
      default:
        this.toastr.info(message, 'Info', options);
    }
  }
}
