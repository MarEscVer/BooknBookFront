import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Book } from 'src/app/shared/models/book/book';

@Component({
  selector: 'app-interes-modal',
  templateUrl: './interes-modal.component.html',
  styleUrls: ['./interes-modal.component.scss']
})
export class InteresModalComponent implements OnInit {

  modalInfo?: Book;
  matcher!: FormErrorStateMatcher;
  formularioLibro!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: Book },
    private dialogRef: MatDialogRef<InteresModalComponent>,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
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
    //TODO LLAMADA EDIT ESTADO LECTURA
    console.log('GUARDAR');
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formularioLibro,
      modelAttribute,
      errorAttribute
    );
  }

}
