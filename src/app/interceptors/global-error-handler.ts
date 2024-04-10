import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorService } from '../services/interceptor/error.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from '../services/notification/notification.service';
import { LoggingService } from '../services/interceptor/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace!: string;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      notifier.show(message);
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifier.show(message);
    }
    // Always log errors
    logger.logError(message, stackTrace);
    console.error(error);
  }
}

