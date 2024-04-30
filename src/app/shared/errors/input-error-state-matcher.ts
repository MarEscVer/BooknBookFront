import { Form, FormControl, Validators } from "@angular/forms";
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
export class InputErrorStateMatcherExample {

  getFormControl_Email(): FormControl {
    return new FormControl('', [Validators.required, Validators.email]);
  }

  getFormControl_required(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  getFormControl_nonRequired(): FormControl {
    return new FormControl('');
  }

  getFormControl_phone(): FormControl {
    //TODO: poner patrón de validacion de telefono movil segun pais cuando toque
    return new FormControl('', [Validators.minLength(9), Validators.maxLength(9)]);
  }

  getFormControl_year(): FormControl {
    //TODO: poner patrón de validacion de AÑO
    return new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
  }

  getFormControl_paginas(): FormControl {
    //TODO: poner patrón de validacion de PAGINAS
    return new FormControl('', [Validators.required]);
  }

  getFormControl_description(): FormControl {
    return new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]);
  }

  //TODO cambiar valor desde constructor del formulario
  getFormControl_gender(): FormControl {
    return new FormControl(1, [Validators.required]);
  }

  //TODO cambiar valor desde constructor del formulario
  getFormControl_type(): FormControl {
    return new FormControl(1, [Validators.required]);
  }

  getFormControl_saga(): FormControl {
    return new FormControl({value:0, disabled:true}, [Validators.required]);
  }

  getFormControl_newSaga(): FormControl {
    return new FormControl('', [Validators.minLength(1)]);
  }


  matcher = new FormErrorStateMatcher();

  login = {
    username: this.getFormControl_required(),
    password: this.getFormControl_required(),
  }

  register = {
    email: this.getFormControl_Email(),
    password: this.getFormControl_required(),
    name: this.getFormControl_required(),
    phone: this.getFormControl_phone(),
    plan: this.getFormControl_required(),
    rol: this.getFormControl_required(),
  }

  addClub = {
    nombreGrupo: this.getFormControl_required(),
    descripcion: this.getFormControl_description(),
    tipo: this.getFormControl_type(),
    genero: this.getFormControl_gender(),
  }

  addBook = {
    nombre: this.getFormControl_required(),
    autor: this.getFormControl_required(),
    saga: this.getFormControl_saga(),
    tipo: this.getFormControl_type(),
    genero: this.getFormControl_gender(),
    fechaPublicacion: this.getFormControl_year(),
    paginas: this.getFormControl_paginas(),
    descripcion: this.getFormControl_required(),
    newSagaName: this.getFormControl_newSaga(),
  }
}
