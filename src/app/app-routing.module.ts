import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';import { HomeComponent } from './components/home/home/home.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminPageUsersComponent } from './components/admin/pages/admin-page-users/admin-page-users.component';
import { AdminPageClubsComponent } from './components/admin/pages/admin-page-clubs/admin-page-clubs.component';
import { AdminPageModeracionComponent } from './components/admin/pages/admin-page-moderacion/admin-page-moderacion.component';
import { AdminPageAddBookComponent } from './components/admin/pages/admin-page-add-book/admin-page-add-book.component';
import { adminGuard, appGuard } from './auth/app.guard';
import { QuienesSomosComponent } from './components/user/pages/quienes-somos/quienes-somos.component';
import { BibliotecaComponent } from './components/user/pages/biblioteca/pages/biblioteca/biblioteca.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "quienes-somos", component: QuienesSomosComponent},
  {path: "login", component: LoginComponent},
  {path: "register", component: RegisterComponent},
  {path: "biblioteca", component: BibliotecaComponent},
  {path: "home", component: HomeComponent, canActivate: [appGuard]},
  {path: "admin", component: AdminPageComponent, canActivate: [appGuard, adminGuard]},
  {path: "admin/usuarios", component: AdminPageUsersComponent},
  {path: "admin/clubes", component: AdminPageClubsComponent},
  {path: "admin/moderacion", component: AdminPageModeracionComponent},
  {path: "admin/book", component: AdminPageAddBookComponent},
  { path: "admin/book/:id", component: AdminPageAddBookComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,FontAwesomeModule]
})
export class AppRoutingModule { }
