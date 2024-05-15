import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ValoracionData } from 'src/app/shared/models/comentario/comentario';
import { UserValoracionModalComponent } from '../../userValoracionModal/user-valoracion-modal/user-valoracion-modal.component';

@Component({
  selector: 'app-fechas-modal',
  templateUrl: './fechas-modal.component.html',
  styleUrls: ['./fechas-modal.component.scss']
})
export class FechasModalComponent implements OnInit, OnDestroy {

  modalInfo: ValoracionData = {
    id: 1,
  };
  pages: number = 0;
  tituloLibro: string = '';

  formProceso!: FormGroup;
  matcher!: FormErrorStateMatcher;

  maxDate = new Date();
  minDate = new Date();

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ValoracionData, pages: number, titulo: string },
    private dialogRef: MatDialogRef<FechasModalComponent>,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
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
    const inicioDate: Date = this.formProceso.get('inicio')?.value;
    const finalDate: Date = this.formProceso.get('final')?.value;
    const paginaActual: number = this.formProceso.get('paginaActual')?.value;
    const terminado: boolean = this.formProceso.get('terminado')?.value;

    // Formatear las fechas al formato YYYY/MM/DD
    const inicioFormatted: string = inicioDate.toISOString().split('T')[0];
    const finalFormatted: string | null = finalDate ? finalDate.toISOString().split('T')[0] : null;

    // TODO METERLO AL OBJETO QUE YA TENGO modalInfo: ValoracionData
    const dataToSend = {
      inicio: inicioFormatted,
      final: finalFormatted,
      paginaActual: paginaActual,
      terminado: terminado,
    };

    // ENVIAR FORMULARIO PROCESO LECTURA --> SI PONE QUE LO HA TERMINADO DE LEER
    // ENVIAR DATOS A MODAL USER-VALORACION Y AY AHÍ ENVIAR TODO, SINO
    // DESDE AQUÍ HACER LA LLAMADA
    if(terminado) {
      const dialogValoracion = this.dialog.open(UserValoracionModalComponent, {
        width: '50%',
        data: {
          modalInfo: this.modalInfo,
          titulo: this.tituloLibro,
          procedenciaModal: true,
        }
      });
    } else {
      // TODO LLAMADA --> ENVIAR DATOS A MODAL USER-VALORACION Y AY AHÍ ENVIAR TODO
    }
    this.dialogRef.close();
  }

  setMinMaxDate() {
    this.minDate.setFullYear(this.maxDate.getFullYear() - 5);
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

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
