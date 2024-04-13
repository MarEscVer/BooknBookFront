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
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
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
import { FormErrorStateMatcher } from './shared/errors/form-error-state-matcher';
import { LoginAndRegisterComponent } from './components/loginAndRegister/login-and-register/login-and-register.component';
import { HomeComponent } from './components/home/home/home.component';
import { MessageErrorComponent } from './components/messages/message-error/message-error.component';
import { GlobalErrorHandler } from './interceptors/global-error-handler';
import { ServerErrorInterceptor } from './interceptors/server-error.interceptor';
import { SharedModule } from './shared/shared.module';
import { NavbarComponent } from './components/barraNavegacion/header/navbar/navbar.component';
import { ListClicksComponent } from './components/home/listClicks/list-clicks.component';
import { MatTableModule } from '@angular/material/table';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeaderComponent } from './components/barraNavegacion/header/header.component';
import { MatListModule } from "@angular/material/list";
import { MenuAdminComponent } from './components/admin/menu-admin/menu-admin.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { MenuItemComponent } from './components/barraNavegacion/menu/menu-item/menu-item.component';
import { MenuComponent } from './components/barraNavegacion/menu/menu.component';
import { ListadoItemComponent } from './components/listado/listado-item/listado-item.component';
import { ListadoUsuarioAdminComponent } from './components/admin/listado-usuario-admin/listado-usuario-admin.component';

@NgModule({
  /* SELF COMPONENTS */
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoginAndRegisterComponent,
    HomeComponent,
    MessageErrorComponent,
    NavbarComponent,
    ListClicksComponent,
    HeaderComponent,
    MenuAdminComponent,
    AdminPageComponent,
    MenuItemComponent,
    MenuComponent,
    ListadoItemComponent,
    ListadoUsuarioAdminComponent,
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
    MatListModule
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