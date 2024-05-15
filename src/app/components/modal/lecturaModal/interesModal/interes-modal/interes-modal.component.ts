import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Book } from 'src/app/shared/models/book/book';
import { FechasModalComponent } from '../../fechasModal/fechas-modal/fechas-modal.component';
import { UserValoracionModalComponent } from '../../userValoracionModal/user-valoracion-modal/user-valoracion-modal.component';
import { ValoracionData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-interes-modal',
  templateUrl: './interes-modal.component.html',
  styleUrls: ['./interes-modal.component.scss']
})
export class InteresModalComponent implements OnInit {

  modalInfo?: Book;

  modalInfoFechasValoracion?: ValoracionData;

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
    //TODO OBTENER VALORACION AL HACER LA LLAMADA AL SERVICIO CON EL ESTADO DEL LIBRO
    //LO PASAMOS AL modalInfoFechasValoracion Y ABRIMOS ALGUNO DE LOS OTROS DOS MODALES
    if (this.modalInfo) {
      this.modalInfoFechasValoracion = {
        id: this.modalInfo.id
      };
      if (this.modalInfoFechasValoracion) {
        if (estadoMarcado === 'PROCESO') {
          const dialogFechas = this.dialog.open(FechasModalComponent, {
            width: '50%',
            data: {
              modalInfo: this.modalInfoFechasValoracion,
              pages: this.modalInfo.paginasTotales,
              titulo: this.modalInfo.titulo,
            }
          });
        }
        if (estadoMarcado === 'LEÍDO') {
          const dialogValoracion = this.dialog.open(UserValoracionModalComponent, {
            width: '50%',
            data: {
              modalInfo: this.modalInfoFechasValoracion,
              titulo: this.modalInfo.titulo,
              procedenciaModal: false,
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
