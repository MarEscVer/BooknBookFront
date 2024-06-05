import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Combo } from 'src/app/shared/models/combo/combo';
import { DenunciarComentario } from 'src/app/shared/models/comentario/comentario';
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
    private notification: NotificationService,
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
      this.comentarioService.motivoDenuncia$.subscribe(data => {
        if (data) {
          this.datosComboMotivo = data.valores;
        }
      })
    );
  }

  submit(){
    const denunciaRequest: DenunciarComentario = {
      motivo: this.formDenuncia.get('motivo')?.value,
      texto: this.formDenuncia.get('texto')?.value,
      idLibro: this.modalInfo.idLibro,
      idUsuario: this.modalInfo.idUsuario,
      grupo: false,
    }
    this.subscriptions.add(this.comentarioService.denunciarComentario(denunciaRequest).subscribe({
      next: (denuncia) => {
        this.notification.show(
          'Denuncia realizada con éxito',
          'success'
        );
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.notification.show('No se ha podido realizar la denuncia', 'error');
        this.dialogRef.close(true);
      },
    }));
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
