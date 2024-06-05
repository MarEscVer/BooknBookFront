import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { GeneroTipoService } from 'src/app/services/genero/genero-tipo.service';
import { ImagenUploadService } from 'src/app/services/imagenUpload/imagen-upload.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { UserService } from 'src/app/services/user/user.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { Combo } from 'src/app/shared/models/combo/combo';
import { PerfilUsuarioData, UpdatePerfilData } from 'src/app/shared/models/users/user';

@Component({
  selector: 'app-edit-perfil',
  templateUrl: './edit-perfil.component.html',
  styleUrls: ['./edit-perfil.component.scss']
})
export class EditPerfilComponent implements OnDestroy, OnInit {

  formeEditUser!: FormGroup;
  matcher!: FormErrorStateMatcher;
  perfilUsuario?: UpdatePerfilData;
  selectedFile?: File;
  urlImagenDelServidor?: string;

  typeOptions: Combo[] = [];
  genderOptions: Combo[] = [];
  userUsername?: string | null;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private uploadService: ImagenUploadService,
    private route: ActivatedRoute,
    private router: Router,
    private generoTipoService: GeneroTipoService,
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }

  createForm(fb: FormBuilder) {
    this.formeEditUser = this.formBuilder.group({
      username: [''],
      nombre: [''],
      email: ['', [Validators.email]],
      password: [''],
      idTipo: [''],
      idGenero: [''],
      apellidoPrimero: [''],
      apellidoSegundo: [''],
    });
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.authService.userUsername$.subscribe(username => {
        this.userUsername = username;
        this.loadData();
        this.obtenerGeneroTipo();
      })
    );
  }

  loadData() {
    if (this.userUsername) {
      this.subscriptions.add(this.userService.getEditUser(this.userUsername).subscribe(data => {
        if (data) {
          this.perfilUsuario = data;
          this.formeEditUser.patchValue({
            username: data.username,
            nombre: data.nombre,
            apellidoPrimero: data.apellidoUno,
            apellidoSegundo: data.apellidoDos,
            idGenero: data.genero.id,
            idTipo: data.tipo.id,
            email: data.email,
            password: data.password
          });
          this.urlImagenDelServidor = data.imagenPerfil;
        }
      })
      );
    }
  }

  private uploadImage(id: number): void {
    if (this.selectedFile) {
      this.subscriptions.add(this.uploadService.uploadUser(id, this.selectedFile).subscribe({
        next: (event) => {
          this.notification.show(
            'Imagen subida correctamente',
            'success'
          );
          this.router.navigate(['/mi-despacho/perfil']);
        },
      }));
    }
  }

  submit() {
    const userData = this.formeEditUser.getRawValue();
    return this.subscriptions.add(this.userService.editUser(userData)
      .subscribe({
        next: (user) => {
          this.notification.show(
            user.message,
            'success'
          );
          this.uploadImage(user.id);
        },
        error: (error) => {
          this.notification.show('No se ha podido editar el perfil', 'error');
        },
      }));
  }

  handleImageSelected(file: File) {
    this.selectedFile = file;
  }

  obtenerGeneroTipo(): void {
    this.subscriptions.add(this.generoTipoService.generoTipo$.subscribe(
      (data) => {
        if (data) {
          this.typeOptions = data.tipo.valores;
          this.genderOptions = data.genero.valores;
        }
      }
    ));
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formeEditUser,
      modelAttribute,
      errorAttribute
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}