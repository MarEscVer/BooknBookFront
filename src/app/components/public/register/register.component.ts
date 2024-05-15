import { Component, HostBinding, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneroTipoService } from 'src/app/services/genero/genero-tipo.service';
import { UserMapperService } from 'src/app/services/mappers/mapper/user-mapper.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Combo, ComboImagen } from 'src/app/shared/models/combo/combo';

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

  favoriteType: number | null = null; 
  favoriteGender: number | null = null; 

  typeOptions: Combo[] = [];
  genderOptions: Combo[] = [];

  typeOptionsImagenes: ComboImagen[] = [];
  genderOptionsImagenes: ComboImagen[] = [];

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
    private generoTipoService: GeneroTipoService,
    private notification: NotificationService
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }
  createForm(fb: FormBuilder) {
    this.formRegister = this.formBuilder.group(this.formControl.register);
  }

  ngOnInit() {
    this.obtenerGeneroTipo();
  }


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
            this.router.navigate(['/register/intereses']);
          } else {
            this.notification.show(data, 'error');
          }
        },
        error: (error) => { },
      }));
  }

  selectOptionType(optionId: number) {
    this.favoriteType = optionId;
    this.formRegister.controls['tipo'].setValue(optionId);
  }

  selectOptionGender(optionId: number) {
    this.favoriteGender = optionId;
    this.formRegister.controls['genero'].setValue(optionId);
  }

  obtenerGeneroTipo(): void {
    this.subscriptions.add(this.generoTipoService.getGeneroTipo().subscribe(
      (data) => {
        this.typeOptions = data.tipo.valores;
        this.genderOptions = data.genero.valores;
        this.setImagenOpciones();
      }
    ));
  }

  setImagenOpciones() {

    type ImagenesTipo = {
      [key: string]: string;
    };

    type ImagenesGenero = {
      [key: string]: string;
    };

    const imagenesTipo: ImagenesTipo = {
      "FICCIÓN": "/assets/img/genero/ficcion.png",
      "NO FICCIÓN": "/assets/img/genero/noficcion.png",
      "JUVENIL": "/assets/img/genero/juvenil.png",
      "INFANTIL": "/assets/img/genero/infantil.png"
    };

    const imagenesGenero: ImagenesGenero= {
      "ROMÁNTICA": "/assets/img/genero/romantica.png",
      "TERROR": "/assets/img/genero/terror.png",
      "NEGRA": "/assets/img/genero/negra.png",
      "HUMOR": "/assets/img/genero/humor.png",
      "HISTÓRICA": "/assets/img/genero/historica.png",
      "FANTÁSTICA": "/assets/img/genero/fantastica.png",
      "CIENCIA FICCIÓN": "/assets/img/genero/cienciaficcion.png",
    };
    if (imagenesTipo && imagenesGenero) {

      this.typeOptionsImagenes = this.typeOptions.map(opcion => ({
        id: opcion.id,
        nombre: opcion.nombre,
        imagen: imagenesTipo[opcion.nombre]
      }));

      this.genderOptionsImagenes = this.genderOptions.map(opcion => ({
        id: opcion.id,
        nombre: opcion.nombre,
        imagen: imagenesGenero[opcion.nombre]
      }));

    }
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formRegister,
      modelAttribute,
      errorAttribute
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
