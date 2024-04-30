import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { BookData } from 'src/app/shared/models/book/book';
import { Combo } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-admin-page-add-book',
  templateUrl: './admin-page-add-book.component.html',
  styleUrls: ['./admin-page-add-book.component.scss']
})
export class AdminPageAddBookComponent implements OnDestroy, OnInit {

  formAddBook!: FormGroup;
  matcher!: FormErrorStateMatcher;

  imageSelected: boolean = false;

  typeSelected?: Combo;
  genderSelected?: Combo;
  addingNewSaga: boolean = false;

  //MOCK DATA
  autores: Combo[] = [{ id: 1, name: 'AUTOR1' }, { id: 2, name: 'AUTOR2' }, { id: 3, name: 'AUTOR3' }];
  autoresFiltrados: Combo[] = [];
  sagas: Combo[] = [{ id: 1, name: 'SAGA1' }];
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
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }

  createForm(fb: FormBuilder) {
    this.formAddBook = this.formBuilder.group(this.formControl.addBook);
  }

  ngOnInit() {
    this.subscriptions.add(this.formAddBook.get('autor')?.valueChanges.subscribe(value => {
      if (value == null || value == 0) {
        this.formAddBook.controls['saga'].disable();
        this.formAddBook.controls['saga'].reset();
      } else {
        this.formAddBook.controls['saga'].enable();
      }
    }));
  }

  submit() {
    return this.subscriptions.add(this.bookService
      .addBook(this.formAddBook.getRawValue())
      .subscribe({
        next: (data) => {
          if (data) {
            this.notification.show(
              'Libro añadido correctamente!',
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
      this.formAddBook,
      modelAttribute,
      errorAttribute
    );
  }

  handleImageSelected(imageSelected: boolean) {
    this.imageSelected = imageSelected;
  }

  filtrarAutores(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const texto = inputElement.value;
    if (texto.length > 0) {
      this.autoresFiltrados = this.autores.filter(autor =>
        autor.name.toLowerCase().includes(texto.toLowerCase())
      );
    } else {
      this.autoresFiltrados = [];
      this.formAddBook.get('autor')?.reset();
    }
  }


  toggleAddingSaga() {
    this.addingNewSaga = !this.addingNewSaga;
    if (!this.addingNewSaga) {
      this.formAddBook.get('newSagaName')?.setValue(null);
    }
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}