import { Form, FormControl, Validators } from "@angular/forms";
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
export class InputErrorStateMatcherExample {

  getFormControl_Email(): FormControl {
    return new FormControl('', [Validators.required, Validators.email]);
  }

  getFormControl_EmailnonRequired(): FormControl {
    return new FormControl('', [Validators.email]);
  }

  getFormControl_required(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  getFormControl_nonRequired(): FormControl {
    return new FormControl('');
  }

  getFormControl_paginas(): FormControl {
    //TODO: poner patrón de validacion de PAGINAS
    return new FormControl('', [Validators.required]);
  }

  getFormControl_description(): FormControl {
    return new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]);
  }

  getFormControl_type(): FormControl {
    return new FormControl('', [Validators.required]);
  }

  getFormControl_saga(): FormControl {
    return new FormControl({ value: 0, disabled: true });
  }

  getFormControl_texto(): FormControl {
    return new FormControl('', [Validators.minLength(1)]);
  }

  getFormControl_interes(): FormControl {
    return new FormControl('', [Validators.required]);
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
    username: this.getFormControl_required(),
    apellido1: this.getFormControl_required(),
    apellido2: this.getFormControl_required(),
    tipo: this.getFormControl_required(),
    genero: this.getFormControl_required(),
  }

  addClub = {
    nombreGrupo: this.getFormControl_required(),
    descripcion: this.getFormControl_description(),
    tipo: this.getFormControl_type(),
    genero: this.getFormControl_nonRequired(),
  }

  addBook = {
    nombre: this.getFormControl_required(),
    idAutor: this.getFormControl_required(),
    saga: this.getFormControl_saga(),
    tipo: this.getFormControl_type(),
    genero: this.getFormControl_nonRequired(),
    fechaPublicacion: this.getFormControl_required(),
    paginas: this.getFormControl_paginas(),
    descripcion: this.getFormControl_required(),
    nuevaSaga: this.getFormControl_texto(),
  }

  addAutor = {
    pseudonimo: this.getFormControl_required(),
    localidad: this.getFormControl_required(),
    biografia: this.getFormControl_texto(),
  }

  newsletter = {
    email: this.getFormControl_Email(),
  }

  addInteres = {
    estado: this.getFormControl_interes(),
  }

  valoracionEstrellas = {
    estrellas: null,
    textarea: this.getFormControl_required(),
  }

  procesoLectura = {
    inicio: this.getFormControl_required(),
    final: null,
    paginaActual: this.getFormControl_required(),
    terminado: false,
  }

  denuncia = {
    motivo: this.getFormControl_required(),
    texto: this.getFormControl_nonRequired(),
  }
}
