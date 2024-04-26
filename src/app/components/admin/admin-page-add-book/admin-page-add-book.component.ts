import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/services/book/book.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';

@Component({
  selector: 'app-admin-page-add-book',
  templateUrl: './admin-page-add-book.component.html',
  styleUrls: ['./admin-page-add-book.component.scss']
})
export class AdminPageAddBookComponent implements OnDestroy, OnInit {

  formAddBook!: FormGroup;
  matcher!: FormErrorStateMatcher;

  imageSelected: boolean = false;

  typeSelected?: string;
  genderSelected?: string;

  autores: string[] = ['AUTOR1'];
  sagas: string[] = ['SAGA1'];
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

  ngOnInit() { }

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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
