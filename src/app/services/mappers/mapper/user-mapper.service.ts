import { Injectable } from '@angular/core';
import { Login, Register } from 'src/app/shared/models/users/user';

@Injectable({
  providedIn: 'root'
})
export class UserMapperService {
  constructor() { }

  mapToLoginRequest(bodyForm: any): Login {
    return {
      username: bodyForm.usuario,
      password: bodyForm.password,
    };
  }

  // mapToRegisterRequest(bodyForm: any): Register {
  //   return {
  //   }
  // }
}
