import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-imagen-update',
  templateUrl: './imagen-update.component.html',
  styleUrls: ['./imagen-update.component.scss']
})
export class ImagenUpdateComponent {

  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor(private host: ElementRef<HTMLInputElement>) {
  }
}
