import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AutorService } from 'src/app/services/autor/autor.service';
import { BookService } from 'src/app/services/book/book.service';
import { GeneroTipoService } from 'src/app/services/genero/genero-tipo.service';
import { ImagenUploadService } from 'src/app/services/imagenUpload/imagen-upload.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { FormErrorStateMatcher } from 'src/app/shared/errors/form-error-state-matcher';
import { InputErrorStateMatcherExample } from 'src/app/shared/errors/input-error-state-matcher';
import { AutorIcon } from 'src/app/shared/models/autor/autor';
import { Book, BookDataId } from 'src/app/shared/models/book/book';
import { Combo } from 'src/app/shared/models/combo/combo';

@Component({
  selector: 'app-admin-page-add-book',
  templateUrl: './admin-page-add-book.component.html',
  styleUrls: ['./admin-page-add-book.component.scss']
})
export class AdminPageAddBookComponent implements OnDestroy, OnInit {

  formAddBook!: FormGroup;
  matcher!: FormErrorStateMatcher;
  bookData?: BookDataId;
  bookEdit?: Book;

  selectedFile?: File;
  urlImagenDelServidor?: string;

  isEditing: boolean = false;
  bookId?: number;

  typeSelected?: Combo;
  genderSelected?: Combo;
  addingNewSaga: boolean = false;
  autoresFiltrados: Combo[] = [];

  autorIconEdit: AutorIcon =
    { iconName: 'pen', iconPrefix: 'fas' }

  autorIconAdd: AutorIcon =
    { iconName: 'plus', iconPrefix: 'fas' }

  autores: Combo[] = [];
  sagas: Combo[] = [];
  typeOptions: Combo[] = [];
  genderOptions: Combo[] = [];
  initialFormValue: any;

  /**
  * Seguimiento de las suscripciones en TS para poder cancelarlas en OnDestroy.
  */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private formControl: InputErrorStateMatcherExample,
    private notification: NotificationService,
    private uploadService: ImagenUploadService,
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private generoTipoService: GeneroTipoService,
    private autorService: AutorService,
  ) {
    this.formControl = new InputErrorStateMatcherExample();
    this.matcher = this.formControl.matcher;
    this.createForm(formBuilder);
  }

  createForm(fb: FormBuilder) {
    this.formAddBook = this.formBuilder.group(this.formControl.addBook);
  }

  ngOnInit() {
    this.bookId = +this.route.snapshot.params['id'];
    if (this.bookId) {
      this.bookService.getBookById(this.bookId).subscribe((bookEdit) => {
        this.rellenarBook(bookEdit);
        this.urlImagenDelServidor = bookEdit.imagen;
        this.bookEdit = bookEdit;
        this.initialFormValue = this.formAddBook.value;
      });
      this.isEditing = true;
    }

    this.obtenerGeneroTipo();
    this.obtenerAutores();

    this.subscriptions.add(this.formAddBook.get('autor')?.valueChanges.subscribe(value => {
      if (value == null || value == 0) {
        this.formAddBook.controls['saga'].disable();
        this.formAddBook.controls['saga'].reset();
      } else {
        this.formAddBook.controls['saga'].enable();
      }
    }));
  }

  rellenarBook(book: Book) {
    this.formAddBook.setValue({
      nombre: book.titulo,
      autor: book.idAutor,
      saga: book.saga,
      tipo: book.tipo ? book.tipo.id : 0,
      genero: book.genero ? book.genero.id : 0,
      fechaPublicacion: book.anyo,
      paginas: book.paginasTotales,
      descripcion: book.descripcion,
      nuevaSaga: ''
    });
  }

  submit() {
    const bookData = this.formAddBook.getRawValue();
    return this.subscriptions.add(this.bookService
      .addBook(bookData)
      .subscribe({
        next: (bookAdded) => {
          this.notification.show(
            'Libro añadido correctamente!',
            'success'
          );
          this.uploadImage(bookAdded.id);
          this.router.navigate(['/admin']);
        },
        error: (error) => {
          this.notification.show('No se ha podido añadir el libro', 'error');
        },
      }));
  }

  submitEdit() {
    const bookData = this.formAddBook.getRawValue();
    if (this.bookId) {
      return this.subscriptions.add(this.bookService
        .editBook(bookData, this.bookId)
        .subscribe({
          next: (bookAdded) => {
            this.notification.show(
              'Libro editado correctamente!',
              'success'
            );
            this.uploadImage(bookData.id);
            this.router.navigate(['/admin']);
          },
          error: (error) => {
            this.notification.show('No se ha podido editar el libro', 'error');
          },
        }));
    }
  }

  private uploadImage(idLibro: number): void {
    if (this.selectedFile) {
      this.subscriptions.add(this.uploadService.uploadBook(idLibro, this.selectedFile).subscribe({
        next: (event) => {
          this.notification.show(
            'Imagen subida correctamente',
            'success'
          );
          this.router.navigate(['/admin']);
        },
      }));
    }
  }

  specificError(modelAttribute: string, errorAttribute: string) {
    return this.matcher.isErrorStateSpecific(
      this.formAddBook,
      modelAttribute,
      errorAttribute
    );
  }

  handleImageSelected(file: File) {
    this.selectedFile = file;
  }

  filtrarAutores(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const texto = inputElement.value;
    this.mostrarAutores(texto.length > 0, texto);
    this.mostrarAutores(this.autoresFiltrados.length > 0, texto);
  }

  mostrarAutores(condicion: boolean, texto: string): void {
    if (condicion) {
      this.autoresFiltrados = this.autores.filter(autor =>
        autor.nombre.toLowerCase().includes(texto.toLowerCase())
      );
    } else {
      this.autoresFiltrados.length = 0;
      this.formAddBook.get('autor')?.reset();
    }
  }

  toggleAddingSaga() {
    this.addingNewSaga = !this.addingNewSaga;
    if (!this.addingNewSaga) {
      this.formAddBook.get('nuevaSaga')?.setValue(null);
    }
  }

  editarAutor(event: Event) {
    event.stopPropagation();
  }

  cancel() {
    this.router.navigate(['/admin']);
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

  obtenerAutores(): void {
    this.subscriptions.add(this.autorService.getAutores().subscribe(
      (data) => {
        this.autores = data.valores;
      }
    ));
  }

  obtenerSagaAutor(id: number): void {
    this.subscriptions.add(this.autorService.getSagaAutor(id).subscribe(
      (data) => {
        this.sagas = data.valores;
      }
    ));
  }

  autorSeleccionado(event: any) {
    const id = event?.value;
    if (id) {
      this.obtenerSagaAutor(id);
    }
  }

  recibirAutorAgregado(autor: Combo) {
    if (autor) {
      this.autores.push(autor);
      this.autoresFiltrados.push(autor);
      (document.getElementById("autorFiltro") as HTMLInputElement).value = autor.nombre;
      this.formAddBook.get('autor')?.setValue(autor.id);
    }
  }

  hasFormChanged() {
    return JSON.stringify(this.initialFormValue) !== JSON.stringify(this.formAddBook.value);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}