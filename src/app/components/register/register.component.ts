import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserMapperService } from 'src/app/services/mappers/mapper/user-mapper.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  repeatPassword!: string;
  formRegister!: FormGroup;
  firstNameAutofilled: boolean = false;
  lastNameAutofilled: boolean = false;
  matcher!: FormErrorStateMatcher;

  /**
   * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
   */
  private subscriptions: Subscription = new Subscription();

  /**
   * Aplicar una clase al elemento raíz.
   */
  @HostBinding('class') class = "app-register";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formControl: InputErrorStateMatcherExample,
    private mapperUser: UserMapperService,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }
  createForm(fb: FormBuilder) {
    this.formRegister = this.formBuilder.group(this.formControl.register);
  }
  ngOnInit() { }
  submit() {
    return this.subscriptions.add(this.userService
      .register(this.formRegister.getRawValue())
      .subscribe({
        next: (data) => {
          if (data) {
            this.notification.show(
              'Registro Realizado correctamente!',
              'success'
            );
            this.router.navigate(['/home']);
          } else {
            this.notification.show(data, 'error');
          }
        },
        error: (error) => { },
      }));
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formRegister,
      modelAttribute,
      errorAttribute
    );
  }

  public ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

}
