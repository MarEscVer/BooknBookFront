import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, forwardRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ImagenUploadService } from 'src/app/services/imagenUpload/imagen-upload.service';
import { NotificationService } from 'src/app/services/notification/notification.service';

@Component({
  selector: 'app-imagen-update',
  templateUrl: './imagen-update.component.html',
  styleUrls: ['./imagen-update.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImagenUpdateComponent),
      multi: true
    }
  ]
})
export class ImagenUpdateComponent {
  
  selectedFile?: File;
  selectedFileName?: string;
  imageInfos?: Observable<any>;

  @Output() imageSelected: EventEmitter<File> = new EventEmitter<File>();

  constructor() { }

  selectFiles(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.selectedFileName = this.selectedFile?.name;
      this.imageSelected.emit(this.selectedFile);
    }
  }

}