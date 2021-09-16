import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizeGuard } from '../guard/authorize.guard';

import { LoginComponent } from '../login/login.component';
import { PlatformComponent } from './platform.component';
import { HomeComponent } from '../modules/home/home.component';
import { ProfilesComponent } from '../modules/admin/profiles/profiles.component';
import { ProfilesUsersComponent } from '../modules/admin/profiles-users/profiles-users.component';
import { CargosComponent } from '../modules/param/cargos/cargos.component';
import { GradosComponent } from '../modules/param/grados/grados.component';
import { ValoresFlexiblesComponent } from '../modules/param/valores-flexibles/valores-flexibles.component';
import { RequerimientosComponent } from '../modules/param/requerimientos/requerimientos.component';
import { PiramidesComponent } from '../modules/consultas/piramides/piramides.component';
import { RutaComponent } from '../modules/consultas/ruta/ruta.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'fac', component: PlatformComponent, children: [
    { path: 'home', component: HomeComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/admin/perfiles', component: ProfilesComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/admin/perfiles-usuarios', component: ProfilesUsersComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/param/cargos', component: CargosComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/param/grados', component: GradosComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/param/valores-flexibles', component: ValoresFlexiblesComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/param/requerimientos', component: RequerimientosComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/consultas/piramide', component: PiramidesComponent, canActivate: [ AuthorizeGuard ] },
    { path: 'modulo/consultas/ruta', component: RutaComponent, canActivate: [ AuthorizeGuard ] }
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatformRoutingModule { }
