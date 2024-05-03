import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClubService } from 'src/app/services/club/club.service';
import { ImagenUploadService } from 'src/app/services/imagenUpload/imagen-upload.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ClubData, ClubEdit } from 'src/app/shared/models/club/club';
import { Combo } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-add-club-modal',
  templateUrl: './add-club-modal.component.html',
  styleUrls: ['./add-club-modal.component.scss']
})
export class AddClubModalComponent implements OnDestroy, OnInit {

  formAddClub!: FormGroup;
  clubData?: ClubData;
  clubEdit?: ClubEdit;
  matcher!: FormErrorStateMatcher;

  selectedFile?: File;
  urlImagenDelServidor?: string;

  isEditing: boolean = false;

  favoriteType?: Combo;
  favoriteGender?: Combo;

  //MOCK DATA
  typeOptions: Combo[] = [
    { id: 1, name: 'JUVENIL' },
    { id: 2, name: 'INFANTIL' },
    { id: 3, name: 'FICCION' },
    { id: 4, name: 'NO FICCION' }
  ];
  genderOptions: Combo[] = [
    { id: 1, name: 'ROMANTICA' },
    { id: 2, name: 'NEGRA' },
    { id: 3, name: 'HISTORICA' },
    { id: 4, name: 'HUMOR' },
    { id: 5, name: 'TERROR' },
    { id: 6, name: 'CIENCIA FICCION' },
    { id: 7, name: 'FANTASTICA' }
  ];

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: ImagenUploadService,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { clubId: number },
    public dialogRef: MatDialogRef<AddClubModalComponent>) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm();
  }

  createForm() {
    this.formAddClub = this.formBuilder.group(this.formControl.addClub);
  }

  loadClubData(clubId: number) {
    this.subscriptions.add(
      this.clubService.getClubById(clubId).subscribe((clubEdit) => {
        this.formAddClub.patchValue(clubEdit);
        this.urlImagenDelServidor = clubEdit.img; 
      }));
  }

  ngOnInit() {
    if (this.data && this.data.clubId) {
      this.loadClubData(this.data.clubId);
      this.isEditing = true;
    }
  }

  submit() {
    const clubData = this.formAddClub.getRawValue()
    return this.subscriptions.add(this.clubService
      .addClub(clubData)
      .subscribe({
        next: (clubAdded) => {
          this.notification.show(
            'Club añadido correctamente!',
            'success'
          );
          this.uploadImage(clubData.id);

          //TODO redirigir a pantalla grupo creado
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.notification.show('No se ha podido añadir el club', 'error');
        },
      }));
  }

  submitEdit() {
    const clubData = this.formAddClub.getRawValue()
    return this.subscriptions.add(this.clubService
      .editClub(clubData, this.data.clubId)
      .subscribe({
        next: (clubAdded) => {
          this.notification.show(
            'Club editado correctamente!',
            'success'
          );
          this.uploadImage(clubData.id);

          //TODO redirigir a pantalla grupo creado
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.notification.show('No se ha podido editar el club', 'error');
        },
      }));
  }

  private uploadImage(idGrupo: number): void {
    if (this.selectedFile) {
      this.subscriptions.add(this.uploadService.uploadGrupo(idGrupo, this.selectedFile).subscribe({
        next: (event) => {
          this.notification.show(
            'Imagen subida correctamente',
            'success'
          );
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.dialogRef.close(true);
        }
      }));
    }
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formAddClub,
      modelAttribute,
      errorAttribute
    );
  }

  handleImageSelected(file: File) {
    this.selectedFile = file;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}