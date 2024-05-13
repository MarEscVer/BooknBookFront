import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Book } from 'src/app/shared/models/book/book';
import { FechasModalComponent } from '../../fechasModal/fechas-modal/fechas-modal.component';
import { ModalInfo, ModalInfoPages } from 'src/app/shared/models/modal/modal';
import { UserValoracionModalComponent } from '../../userValoracionModal/user-valoracion-modal/user-valoracion-modal.component';

@Component({
  selector: 'app-interes-modal',
  templateUrl: './interes-modal.component.html',
  styleUrls: ['./interes-modal.component.scss']
})
export class InteresModalComponent implements OnInit {

  modalInfo?: Book;

  modalInfoFechas?: ModalInfoPages;
  modalInfoValoracion?: ModalInfo;

  matcher!: FormErrorStateMatcher;
  formularioLibro!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: Book },
    private dialogRef: MatDialogRef<InteresModalComponent>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
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
      this.modalInfoFechas = {
        id: this.modalInfo.id,
        title: this.modalInfo.titulo,
        pages: this.modalInfo.paginasTotales,
      };
      this.modalInfoValoracion = {
        id: this.modalInfo.id,
        title: this.modalInfo.titulo,
      };
      if (this.modalInfoFechas || this.modalInfoValoracion) {
        if (estadoMarcado === 'PROCESO') {
          const dialogFechas = this.dialog.open(FechasModalComponent, {
            width: '50%',
            data: {
              modalInfo: this.modalInfoFechas
            }
          });
        }
        if (estadoMarcado === 'LEÍDO') {
          const dialogValoracion = this.dialog.open(UserValoracionModalComponent, {
            width: '50%',
            data: {
              modalInfo: this.modalInfoValoracion
            }
          });
        }
      }
    }

    //TODO LLAMADA EDIT ESTADO LECTURA
    this.dialogRef.close();
    console.log(estadoMarcado);
  } 

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formularioLibro,
      modelAttribute,
      errorAttribute
    );
  }

}
