import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ValoracionData } from 'src/app/shared/models/comentario/comentario';

@Component({
  selector: 'app-user-valoracion-modal',
  templateUrl: './user-valoracion-modal.component.html',
  styleUrls: ['./user-valoracion-modal.component.scss']
})
export class UserValoracionModalComponent implements OnInit, OnDestroy {

  modalInfo: ValoracionData = {
    id: 1,
  };
  tituloLibro: string = '';
  procedenciaModal: boolean = false;
  private submitted = false;

  formValoracion!: FormGroup;
  matcher!: FormErrorStateMatcher;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ValoracionData, titulo: string, procedenciaModal?: boolean },
    private dialogRef: MatDialogRef<UserValoracionModalComponent>,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
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
      if (this.procedenciaModal && !this.submitted) {
        this.sendDataToServer(this.modalInfo);
        console.log('before closed');
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

    console.log('submit');
    this.dialogRef.close();
  }

  sendDataToServer(data: any) {
    //TODO LLAMADA AL SERVIDOR CON LOS DATOS QUE HAY EN EL modalInfo: ValoracionData
    //RELLENO SOLO CON LOS DATOS DEL MODAL ANTERIOR (TRUE) O CON TODO (SUBMIT FORMUALRIO)
    console.log('Datos enviados exitosamente');
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formValoracion,
      modelAttribute,
      errorAttribute
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}