import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CargoService } from '../../../services/modules/cargo.service';
import { AreaService } from 'src/app/services/modules/area.service';
import { EspecialidadService } from 'src/app/services/modules/especialidad.service';
import { CuerpoService } from 'src/app/services/modules/cuerpo.service';
import { GradoService } from 'src/app/services/modules/grado.service';
import { timeStamp } from 'console';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';
  grado = "";
  cargo = "";
  categoria = "";

  varCargo: any = {
    cargo_id: 0,
    cargo: "",
    descripcion: "",
    clase_cargo_id: 0,
    categoria_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };

  varConfiguracion: any = {
    cargo_configuracion_id: 0,
    cargo_grado_id: 0,
    puesto_cantidad: 0,
    cargo_jefe_inmediato_id: 0,
    cargo_jefe_inmediato: "",
    nivel1: 0,
    nivel2: 0,
    nivel3: 0,
    nivel4: 0,
    nivel5: 0,
    duracion: 0,
    requisito_cargo: "",
    cuerpo: "",
    especialidad: "",
    area: "",
    educacion: "",
    conocimiento: "",
    experiencia1: 0,
    experiencia2: 0,
    experiencia3: 0,
    experiencia4: 0,
    experiencia5: 0,
    competencia1: 0,
    competencia2: 0,
    competencia3: 0,
    competencia4: 0,
    competencia5: 0,
    observaciones: "",
    usuario_creador: "",
    usuario_modificador: ""
  }

  varGrados: any = [];

  varRutaRequisito: any = {
    ruta_requisito_id: 0,
    ruta_requisito: ""
  }

  varArea: any = {
    area_id: 0,
    area: ""
  }

  varCuerpo: any = {
    cuerpo_id: 0,
    cuerpo: ""
  }

  varEspecialidad: any = {
    especialidad_id: 0,
    especialidad: ""
  }

  varEducacion: any = {
    educacion_id: 0,
    educacion: ""
  }

  varConocimiento: any = {
    conocimiento_id: 0,
    conocimiento: ""
  }
}

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {

  model = new Model();
  
  modal: any;
  configModal: any;
  tab: any;

  varhistorial: any = [];
  varclase: any = [];
  varcategoria: any = [];

  lstGrados: any = [];

  varcuerpo: any = [];
  varcuerpoTemp: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  vararea: any = [];
  varareaTemp: any = [];

  vareducacion: any = [];
  vareducacionTemp: any = [];
  varconocimiento: any = [];
  varconocimientoTemp: any = [];

  varitems: any = [];
  varselectedItems: any = [];

  varnivel1: any = [];
  varnivel2: any = [];
  varnivel3: any = [];
  varnivel4: any = [];
  varnivel5: any = [];

  currentUser: any;

  selectModal: any;
  indexform = 0;
  titleSelect = "";

  constructor(private api: ApiService,
              private cargo: CargoService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService,
              private area: AreaService,
              private grado: GradoService,
              private router: Router) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.tab = 1;
    this.getCargos();
    this.getListas();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  getCargos() {
    let json: any = {
      filtro: 0
    }

    this.cargo.getCargos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
      }
    })

    this.area.getAreasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.area_id;
        });
        this.vararea = response.result;
      }
    });

    this.cuerpo.getCuerposFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.cuerpo_id;
        });
        this.varcuerpo = response.result;
      }
    });

    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.especialidad_id;
        });
        this.varespecialidad = response.result;
      }
    });

    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstGrados = response.result;
      }
    })
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Cargo";
    this.model.tipo = 'C';
    this.model.varGrados = [];
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  changeCategoria(id: any) {
    this.model.categoria = this.varcategoria.filter((x: any) => x.id == Number(id))[0].detalle;
  }

  changeGrado(index: any) {
    let grado: any = this.model.varGrados[index];
    let listaGrado: any = this.lstGrados.filter((x: any) => x.grado_id == Number(grado.grado_id));
    this.model.grado = listaGrado[0].descripcion;
  }

  openConfigModal(data: any) {
    this.configModal = true;
    this.model.varConfiguracion.cargo_grado_id = data.cargo_grado_id;
    this.model.grado = data.descripcion;
  }

  editConfigModal(data: any) {
    this.configModal = true;
    this.model.grado = data.descripcion;
    this.model.varConfiguracion.cargo_grado_id = data.cargo_grado_id;

    console.log(this.model.varConfiguracion.cargo_grado_id);

    if (data.cargo_grado_id != 0 && data.cargo_grado_id != null) {
      this.cargo.getCargosConfiguracion({cargo_grado_id: data.cargo_grado_id}).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          console.log(response.result);
          let cargo = response.result[0];
          this.model.varConfiguracion.cargo_configuracion_id = cargo.cargo_configuracion_id;
          this.model.varConfiguracion.puesto_cantidad = cargo.puesto_cantidad;
          this.model.varConfiguracion.cargo_jefe_inmediato_id = cargo.cargo_jefe_inmediato_id;
          this.model.varConfiguracion.cargo_jefe_inmediato = cargo.cargo_jefe_inmediato;
          this.model.varConfiguracion.nivel1 = cargo.nivel1;
          this.model.varConfiguracion.nivel2 = cargo.nivel2;
          this.model.varConfiguracion.nivel3 = cargo.nivel3;
          this.model.varConfiguracion.nivel4 = cargo.nivel4;
          this.model.varConfiguracion.nivel5 = cargo.nivel5;
          this.model.varConfiguracion.duracion = cargo.duracion;
          this.model.varConfiguracion.requisito_cargo = cargo.requisito_cargo;
          this.model.varCuerpo.cuerpo = cargo.cuerpo;
          this.model.varEspecialidad.especialidad = cargo.especialidad;
          this.model.varArea.area = cargo.area;
          this.model.varEducacion.educacion = cargo.educacion;
          this.model.varConocimiento.conocimiento = cargo.conocimiento;
          this.model.varConfiguracion.experiencia1 = cargo.experiencia1;
          this.model.varConfiguracion.experiencia2 = cargo.experiencia2;
          this.model.varConfiguracion.experiencia3 = cargo.experiencia3;
          this.model.varConfiguracion.experiencia4 = cargo.experiencia4;
          this.model.varConfiguracion.experiencia5 = cargo.experiencia5;
          this.model.varConfiguracion.competencia1 = cargo.competencia1;
          this.model.varConfiguracion.competencia2 = cargo.competencia2;
          this.model.varConfiguracion.competencia3 = cargo.competencia3;
          this.model.varConfiguracion.competencia4 = cargo.competencia4;
          this.model.varConfiguracion.competencia5 = cargo.competencia5;
          this.model.varConfiguracion.observaciones = cargo.observaciones;
        }
      });
    }
  }

  closeConfigModal(bol: any) {
    this.configModal = bol;
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

  getListas() {
    let varlistas = JSON.parse(localStorage.getItem("listasDinamicasFull") as any);
    this.varcategoria = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CATEGORIA');
    this.varcategoria.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varclase = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CARGO');
    this.varclase.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    let ubicacion: any = varlistas.filter((x: any) => x.nombre_lista == 'BAS_UBICACION_CARGO');
    ubicacion.forEach((x: any) => {
      x.padre_id = x.lista_dinamica_padre_id;
    });
    this.varnivel1 = ubicacion.filter((x: any) => x.padre_id == 7);
    this.varnivel1.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varnivel2 = ubicacion.filter((x: any) => x.padre_id == 8);
    this.varnivel2.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varnivel3 = ubicacion.filter((x: any) => x.padre_id == 9);
    this.varnivel3.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varnivel4 = ubicacion.filter((x: any) => x.padre_id == 23);
    this.varnivel4.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varnivel5 = ubicacion.filter((x: any) => x.padre_id == 24);
    this.varnivel5.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });

    this.vareducacion = varlistas.filter((x: any) => x.nombre_lista == 'BAS_EDUCACION');
    this.vareducacion.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.descripcion = x.lista_dinamica;
      x.indice = 4;
    });
    this.varconocimiento = varlistas.filter((x: any) => x.nombre_lista == 'BAS_CONOCIMIENTOS');
    this.varconocimiento.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.descripcion = x.lista_dinamica;
      x.indice = 5;
    })
  }

  addGrado() {
    this.model.varGrados.push({cargo_grado_id: 0, cargo_id: 0, grado: "", grado_id:0, usuario_creador: "", usuario_modificador: "", activo: true, NuevoRegistro: true});
  }

  deleteGrado(index: any) {
    this.model.varGrados.splice(index, 1);
  }

  editCargos(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Cargos";
    this.model.tipo = 'U';

    this.model.varCargo.cargo_id = data.cargo_id;
    this.model.varCargo.cargo = data.cargo;
    this.model.varCargo.descripcion = data.descripcion;
    this.model.varCargo.clase_cargo_id = data.clase_cargo_id;
    this.model.varCargo.categoria_id = data.categoria_id;
    this.model.varCargo.activo = (data.activo == 'S') ? true : false;

    this.model.cargo = data.cargo;

    this.changeCategoria(data.categoria_id);

    this.cargo.getCargosGrados({cargo_id: data.cargo_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.model.varGrados.forEach((x: any) => {
          x.NuevoRegistro = false;
        })
        this.model.varGrados = response.result;
      }
    });
  }

  saveCargos() {
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;

    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);

    if (this.model.varCargo.clase_cargo_id == 0)
      this.model.varCargo.clase_cargo_id = null;

    if (this.model.varCargo.categoria_id == 0)
      this.model.varCargo.categoria_id = null;

    this.cargo.createCargos(this.model.varCargo).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.model.varGrados.length > 0) {
          this.createCargosGrados(response.id);
        }
        swal({
          title: 'Cargos',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    })
    
  }

  updateCargos() {
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;
    
    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);

    if (this.model.varCargo.clase_cargo_id == 0)
      this.model.varCargo.clase_cargo_id = null;

    if (this.model.varCargo.categoria_id == 0)
      this.model.varCargo.categoria_id = null;

    this.cargo.updateCargos(this.model.varCargo).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.model.varGrados.length > 0) {
          this.createCargosGrados(this.model.varCargo.cargo_id);
        }
        swal({
          title: 'Cargos',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    })
  }

  createCargosGrados(cargo_id: any) {
    this.model.varGrados.forEach((x: any) => {
      x.cargo_id = cargo_id;
      x.grado_id = Number(x.grado_id);
      x.usuario_creador = this.currentUser.usuario;
      x.usuario_modificador = this.currentUser.usuario;

      if (x.NuevoRegistro == true)
        this.cargo.createCargosGrados(x).subscribe(data => {});
    });
  }

  updateCargosGrados(cargo_id: any) {
    this.model.varGrados.forEach((x: any) => {
      x.cargo_id = cargo_id;
      x.grado_id = Number(x.grado_id);
      x.usuario_creador = this.currentUser.usuario;
      x.usuario_modificador = this.currentUser.usuario;

      if (x.NuevoRegistro == false)
        this.cargo.updateteCargosGrados(x).subscribe(data => {});
    });
  }

  openCuerpoSelect() {
    this.selectModal = true;
    this.indexform = 1;
    this.varitems = this.varcuerpo;
    this.titleSelect = "Cuerpos";
    if (this.varcuerpoTemp.length > 0) {
      this.varselectedItems = this.varcuerpoTemp.filter((x: any) => x.indice == 1);
    }
    else this.varselectedItems = [];
  }

  openEspecialidadSelect() {
    this.selectModal = true;
    this.indexform = 2;
    this.varitems = this.varespecialidad;
    this.titleSelect = "Especialidades";
    if (this.varespecialidadTemp.length > 0) {
      this.varselectedItems = this.varespecialidadTemp.filter((x: any) => x.indice == 2);
    }
    else this.varselectedItems = [];
  }

  openAreaSelect() {
    this.selectModal = true;
    this.indexform = 3;
    this.varitems = this.vararea;
    this.titleSelect = "Áreas";
    if (this.varareaTemp.length > 0) {
      this.varselectedItems = this.varareaTemp.filter((x: any) => x.indice == 3);
    }
    else this.varselectedItems = [];
  }

  openEducacionSelect() {
    this.selectModal = true;
    this.indexform = 4;
    this.varitems = this.vareducacion;
    this.titleSelect = "Educación";
    if (this.vareducacionTemp.length > 0) {
      this.varselectedItems = this.vareducacionTemp;
    }
    else this.varselectedItems = [];
  }

  openConocimientoSelect() {
    this.selectModal = true;
    this.indexform = 5;
    this.varitems = this.varconocimiento;
    this.titleSelect = "Conocimiento";
    if (this.varconocimientoTemp.length > 0) {
      this.varselectedItems = this.varconocimientoTemp;
    }
    else this.varselectedItems = [];
  }
  
  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveSelected(e: any, indexform: any) {
    if (indexform == 1) {
      this.varcuerpoTemp = e;
      this.model.varCuerpo.cuerpo = e.map((x: any) => x.descripcion).join(", ");
    }
    else if (indexform == 2) {
      this.varespecialidadTemp = e;
      this.model.varEspecialidad.especialidad = e.map((x: any) => x.descripcion).join(", ");
    }
    else if (indexform == 3) {
      this.varareaTemp = e;
      this.model.varArea.area = e.map((x: any) => x.descripcion).join(", ");
    }
    else if (indexform == 4) {
      this.vareducacionTemp = e;
      this.model.varEducacion.educacion = e.map((x: any) => x.descripcion).join(", ");
    }
    else if (indexform == 5) {
      this.varconocimientoTemp = e;
      this.model.varConocimiento.conocimiento = e.map((x: any) => x.descripcion).join(", ");
    }
  }

  saveConfiguracion() {
    this.model.varConfiguracion.usuario_creador = this.currentUser.usuario;
    this.model.varConfiguracion.usuario_modificador = this.currentUser.usuario;

    if (this.model.varConfiguracion.cargo_jefe_inmediato_id == 0) this.model.varConfiguracion.cargo_jefe_inmediato_id = null;

    this.model.varConfiguracion.nivel1 = Number(this.model.varConfiguracion.nivel1);
    this.model.varConfiguracion.nivel2 = Number(this.model.varConfiguracion.nivel2);
    this.model.varConfiguracion.nivel3 = Number(this.model.varConfiguracion.nivel3);
    this.model.varConfiguracion.nivel4 = Number(this.model.varConfiguracion.nivel4);
    this.model.varConfiguracion.nivel5 = Number(this.model.varConfiguracion.nivel5);

    this.model.varConfiguracion.experiencia1 = Number(this.model.varConfiguracion.experiencia1);
    this.model.varConfiguracion.experiencia2 = Number(this.model.varConfiguracion.experiencia2);
    this.model.varConfiguracion.experiencia3 = Number(this.model.varConfiguracion.experiencia3);
    this.model.varConfiguracion.experiencia4 = Number(this.model.varConfiguracion.experiencia4);
    this.model.varConfiguracion.experiencia5 = Number(this.model.varConfiguracion.experiencia5);

    this.model.varConfiguracion.competencia1 = Number(this.model.varConfiguracion.competencia1);
    this.model.varConfiguracion.competencia2 = Number(this.model.varConfiguracion.competencia2);
    this.model.varConfiguracion.competencia3 = Number(this.model.varConfiguracion.competencia3);
    this.model.varConfiguracion.competencia4 = Number(this.model.varConfiguracion.competencia4);
    this.model.varConfiguracion.competencia5 = Number(this.model.varConfiguracion.competencia5);

    if (this.model.varConfiguracion.nivel1 == 0) this.model.varConfiguracion.nivel1 = null;
    if (this.model.varConfiguracion.nivel2 == 0) this.model.varConfiguracion.nivel2 = null;
    if (this.model.varConfiguracion.nivel3 == 0) this.model.varConfiguracion.nivel3 = null;
    if (this.model.varConfiguracion.nivel4 == 0) this.model.varConfiguracion.nivel4 = null;
    if (this.model.varConfiguracion.nivel5 == 0) this.model.varConfiguracion.nivel5 = null;

    if (this.model.varConfiguracion.experiencia1 == 0) this.model.varConfiguracion.experiencia1 = null;
    if (this.model.varConfiguracion.experiencia2 == 0) this.model.varConfiguracion.experiencia2 = null;
    if (this.model.varConfiguracion.experiencia3 == 0) this.model.varConfiguracion.experiencia3 = null;
    if (this.model.varConfiguracion.experiencia4 == 0) this.model.varConfiguracion.experiencia4 = null;
    if (this.model.varConfiguracion.experiencia5 == 0) this.model.varConfiguracion.experiencia5 = null;

    if (this.model.varConfiguracion.competencia1 == 0) this.model.varConfiguracion.competencia1 = null;
    if (this.model.varConfiguracion.competencia2 == 0) this.model.varConfiguracion.competencia2 = null;
    if (this.model.varConfiguracion.competencia3 == 0) this.model.varConfiguracion.competencia3 = null;
    if (this.model.varConfiguracion.competencia4 == 0) this.model.varConfiguracion.competencia4 = null;
    if (this.model.varConfiguracion.competencia5 == 0) this.model.varConfiguracion.competencia5 = null;

    this.model.varConfiguracion.cuerpo = this.model.varCuerpo.cuerpo;
    this.model.varConfiguracion.especialidad = this.model.varEspecialidad.especialidad;
    this.model.varConfiguracion.area = this.model.varArea.area;

    this.model.varConfiguracion.educacion = this.model.varEducacion.educacion;
    this.model.varConfiguracion.conocimiento = this.model.varConocimiento.conocimiento;

    console.log(this.model.varConfiguracion);

    this.cargo.createCargosConfiguracion(this.model.varConfiguracion).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Cargo / Grado Configuración',
          text: "Fue creado exitosamente",
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.configModal = false;
          this.reload();
        })
      }
    });
  }

  updateConfiguracion() {
    this.model.varConfiguracion.usuario_creador = this.currentUser.usuario;
    this.model.varConfiguracion.usuario_modificador = this.currentUser.usuario;

    if (this.model.varConfiguracion.cargo_jefe_inmediato_id == 0) this.model.varConfiguracion.cargo_jefe_inmediato_id = null;

    this.model.varConfiguracion.nivel1 = Number(this.model.varConfiguracion.nivel1);
    this.model.varConfiguracion.nivel2 = Number(this.model.varConfiguracion.nivel2);
    this.model.varConfiguracion.nivel3 = Number(this.model.varConfiguracion.nivel3);
    this.model.varConfiguracion.nivel4 = Number(this.model.varConfiguracion.nivel4);
    this.model.varConfiguracion.nivel5 = Number(this.model.varConfiguracion.nivel5);

    this.model.varConfiguracion.experiencia1 = Number(this.model.varConfiguracion.experiencia1);
    this.model.varConfiguracion.experiencia2 = Number(this.model.varConfiguracion.experiencia2);
    this.model.varConfiguracion.experiencia3 = Number(this.model.varConfiguracion.experiencia3);
    this.model.varConfiguracion.experiencia4 = Number(this.model.varConfiguracion.experiencia4);
    this.model.varConfiguracion.experiencia5 = Number(this.model.varConfiguracion.experiencia5);

    this.model.varConfiguracion.competencia1 = Number(this.model.varConfiguracion.competencia1);
    this.model.varConfiguracion.competencia2 = Number(this.model.varConfiguracion.competencia2);
    this.model.varConfiguracion.competencia3 = Number(this.model.varConfiguracion.competencia3);
    this.model.varConfiguracion.competencia4 = Number(this.model.varConfiguracion.competencia4);
    this.model.varConfiguracion.competencia5 = Number(this.model.varConfiguracion.competencia5);

    if (this.model.varConfiguracion.nivel1 == 0) this.model.varConfiguracion.nivel1 = null;
    if (this.model.varConfiguracion.nivel2 == 0) this.model.varConfiguracion.nivel2 = null;
    if (this.model.varConfiguracion.nivel3 == 0) this.model.varConfiguracion.nivel3 = null;
    if (this.model.varConfiguracion.nivel4 == 0) this.model.varConfiguracion.nivel4 = null;
    if (this.model.varConfiguracion.nivel5 == 0) this.model.varConfiguracion.nivel5 = null;

    if (this.model.varConfiguracion.experiencia1 == 0) this.model.varConfiguracion.experiencia1 = null;
    if (this.model.varConfiguracion.experiencia2 == 0) this.model.varConfiguracion.experiencia2 = null;
    if (this.model.varConfiguracion.experiencia3 == 0) this.model.varConfiguracion.experiencia3 = null;
    if (this.model.varConfiguracion.experiencia4 == 0) this.model.varConfiguracion.experiencia4 = null;
    if (this.model.varConfiguracion.experiencia5 == 0) this.model.varConfiguracion.experiencia5 = null;

    if (this.model.varConfiguracion.competencia1 == 0) this.model.varConfiguracion.competencia1 = null;
    if (this.model.varConfiguracion.competencia2 == 0) this.model.varConfiguracion.competencia2 = null;
    if (this.model.varConfiguracion.competencia3 == 0) this.model.varConfiguracion.competencia3 = null;
    if (this.model.varConfiguracion.competencia4 == 0) this.model.varConfiguracion.competencia4 = null;
    if (this.model.varConfiguracion.competencia5 == 0) this.model.varConfiguracion.competencia5 = null;

    this.model.varConfiguracion.cuerpo = this.model.varCuerpo.cuerpo;
    this.model.varConfiguracion.especialidad = this.model.varEspecialidad.especialidad;
    this.model.varConfiguracion.area = this.model.varArea.area;

    this.model.varConfiguracion.educacion = this.model.varEducacion.educacion;
    this.model.varConfiguracion.conocimiento = this.model.varConocimiento.conocimiento;

    if (this.model.varConfiguracion.cargo_configuracion_id == 0) {
      this.cargo.createCargosConfiguracion(this.model.varConfiguracion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Cargo / Grado Configuración',
            text: "Fue creado exitosamente",
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.configModal = false;
            this.reload();
          })
        }
      });
    }
    else {
      console.log("Updated:", this.model.varConfiguracion);
      this.cargo.updateCargosConfiguracion(this.model.varConfiguracion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Cargo / Grado Configuración',
            text: "Fue actualizado exitosamente",
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.configModal = false;
            this.reload();
          })
        }
      });
    }
  }
}
