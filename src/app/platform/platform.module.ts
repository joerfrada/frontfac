import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HighchartsChartModule } from 'highcharts-angular';

import { PlatformRoutingModule } from './platform-routing.module';
import { LoginComponent } from '../login/login.component';
import { PlatformComponent } from './platform.component';
import { LayoutModule } from '../layout/layout.module';
import { HomeComponent } from '../modules/home/home.component';
import { UsersComponent } from '../modules/admin/users/users.component';
import { RolesComponent } from '../modules/admin/roles/roles.component';
import { CargosComponent } from '../modules/param/cargos/cargos.component';
import { GradosComponent } from '../modules/param/grados/grados.component';
import { ValoresFlexiblesComponent } from '../modules/param/valores-flexibles/valores-flexibles.component';
import { RequerimientosComponent } from '../modules/param/requerimientos/requerimientos.component';
import { SiglasComponent } from '../modules/param/siglas/siglas.component';
import { RutaComponent } from '../modules/consultas/ruta/ruta.component';
import { BreadcrumbComponent } from '../views/breadcrumb/breadcrumb.component';
import { ModalComponent } from '../views/modal/modal.component';
import { WorkflowModalComponent } from '../views/workflow-modal/workflow-modal.component';
import { ViewCargoModalComponent } from '../views/view-cargo-modal/view-cargo-modal.component';
import { VerModalComponent } from '../views/ver-modal/ver-modal.component';
import { DetalleModalComponent } from '../views/detalle-modal/detalle-modal.component';
import { PiramideModalComponent } from '../views/piramide-modal/piramide-modal.component';
import { SelectListModalComponent } from '../views/select-list-modal/select-list-modal.component';
import { SelectModalComponent } from '../views/select-modal/select-modal.component';
import { SelectBigModalComponent } from '../views/select-big-modal/select-big-modal.component';
import { SelectRouteModalComponent } from '../views/select-route-modal/select-route-modal.component';

@NgModule({
  declarations: [
    LoginComponent,
    PlatformComponent,
    HomeComponent,
    UsersComponent,
    RolesComponent,
    CargosComponent,
    GradosComponent,
    ValoresFlexiblesComponent,
    RequerimientosComponent,
    SiglasComponent,
    RutaComponent,
    BreadcrumbComponent,
    ModalComponent,
    WorkflowModalComponent,
    ViewCargoModalComponent,
    VerModalComponent,
    DetalleModalComponent,
    PiramideModalComponent,
    SelectListModalComponent,
    SelectModalComponent,
    SelectBigModalComponent,
    SelectRouteModalComponent
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
