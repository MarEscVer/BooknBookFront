import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ModalInfoPages } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-fechas-modal',
  templateUrl: './fechas-modal.component.html',
  styleUrls: ['./fechas-modal.component.scss']
})
export class FechasModalComponent implements OnInit, OnDestroy {

  modalInfo: ModalInfoPages = {
    id: 0,
    title: '',
    pages: 0,
  };

  formProceso!: FormGroup;
  matcher!: FormErrorStateMatcher;

  maxDate = new Date();
  minDate = new Date();

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfoPages },
    private dialogRef: MatDialogRef<FechasModalComponent>,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(this.formBuilder);
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
    this.subscriptions.add(this.formProceso.get('paginaActual')?.valueChanges.subscribe((value) => {
      if (value > this.modalInfo.pages) {
        this.formProceso.get('paginaActual')?.setValue(this.modalInfo.pages);
      }
      if (value === this.modalInfo.pages) {
        this.formProceso.get('terminado')?.setValue(true);
      }
    }));
  }

  createForm(fb: FormBuilder) {
    this.formProceso = this.formBuilder.group(this.formControl.procesoLectura);
  }

  ngOnInit() {
    this.setMinMaxDate();
  }

  submit() {
    const inicioDate: Date = this.formProceso.get('inicio')?.value;
    const finalDate: Date = this.formProceso.get('final')?.value;
    const paginaActual: number = this.formProceso.get('paginaActual')?.value;
    const terminado: boolean = this.formProceso.get('terminado')?.value;

    // Formatear las fechas al formato YYYY/MM/DD
    const inicioFormatted: string = inicioDate.toISOString().split('T')[0];
    const finalFormatted: string = finalDate.toISOString().split('T')[0];

    const dataToSend = {
      inicio: inicioFormatted,
      final: finalFormatted,
      paginaActual: paginaActual,
      terminado: terminado,
    };

    // TODO ENVIAR FORMULARIO PROCESO LECTURA --> SI PONE QUE LO HA TERMINADO DE LEER, ESTADO LIBRO PONERLO A TERMINADO
    console.log(dataToSend);
    this.dialogRef.close();
  }

  setMinMaxDate() {
    this.minDate.setFullYear(this.maxDate.getFullYear() - 5);
  }

  updatePageInput() {
    if (this.formProceso.get('terminado')?.value) {
      this.formProceso.get('paginaActual')?.setValue(this.modalInfo.pages);
    } else {
      this.formProceso.get('paginaActual')?.setValue(null);
    }
  }
  

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formProceso,
      modelAttribute,
      errorAttribute
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
