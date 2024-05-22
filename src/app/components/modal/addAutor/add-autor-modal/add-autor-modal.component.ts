import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
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
import { Combo } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-add-autor-modal',
  templateUrl: './add-autor-modal.component.html',
  styleUrls: ['./add-autor-modal.component.scss']
})
export class AddAutorModalComponent implements OnDestroy, OnInit {

  formAddAutor!: FormGroup;
  matcher!: FormErrorStateMatcher;
  autorData?: AutorData;
  autorEdit?: AutorData;

  isEditing: boolean = false;

  selectedFile?: File;
  urlImagenDelServidor?: string;


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
    @Inject(MAT_DIALOG_DATA) public data: { autorId: number },
    public dialogRef: MatDialogRef<AddAutorModalComponent>) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm();
  }

  createForm() {
    this.formAddAutor = this.formBuilder.group(this.formControl.addAutor);
  }

  loadAutorData(autorId: number) {
    this.subscriptions.add(
      this.autorService.getAutorById(autorId).subscribe((autorEdit) => {
        this.formAddAutor.patchValue(autorEdit);
        this.urlImagenDelServidor = autorEdit.imagen; 
      }));
  }

  ngOnInit() {
    if (this.data && this.data.autorId) {
      this.loadAutorData(this.data.autorId);
      this.isEditing = true;
    }
  }

  submit() {
    const autorData = this.formAddAutor.getRawValue();
    return this.subscriptions.add(this.autorService
      .addAutor(autorData)
      .subscribe({
        next: (autorAdded) => {
          this.notification.show(
            autorAdded.message,
            'success'
          );
          this.uploadImage(autorAdded.id);
          const autorCreado: Combo = {id: autorAdded.id, nombre: autorData.pseudonimo};
          this.dialogRef.close(autorCreado);
        },
        error: (error) => {
          this.notification.show('No se ha podido añadir el autor', 'error');
        },
      }));
  }

  submitEdit() {
    const autorData = this.formAddAutor.getRawValue();
    return this.subscriptions.add(this.autorService
      .editAutor(autorData, this.data.autorId)
      .subscribe({
        next: (autorAdded) => {
          this.notification.show(
            'Autor editado correctamente!',
            'success'
          );
          this.uploadImage(autorData.id);
          this.router.navigate(['/admin/book']);
        },
        error: (error) => {
          this.notification.show('No se ha podido editar el autor', 'error');
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
