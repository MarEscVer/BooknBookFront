import { Component, HostBinding, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
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
    @HostBinding('class') class = "app-login";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private formControl: InputErrorStateMatcherExample,
    private userService: UserService,
    private notification: NotificationService
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }
  
  createForm(fb: FormBuilder) {
    this.formLogin = this.formBuilder.group(this.formControl.login);
  }

  ngOnInit() {
    //console.log(this.formLogin.get('email'));
  }
  
  submit() {
    this.subscriptions.add(this.userService.login(this.formLogin.getRawValue()).subscribe({
      next: (data) => {
        if (data) {
          this.notification.show(
            'Se ha iniciado Sesion Correctamente',
            'success'
          );
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
  
  public ngOnDestroy(): void{
    this.subscriptions.unsubscribe();
  }

}
