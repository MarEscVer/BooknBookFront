import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ValoracionResponse } from 'src/app/shared/models/comentario/comentario';
import { UserValoracionModalComponent } from '../../userValoracionModal/user-valoracion-modal/user-valoracion-modal.component';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { BookService } from 'src/app/services/book/book.service';
import { Book } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-fechas-modal',
  templateUrl: './fechas-modal.component.html',
  styleUrls: ['./fechas-modal.component.scss']
})
export class FechasModalComponent implements OnInit, OnDestroy {

  modalInfo?: ValoracionResponse;
  pages: number = 0;
  tituloLibro: string = '';
  procedenciaModal: boolean = false;
  formProceso!: FormGroup;
  matcher!: FormErrorStateMatcher;
  libro?: Book;

  maxDate = new Date();
  minDate = new Date();

  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ValoracionResponse, pages: number, titulo: string, procedenciaModal?: boolean },
    private dialogRef: MatDialogRef<FechasModalComponent>,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private usuarioService: UserService,
    private bookService: BookService,
    private dialog: MatDialog
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(this.formBuilder);
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
      if (data.pages) {
        this.pages = data.pages;
      }
      if (data.titulo) {
        this.tituloLibro = data.titulo;
      }
    }
  }

  createForm(fb: FormBuilder) {
    this.formProceso = this.formBuilder.group(this.formControl.procesoLectura);
  }

  ngOnInit() {
    this.setMinMaxDate();
    if (this.modalInfo) {
      this.formProceso.patchValue(this.modalInfo);
    }
    this.subscriptions.add(this.formProceso.get('paginaActual')?.valueChanges.subscribe((value) => {
      if (value !== this.formProceso.get('paginaActual')?.value) {
        if (value > this.pages) {
          this.formProceso.get('paginaActual')?.setValue(this.pages);
        }
        if (value === this.pages) {
          this.formProceso.get('terminado')?.setValue(true);
          this.formProceso.get('paginaActual')?.disable();
        } else {
          this.formProceso.get('terminado')?.setValue(false);
          this.formProceso.get('paginaActual')?.enable();
        }
      }
    }));
  }

  submit() {
    if (this.modalInfo) {
      const finalDate: Date = this.formProceso.get('fechaLectura')?.value;
      const paginaActual: number = this.formProceso.get('paginaActual')?.value;
      const terminado: boolean = this.formProceso.get('terminado')?.value;

      this.modalInfo.paginaActual = paginaActual;

      if (terminado) {
        // Formatear las fechas al formato YYYY/MM/DD
        const finalFormatted: string = finalDate ? finalDate.toISOString().split('T')[0] : '';
        this.modalInfo.fechaLectura = finalFormatted;
        this.modalInfo.estado = 'LEIDO';
        const dialogValoracion = this.dialog.open(UserValoracionModalComponent, {
          width: '50%',
          data: {
            modalInfo: this.modalInfo,
            titulo: this.tituloLibro,
            procedenciaModal: true,
          }
        });
      } else {
        this.updateComentario();
      }
      this.dialogRef.close();
    }
  }

  updateComentario() {
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

  setMinMaxDate() {
    this.minDate.setFullYear(this.maxDate.getFullYear() - 5);
  }

  updateLibroSeleccionado() {
    this.subscriptions.add(
      this.bookService.libroSeleccionado$.subscribe(libro => {
        this.libro = libro;
        if (this.libro) {
          this.libro.estado = 'PROGRESO';
          this.bookService.setLibro(this.libro);
        }
      })
    );
  }

  updatePageInput() {
    if (this.formProceso.get('terminado')?.value) {
      this.formProceso.get('paginaActual')?.setValue(this.pages);
      this.formProceso.get('paginaActual')?.disable();
    } else {
      this.formProceso.get('paginaActual')?.setValue(null);
      this.formProceso.get('paginaActual')?.enable();
    }
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formProceso,
      modelAttribute,
      errorAttribute
    );
  }

  ngOnDestroy(): void {
    this.updateComentario();
    this.subscriptions.unsubscribe();
  }

}
