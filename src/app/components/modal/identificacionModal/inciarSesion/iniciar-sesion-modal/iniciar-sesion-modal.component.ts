import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ModalInfo } from 'src/app/shared/models/modal/modal';

@Component({
  selector: 'app-iniciar-sesion-modal',
  templateUrl: './iniciar-sesion-modal.component.html',
  styleUrls: ['./iniciar-sesion-modal.component.scss']
})
export class IniciarSesionModalComponent implements OnInit, OnDestroy {
  modalInfo: ModalInfo = {
    id: 0,
    title: ''
  };

  formLogin!: FormGroup;
  matcher!: FormErrorStateMatcher;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { modalInfo: ModalInfo },
    private dialogRef: MatDialogRef<IniciarSesionModalComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formControl: InputErrorStateMatcherExample,
    private userService: UserService,
    private notification: NotificationService,
    private authService: AuthService
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
    if (data && data.modalInfo) {
      this.modalInfo = data.modalInfo;
    }
  }

  createForm(fb: FormBuilder) {
    this.formLogin = this.formBuilder.group(this.formControl.login);
  }

  ngOnInit() { }

  submit() {
    this.subscriptions.add(this.userService.login(this.formLogin.getRawValue()).subscribe({
      next: (data) => {
        if (data) {
          this.authService.setCookie("token", data.bearer, 7);
          this.authService.setCookie("rol", data.rol, 7);
          this.authService.setCookie("username", data.username, 7);
          this.notification.show(
            'Se ha iniciado Sesion Correctamente',
            'success'
          );
          this.authService.iniciarSession();
          this.dialogRef.close();
        }
      }
    }));
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formLogin,
      modelAttribute,
      errorAttribute
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}