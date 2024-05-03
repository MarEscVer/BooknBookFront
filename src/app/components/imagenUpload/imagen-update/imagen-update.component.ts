import { Component, OnInit, forwardRef, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
export class ImagenUpdateComponent implements OnChanges {

  selectedFile?: File;
  selectedFileName?: string;
  imageUrl?: string;

  defaultImageUrl: string = '../../../../assets/img/defaultAdd.png';

  @Output() imageSelected: EventEmitter<File> = new EventEmitter<File>();

  @Input() imagenUrlServidor?: string;
  @Input() imagenSeleccionadaLocal?: File;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imagenUrlServidor'] && changes['imagenUrlServidor'].currentValue) {
      this.mostrarImagenServidor(changes['imagenUrlServidor'].currentValue);
    } else if (this.selectedFile) {
      this.mostrarNuevaImagenSeleccionada(this.selectedFile);
    }
  }

  mostrarImagenServidor(url: string): void {
    this.imageUrl = url;
  }

  mostrarNuevaImagenSeleccionada(nuevaImagen: File): void {
    this.imageUrl = URL.createObjectURL(nuevaImagen);
    this.imageSelected.emit(nuevaImagen);
  }

  selectFiles(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      this.selectedFileName = this.selectedFile?.name;
      if (this.selectedFile) {
        this.mostrarNuevaImagenSeleccionada(this.selectedFile);
      }
    }
  }

}