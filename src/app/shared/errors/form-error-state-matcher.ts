import {
    FormControl,
    FormGroup,
    FormGroupDirective,
    NgForm
  } from '@angular/forms';
  import {ErrorStateMatcher} from '@angular/material/core';
  

export class FormErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }

    isErrorStateSpecific(control: FormGroup | null, formAttribute: string, errorAttribute: string){   
      return control?.get(formAttribute)?.getError(errorAttribute);
    }
}


