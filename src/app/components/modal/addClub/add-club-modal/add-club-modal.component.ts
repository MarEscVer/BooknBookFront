import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClubService } from 'src/app/services/club/club.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { ClubData } from 'src/app/shared/models/club/club';
import { Combo } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-add-club-modal',
  templateUrl: './add-club-modal.component.html',
  styleUrls: ['./add-club-modal.component.scss']
})
export class AddClubModalComponent implements OnDestroy, OnInit {

  formAddClub!: FormGroup;
  clubData?: ClubData;
  matcher!: FormErrorStateMatcher;

  imageSelected: boolean = false;

  favoriteType?: Combo;
  favoriteGender?: Combo;
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
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: { clubData: ClubData },
    public dialogRef: MatDialogRef<AddClubModalComponent>) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }

  createForm(fb: FormBuilder) {
    this.formAddClub = this.formBuilder.group(this.formControl.addClub);
  }

  ngOnInit() { }

  submit() {
    return this.subscriptions.add(this.clubService
      .addClub(this.formAddClub.getRawValue())
      .subscribe({
        next: (data) => {
          if (data) {
            this.notification.show(
              'Club añadido correctamente!',
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
      this.formAddClub,
      modelAttribute,
      errorAttribute
    );
  }

  handleImageSelected(imageSelected: boolean) {
    this.imageSelected = imageSelected;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}