import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Book } from 'src/app/shared/models/book/book';
import { ValoracionData, ValoracionResponse } from 'src/app/shared/models/comentario/comentario';

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
  
  formValoracion!: FormGroup;
  matcher!: FormErrorStateMatcher;

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ValoracionResponse, titulo: string, procedenciaModal?: boolean },
    private dialogRef: MatDialogRef<UserValoracionModalComponent>,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private bookService: BookService,
    private usuarioService: UserService,
    private notification: NotificationService,
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(this.formBuilder);
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
      if (data.titulo) {
        this.tituloLibro = data.titulo;
      }
      if (data.procedenciaModal) {
        this.procedenciaModal = data.procedenciaModal;
      }
    }
  }

  createForm(fb: FormBuilder) {
    this.formValoracion = this.formBuilder.group(this.formControl.valoracionEstrellas);
  }

  ngOnInit() {
    this.dialogRef.beforeClosed().subscribe(() => {
      if (this.procedenciaModal && !this.submitted && this.modalInfo) {
        this.sendDataToServer(this.modalInfo);
      }
    });
  }

  submit() {
    this.submitted = true;
    const formValues = this.formValoracion.value;
    const dataToSend = {
      ...this.modalInfo,
      ...formValues,
    };
    this.sendDataToServer(dataToSend);
  }

  sendDataToServer(data: ValoracionResponse) {
    if (this.modalInfo) {
      this.subscriptions.add(this.usuarioService.editarUsuarioLibro(this.modalInfo).subscribe({
        next: (valoracion) => {
          this.updateLibroSeleccionado();
          this.notification.show(
            'Lectura editada correctamente!',
            'success'
          );
          this.dialogRef.close();
        },
        error: (error) => {
          this.notification.show('No se ha podido editada la lectura', 'error');
        },
      }));
    }
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
        if (this.libro) {
          this.libro.estado = 'LEIDO';
          this.bookService.setLibro(this.libro);
        }
      })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}