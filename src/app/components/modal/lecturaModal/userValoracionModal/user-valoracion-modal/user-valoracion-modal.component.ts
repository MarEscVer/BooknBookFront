import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ModalInfo } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-user-valoracion-modal',
  templateUrl: './user-valoracion-modal.component.html',
  styleUrls: ['./user-valoracion-modal.component.scss']
})
export class UserValoracionModalComponent implements OnInit, OnDestroy {

  modalInfo: ModalInfo = {
    id: 0,
    title: ''
  };

  formValoracion!: FormGroup;
  matcher!: FormErrorStateMatcher;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfo },
    private dialogRef: MatDialogRef<UserValoracionModalComponent>,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(this.formBuilder);
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
  }

  createForm(fb: FormBuilder) {
    this.formValoracion = this.formBuilder.group(this.formControl.valoracionEstrellas);
  }

  ngOnInit() { }

  submit() {
    // TODO ENVIAR FORMULARIO VALORACION + PONER LIBRO CON ESTADO LEÍDO (MODALINFO ID LIBRO) + USUARIO TOKEN
    console.log(this.formValoracion.value);
    this.dialogRef.close();
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