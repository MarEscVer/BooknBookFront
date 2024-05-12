import { ErrorHandler, NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { MatTabsModule} from '@angular/material/tabs';
import { MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgIf } from '@angular/common';
import { InputErrorStateMatcherExample } from './shared/errors/input-error-state-matcher';
import { FormErrorStateMatcher } from './shared/errors/form-error-state-matcher';import { HomeComponent } from './components/user/home/home.component';
import { MessageErrorComponent } from './components/messages/message-error/message-error.component';
import { GlobalErrorHandler } from './interceptors/global-error-handler';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './components/barraNavegacion/header/navbar/navbar.component';
import { MatTableModule } from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './components/barraNavegacion/header/header.component';
import { MatListModule } from "@angular/material/list";
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';
import { AdminPageComponent } from './components/admin/pages/admin-page/admin-page.component';
import { MenuItemComponent } from './components/barraNavegacion/menu/menu-item/menu-item.component';
import { MenuComponent } from './components/barraNavegacion/menu/menu.component';
import { ListadoUsuarioAdminComponent } from './components/admin/listados-admin/listado-usuario-admin/listado-usuario-admin.component';
import { ListadoItemsUsersComponent } from './components/admin/listados-admin/items/listado-items-users/listado-items-users.component';
import { ListadoItemsBooksComponent } from './components/admin/listados-admin/items/listado-items-books/listado-items-books.component';
import { ListadoItemsClubsComponent } from './components/admin/listados-admin/items/listado-items-clubs/listado-items-clubs.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import { AdminPageUsersComponent } from './components/admin/pages/admin-page-users/admin-page-users.component';
import { ListadoLibrosAdminComponent } from './components/admin/listados-admin/listado-libros-admin/listado-libros-admin.component';
import { ListadoClubesAdminComponent } from './components/admin/listados-admin/listado-clubes-admin/listado-clubes-admin.component';
import { AdminPageClubsComponent } from './components/admin/pages/admin-page-clubs/admin-page-clubs.component';
import { ListadoItemsComentariosComponent } from './components/admin/listados-admin/items/listado-items-comentarios/listado-items-comentarios.component';
import { AdminPageModeracionComponent } from './components/admin/pages/admin-page-moderacion/admin-page-moderacion.component';
import { ListadoModeracionAdminComponent } from './components/admin/listados-admin/listado-moderacion-admin/listado-moderacion-admin.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DeleteButtonComponent } from './components/modal/deleteModal/delete-button/delete-button.component'; 
import { DeleteModalComponent } from './components/modal/deleteModal/delete-modal/delete-modal.component';
import { AddClubModalComponent } from './components/modal/addClub/add-club-modal/add-club-modal.component';
import { AddClubButtonComponent } from './components/modal/addClub/add-club-button/add-club-button.component';
import { ImagenUpdateComponent } from './components/imagenUpload/imagen-update/imagen-update.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AdminPageAddBookComponent } from './components/admin/pages/admin-page-add-book/admin-page-add-book.component';
import { AddAutorButtonComponent } from './components/modal/addAutor/add-autor-button/add-autor-button.component';
import { AddAutorModalComponent } from './components/modal/addAutor/add-autor-modal/add-autor-modal.component';
import { AcceptButtonComponent } from './components/modal/acceptModal/accept-button/accept-button.component';
import { AcceptModalComponent } from './components/modal/acceptModal/accept-modal/accept-modal.component';
import { ValoracionButtonComponent } from './components/modal/valoracionModal/valoracion-button/valoracion-button.component';
import { ValoracionModalComponent } from './components/modal/valoracionModal/valoracion-modal/valoracion-modal.component';
import { CarouselImagenComponent } from './components/user/home/carousel-imagen/carousel-imagen.component';
import { ItemBookCardComponent } from './components/user/pages/biblioteca/paginador-list-book/item-book-card/item-book-card.component';
import { FooterComponent } from './components/barraNavegacion/footer/footer.component';
import { QuienesSomosComponent } from './components/user/pages/quienes-somos/quienes-somos.component';
import { MenuDesplegableComponent } from './components/barraNavegacion/menuDesplegable/menu-desplegable/menu-desplegable.component';
import { MenuDesplegableItemComponent } from './components/barraNavegacion/menuDesplegable/menu-desplegable/menu-desplegable-item/menu-desplegable-item.component';
import {MatMenuModule} from '@angular/material/menu';
import { BibliotecaComponent } from './components/user/pages/biblioteca/pages/biblioteca/biblioteca.component';
import { ImagenListBookCardComponent } from './components/user/pages/biblioteca/paginador-list-book/imagen-list-book-card/imagen-list-book-card.component';
import { BreadcumbComponent } from './components/barraNavegacion/breadcumb/breadcumb.component';
import { BibliotecaGeneroComponent } from './components/user/pages/biblioteca/pages/biblioteca-genero/biblioteca-genero.component';
import { PaginadorListBookComponent } from './components/user/pages/biblioteca/paginador-list-book/paginador-list-book.component';
import { LibroComponent } from './components/user/pages/biblioteca/pages/libro/libro.component';
import { FichaLibroComponent } from './components/user/pages/biblioteca/ficha-libro/ficha-libro.component';
import { EstrellasComponent } from './components/user/pages/biblioteca/estrellas/estrellas.component';
import { ValoracionTableItemComponent } from './components/user/pages/biblioteca/valoracion-table/valoracion-table-item/valoracion-table-item.component';
import { ValoracionTableComponent } from './components/user/pages/biblioteca/valoracion-table/valoracion-table.component';
import { AutorComponent } from './components/user/pages/biblioteca/pages/autor/autor.component';

@NgModule({
  /* SELF COMPONENTS */
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    MessageErrorComponent,
    NavbarComponent,
    HeaderComponent,
    MenuAdminComponent,
    AdminPageComponent,
    MenuItemComponent,
    MenuComponent,
    ListadoUsuarioAdminComponent,
    ListadoItemsUsersComponent,
    ListadoItemsBooksComponent,
    ListadoItemsClubsComponent,
    AdminPageUsersComponent,
    ListadoLibrosAdminComponent,
    ListadoClubesAdminComponent,
    AdminPageClubsComponent,
    ListadoItemsComentariosComponent,
    ListadoModeracionAdminComponent,
    AdminPageModeracionComponent,
    DeleteButtonComponent,
    DeleteModalComponent,
    AddClubModalComponent,
    AddClubButtonComponent,
    ImagenUpdateComponent,
    AdminPageAddBookComponent,
    AddAutorButtonComponent,
    AddAutorModalComponent,
    AcceptButtonComponent,
    AcceptModalComponent,
    ValoracionButtonComponent,
    ValoracionModalComponent,
    CarouselImagenComponent,
    ItemBookCardComponent,
    FooterComponent,
    QuienesSomosComponent,
    MenuDesplegableComponent,
    MenuDesplegableItemComponent,
    BibliotecaComponent,
    ImagenListBookCardComponent,
    BreadcumbComponent,
    BibliotecaGeneroComponent,
    PaginadorListBookComponent,
    LibroComponent,
    FichaLibroComponent,
    EstrellasComponent,
    ValoracionTableItemComponent,
    ValoracionTableComponent,
    AutorComponent
  ],
  /* LIBRARIES */
  imports: [
    ToastrModule.forRoot({ toastComponent: MessageErrorComponent }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatCardModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatGridListModule,
    NgIf,
    MatSnackBarModule,
    MatToolbarModule,
    FontAwesomeModule,
    SharedModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatDialogModule,
    MatRadioModule,
    MatProgressBarModule,
    MatMenuModule,
  ],
  /* SERVICE */
  providers: [
    { provide: InputErrorStateMatcherExample, useClass: FormErrorStateMatcher },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true,
    },
    MessageErrorComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}