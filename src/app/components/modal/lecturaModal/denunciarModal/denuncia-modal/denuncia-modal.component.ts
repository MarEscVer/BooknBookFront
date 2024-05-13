import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Combo } from 'src/app/shared/models/combo/combo';
import { ModalInfoDenuciaComentario } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-denuncia-modal',
  templateUrl: './denuncia-modal.component.html',
  styleUrls: ['./denuncia-modal.component.scss']
})
export class DenunciaModalComponent implements OnInit, OnDestroy {

  modalInfo!: ModalInfoDenuciaComentario;
  datosComboMotivo?: Combo[];

  formDenuncia!: FormGroup;
  matcher!: FormErrorStateMatcher;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    public comentarioService: ComentarioService,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfoDenuciaComentario },
    private dialogRef: MatDialogRef<DenunciaModalComponent>,
  ){
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(this.formBuilder);
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
  }

  createForm(fb: FormBuilder) {
    this.formDenuncia = this.formBuilder.group(this.formControl.denuncia);
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.subscriptions.add(
      this.comentarioService.getComboMotivoDenuncia().subscribe(data => {
        if (data.valores) {
          this.datosComboMotivo = data.valores;
        }
      })
    );
  }

  submit(){
    //TODO LLAMAR SERVIDOR CON LOS DATOS DE LA DENUNCIA --> ID LIBRO + USERNAME DEL COMENTARIO ESTÁN EN EL MODALINFO
    console.log(this.formDenuncia.value);
    this.dialogRef.close();
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formDenuncia,
      modelAttribute,
      errorAttribute
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
