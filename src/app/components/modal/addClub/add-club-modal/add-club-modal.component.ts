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

@Component({
  selector: 'app-add-club-modal',
  templateUrl: './add-club-modal.component.html',
  styleUrls: ['./add-club-modal.component.scss']
})
export class AddClubModalComponent implements OnDestroy, OnInit {

  formAddClub!: FormGroup;
  clubData?: ClubData;
  matcher!: FormErrorStateMatcher;

  favoriteType?: string;
  favoriteGender?: string;
  typeOptions: string[] = ['JUVENIL', 'INFANTIL', 'FICCION', 'NO FICCION'];
  genderOptions: string[] = ['ROMANTICA', 'NEGRA', 'HISTORICA', 'HUMOR', 'TERROR', 'CIENCIA FICCION', 'FANTASTICA'];

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
              'Clun añadido correctamente!',
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
