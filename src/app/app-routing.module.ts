import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/public/login/login.component';
import { RegisterComponent } from './components/public/register/register.component'; import { HomeComponent } from './components/public/home/home.component';
import { AdminPageComponent } from './components/admin/pages/admin-page/admin-page.component';
import { AdminPageUsersComponent } from './components/admin/pages/admin-page-users/admin-page-users.component';
import { AdminPageClubsComponent } from './components/admin/pages/admin-page-clubs/admin-page-clubs.component';
import { AdminPageModeracionComponent } from './components/admin/pages/admin-page-moderacion/admin-page-moderacion.component';
import { AdminPageAddBookComponent } from './components/admin/pages/admin-page-add-book/admin-page-add-book.component';
import { adminGuard, appGuard } from './auth/app.guard';
import { QuienesSomosComponent } from './components/public/quienes-somos/quienes-somos.component';
import { BibliotecaComponent } from './components/biblioteca/pages/biblioteca/biblioteca.component';
import { BibliotecaGeneroComponent } from './components/biblioteca/pages/biblioteca-genero/biblioteca-genero.component';
import { LibroComponent } from './components/biblioteca/pages/libro/libro.component';
import { AutorComponent } from './components/biblioteca/pages/autor/autor.component';
import { ClubesComponent } from './components/clubes/pages/clubes/clubes.component';
import { PerfilComponent } from './components/despacho/pages/perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: "quienes-somos", component: QuienesSomosComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "biblioteca", component: BibliotecaComponent },
  { path: "clubes", component: ClubesComponent },
  { path: "home", component: HomeComponent },
  { path: "biblioteca/:genero", component: BibliotecaGeneroComponent },
  { path: "biblioteca/:genero/:titulo", component: LibroComponent },
  { path: "biblioteca/autores/perfil/:nombre", component: AutorComponent },
  // REGISTRADO
  { path: "mi-despacho", component: PerfilComponent, canActivate: [appGuard] },
  { path: "mi-despacho/perfil", component: PerfilComponent, canActivate: [appGuard] },
  { path: "mi-despacho/perfil/mis-lecturas", component: PerfilComponent, canActivate: [appGuard] },
  { path: "mi-despacho/perfil/estadisticas", component: PerfilComponent, canActivate: [appGuard] },
  { path: "mi-despacho/perfil/configuracion", component: PerfilComponent, canActivate: [appGuard] },
  // ADMINISTRADOR
  { path: "admin", component: AdminPageComponent, canActivate: [appGuard, adminGuard] },
  { path: "admin/usuarios", component: AdminPageUsersComponent, canActivate: [appGuard, adminGuard] },
  { path: "admin/clubes", component: AdminPageClubsComponent, canActivate: [appGuard, adminGuard] },
  { path: "admin/moderacion", component: AdminPageModeracionComponent, canActivate: [appGuard, adminGuard] },
  { path: "admin/book", component: AdminPageAddBookComponent, canActivate: [appGuard, adminGuard] },
  { path: "admin/book/:id", component: AdminPageAddBookComponent, canActivate: [appGuard, adminGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule, FontAwesomeModule]
})
export class AppRoutingModule { }
