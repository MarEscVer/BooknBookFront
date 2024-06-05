import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Book } from 'src/app/shared/models/book/book';
import { ValoracionResponse } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-user-valoracion-modal',
  templateUrl: './user-valoracion-modal.component.html',
  styleUrls: ['./user-valoracion-modal.component.scss']
})
export class UserValoracionModalComponent implements OnInit, OnDestroy {

  modalInfo?: ValoracionResponse;
  tituloLibro: string = '';
  procedenciaModal: boolean = false;
  private submitted = false;
  libro?: Book;
  paginasLibro: number = 0;

  formValoracion!: FormGroup;
  matcher!: FormErrorStateMatcher;
  editing: boolean = false;

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ValoracionResponse, titulo: string, paginasLibro: number, procedenciaModal?: boolean },
    private dialogRef: MatDialogRef<UserValoracionModalComponent>,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private bookService: BookService,
    private usuarioService: UserService,
    private cdRef: ChangeDetectorRef
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(this.formBuilder);
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
      if (data.titulo) {
        this.tituloLibro = data.titulo;
      }
      if (data.paginasLibro) {
        this.paginasLibro = data.paginasLibro;
      }
      if (data.modalInfo.calificacionPersonal) {
        this.editing = true;
      }
    }
  }

  createForm(fb: FormBuilder) {
    this.formValoracion = this.formBuilder.group(this.formControl.valoracionEstrellas);
  }

  ngOnInit() {
    if (this.modalInfo) {
      this.formValoracion.patchValue(this.modalInfo);
      this.cdRef.detectChanges();
    }
  }

  submit() {
    const formValues = this.formValoracion.value;
    if (this.modalInfo) {
      this.modalInfo.paginaActual = this.paginasLibro;
      if (!this.modalInfo.fechaComentario) {
        this.modalInfo.fechaComentario = new Date().toISOString();
      }
      if (!this.modalInfo.fechaLectura) {
        this.modalInfo.fechaLectura = new Date().toISOString();
      }
    }
    const dataToSend = {
      ...this.modalInfo,
      ...formValues,
    };
    this.submitted = true;
    this.sendDataToServer(dataToSend);
    this.dialogRef.close();
  }

  sendDataToServer(data: ValoracionResponse) {
    if (this.modalInfo) {
      this.subscriptions.add(this.usuarioService.editarUsuarioLibro(data).subscribe());
    }
    this.updateLibroSeleccionado();
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formValoracion,
      modelAttribute,
      errorAttribute
    );
  }

  updateLibroSeleccionado() {
    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
      })
    );
    if (this.libro) {
      this.libro.estado = 'LEIDO';
      this.bookService.setLibro(this.libro);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}