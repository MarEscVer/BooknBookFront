import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Book } from 'src/app/shared/models/book/book';
import { FechasModalComponent } from '../../fechasModal/fechas-modal/fechas-modal.component';
import { UserValoracionModalComponent } from '../../userValoracionModal/user-valoracion-modal/user-valoracion-modal.component';
import { ValoracionResponse } from 'src/app/shared/models/comentario/comentario';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-interes-modal',
  templateUrl: './interes-modal.component.html',
  styleUrls: ['./interes-modal.component.scss']
})
export class InteresModalComponent implements OnInit, OnDestroy{

  modalInfo?: Book;
  libro?: Book;

  matcher!: FormErrorStateMatcher;
  formularioLibro!: FormGroup;

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: Book },
    private dialogRef: MatDialogRef<InteresModalComponent>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private usuarioService: UserService,
    private notification: NotificationService,
    private bookService: BookService,
    private dialog: MatDialog
  ) {
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }

  createForm(fb: FormBuilder) {
    this.formularioLibro = this.formBuilder.group(this.formControl.addInteres);
  }

  ngOnInit(): void {
    if (this.modalInfo?.estado) {
      this.formularioLibro.get('estado')?.setValue(this.modalInfo.estado);
    }
  }

  submit() {
    const estadoMarcado = this.formularioLibro.get('estado')?.value;
    if (this.modalInfo) {
      this.subscriptions.add(
        this.usuarioService.vincularUsuarioLibro(this.modalInfo.id, estadoMarcado).subscribe({
          next: (valoracion) => {
            valoracion.estado = estadoMarcado;
            this.abrirModalEstado(estadoMarcado, valoracion);
            this.dialogRef.close();
          },
          error: (error) => {
            this.notification.show('No se ha podido vincular la lectura', 'error');
          },
        }));
    }
  }

  updateLibroSeleccionado() {
    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
        if (this.libro) {
          this.libro.estado = 'FAVORITO';
          this.bookService.setLibro(this.libro);
        }
      })
    );
  }

  abrirModalEstado(estadoMarcado: string, valoracion: ValoracionResponse) {
    if (this.modalInfo) {
      if (estadoMarcado === 'PROGRESO') {
        const dialogFechas = this.dialog.open(FechasModalComponent, {
          width: '50%',
          data: {
            modalInfo: valoracion,
            pages: this.modalInfo.paginasTotales,
            titulo: this.modalInfo.titulo,
            procedenciaModal: true,
          }
        });
      }
      if (estadoMarcado === 'LEIDO') {
        const dialogValoracion = this.dialog.open(UserValoracionModalComponent, {
          width: '50%',
          data: {
            modalInfo: valoracion,
            titulo: this.modalInfo.titulo,
            procedenciaModal: true,
          }
        });
      }
      if(estadoMarcado === 'FAVORITO') {
        if (this.modalInfo) {
          this.subscriptions.add(this.usuarioService.editarUsuarioLibro(valoracion).subscribe({
            next: (valoracion) => {
              this.updateLibroSeleccionado();
              this.notification.show(
                'Lectura vinculada correctamente!',
                'success'
              );
            },
            error: (error) => {
              this.notification.show('No se ha podido vincular la lectura', 'error');
            },
          }));
        }
      }
    }
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formularioLibro,
      modelAttribute,
      errorAttribute
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
