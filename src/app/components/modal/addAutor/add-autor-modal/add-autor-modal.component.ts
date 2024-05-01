import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutorService } from 'src/app/services/autor/autor.service';
import { ImagenUploadService } from 'src/app/services/imagenUpload/imagen-upload.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { AutorData } from 'src/app/shared/models/autor/autor';

@Component({
  selector: 'app-add-autor-modal',
  templateUrl: './add-autor-modal.component.html',
  styleUrls: ['./add-autor-modal.component.scss']
})
export class AddAutorModalComponent implements OnDestroy, OnInit {

  formAddAutor!: FormGroup;
  matcher!: FormErrorStateMatcher;
  autorData?: AutorData;

  selectedFile?: File;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: ImagenUploadService,
    private autorService: AutorService,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { autorData: AutorData },
    public dialogRef: MatDialogRef<AddAutorModalComponent>) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm();
  }

  createForm() {
    this.formAddAutor = this.formBuilder.group(this.formControl.addAutor);
  }

  ngOnInit() { }

  //TODO AUTOR NO IMAGEN???
  submit() {
    const autorData = this.formAddAutor.getRawValue();
    return this.subscriptions.add(this.autorService
      .addAutor(autorData)
      .subscribe({
        next: (autorAdded) => {
          this.notification.show(
            'Club añadido correctamente!',
            'success'
          );
          this.uploadImage(autorData.id);
          this.router.navigate(['/admin/book']);
        },
        error: (error) => {
          this.notification.show('No se ha podido añadir el club', 'error');
        },
      })); 

  }

  private uploadImage(idAutor: number): void {
    if (this.selectedFile) {
      this.subscriptions.add(this.uploadService.uploadAutor(idAutor, this.selectedFile).subscribe({
        next: (event) => {
          this.notification.show(
            'Imagen subida correctamente',
            'success'
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.dialogRef.close(true);
        }
      }));
    }
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formAddAutor,
      modelAttribute,
      errorAttribute
    );
  }

  handleImageSelected(file: File) {
    this.selectedFile = file;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
