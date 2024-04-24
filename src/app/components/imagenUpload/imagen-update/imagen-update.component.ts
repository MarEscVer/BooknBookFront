import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, forwardRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ImagenUploadService } from 'src/app/services/imagenUpload/imagen-upload.service';

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
export class ImagenUpdateComponent implements ControlValueAccessor, OnInit, OnDestroy {
  selectedFile?: File;
  progress = 0;
  selectedFileName?: string;
  progressInfo: { fileName: string, value: number } = { fileName: '', value: 0 };
  imageInfos?: Observable<any>;

  showProgressBar: boolean = false;

  onChange: any = () => { };
  onTouch: any = () => { };

  @Output() imageSelected: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription[] = [];

  constructor(private uploadService: ImagenUploadService) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  writeValue(value: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFilesMOCK();
  }

  selectFiles(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const blob = files[0];
      const file = new File([blob], blob.name, { type: blob.type });
      if (file instanceof Blob) {

        this.progressInfo = { fileName: '', value: 0 };
        this.selectedFile = file;
        this.selectedFileName = this.selectedFile.name;
        this.progress = 0;

        const reader = new FileReader();
        reader.onload = (e: any) => {
          //console.log(e.target.result);
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  upload(): void {
    if (this.selectedFileName) {
      this.progressInfo = { fileName: this.selectedFileName, value: 0 };
    }

    if (this.selectedFile) {
      const subscription = this.uploadService.uploadMOCK(this.selectedFile).pipe(
        tap((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfo.value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            this.imageInfos = this.uploadService.getFilesMOCK();
          }
        })
      ).subscribe();
      
      this.imageSelected.emit(true);

      this.subscriptions.push(subscription);
    }
  }

}