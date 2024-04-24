import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, forwardRef, OnDestroy } from '@angular/core';
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
  selectedFiles?: FileList;
  progress = 0;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  imageInfos?: Observable<any>;

  showProgressBar: boolean = false;

  onChange: any = () => { };
  onTouch: any = () => { };

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription[] = [];

  constructor(private uploadService: ImagenUploadService) { }

  writeValue(value: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  ngOnInit(): void {
    this.imageInfos = this.uploadService.getFiles();
  }

  selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      const subscription = this.uploadService.upload(file).pipe(
        tap((event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            this.imageInfos = this.uploadService.getFiles();
          }
        })
      ).subscribe();

      this.subscriptions.push(subscription);
    }
  }

  uploadFiles(): void {
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
