import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { PlatformRoutingModule } from './platform-routing.module';
import { LoginComponent } from '../login/login.component';
import { PlatformComponent } from './platform.component';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from '../modules/home/home.component';
import { ProfilesComponent } from '../modules/admin/profiles/profiles.component';
import { ProfilesUsersComponent } from '../modules/admin/profiles-users/profiles-users.component';
import { CargosComponent } from '../modules/param/cargos/cargos.component';
import { GradosComponent } from '../modules/param/grados/grados.component';
import { ValoresFlexiblesComponent } from '../modules/param/valores-flexibles/valores-flexibles.component';
import { RequerimientosComponent } from '../modules/param/requerimientos/requerimientos.component';
import { PiramidesComponent } from '../modules/consultas/piramides/piramides.component';
import { RutaComponent } from '../modules/consultas/ruta/ruta.component';
import { BreadcrumbComponent } from '../views/breadcrumb/breadcrumb.component';
import { ModalComponent } from '../views/modal/modal.component';
import { WorkflowModalComponent } from '../views/workflow-modal/workflow-modal.component';
import { ConsultaComponent } from '../modules/consultas/consulta/consulta.component';
import { ViewCargoModalComponent } from '../views/view-cargo-modal/view-cargo-modal.component';
import { VerModalComponent } from '../views/ver-modal/ver-modal.component';
import { DetalleModalComponent } from '../views/detalle-modal/detalle-modal.component';
import { PiramideModalComponent } from '../views/piramide-modal/piramide-modal.component';
import { AplicacionesComponent } from '../modules/admin/aplicaciones/aplicaciones.component';
import { SiglasComponent } from '../modules/param/siglas/siglas.component';
import { SelectListModalComponent } from '../views/select-list-modal/select-list-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    PlatformComponent,
    HomeComponent,
    ProfilesComponent,
    ProfilesUsersComponent,
    CargosComponent,
    GradosComponent,
    ValoresFlexiblesComponent,
    RequerimientosComponent,
    PiramidesComponent,
    RutaComponent,
    BreadcrumbComponent,
    ModalComponent,
    WorkflowModalComponent,
    ConsultaComponent,
    ViewCargoModalComponent,
    VerModalComponent,
    DetalleModalComponent,
    PiramideModalComponent,
    AplicacionesComponent,
    SiglasComponent,
    SelectListModalComponent
  ],
  imports: [
    CommonModule,
    PlatformRoutingModule,
    FormsModule,
    LayoutModule,
    HighchartsChartModule
  ]
})
export class PlatformModule { }
