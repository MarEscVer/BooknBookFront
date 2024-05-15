import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { UserService } from 'src/app/services/user/user.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  formLogin!: FormGroup;
  matcher!: FormErrorStateMatcher;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  /**
   * Aplicar una clase al elemento raíz.
   */
  @HostBinding('class') class = "app-login";

  constructor(
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
          this.router.navigate(['/home']);
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
