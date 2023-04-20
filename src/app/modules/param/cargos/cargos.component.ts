import { Component, OnInit, ɵclearResolutionOfComponentResourcesQueue } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CargoService } from '../../../services/modules/cargo.service';
import { AreaService } from '../../../services/modules/area.service';
import { EspecialidadService } from '../../../services/modules/especialidad.service';
import { CuerpoService } from '../../../services/modules/cuerpo.service';
import { GradoService } from '../../../services/modules/grado.service';
import { UsuarioService } from '../../../services/modules/usuario.service';
import { Utilidades } from '../../../helper/utilidades';

declare var $:any;
declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';
  cc_tipo = 'C';
  grado = "";
  cargo = "";
  categoria = "";
  texto = "";
  pag = 0;

  varCargo: any = {
    cargo_id: 0,
    cargo: "",
    descripcion: "",
    clase_cargo_id: 0,
    categoria_id: 0,
    cargo_ruta_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };

  varConfiguracion: any = {
    cargo_configuracion_id: 0,
    cargo_grado_id: 0,
    requisito_cargo: "",
    cuerpo: "",
    cuerpo_id: "",
    especialidad: "",
    especialidad_id: "",
    area: "",
    area_id: "",
    educacion: "",
    conocimiento: "",
    conocimiento_id: "",
    experiencia: "",
    experiencia_id: "",
    competencia: "",
    competencia_id: "",
    observaciones: "",
    usuario_creador: "",
    usuario_modificador: ""
  }

  varGrados: any = [];
  varGradosTemp: any = [];

  varCargosExperiencias: any = [];
  varCargosExperienciasTemp: any = [];

  varUbicacionCargos: any = [];
  varUbicacionCargosTemp: any = [];

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

  varExperiencia: any = {
    experiencia_id: 0,
    experiencia: ""
  }

  varCompetencia: any = {
    competencia_id: 0,
    experiencia: ""
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
  IsLectura = false;
  i = 0;
  loading = true;

  varhistorial: any = [];
  varhistorialTemp: any = [];
  varclase: any = [];
  varcategoria: any = [];
  varcargoruta: any = [];

  lstCargos: any = [];
  lstGrados: any = [];
  vargradoOficial: any = [];
  vargradoSubOficial: any = [];

  arrCuerpo: any = [];
  varcuerpo: any = [];
  varcuerpoTemp: any = [];
  arrEspecialidad: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  arrArea: any = [];
  vararea: any = [];
  varareaTemp: any = [];
  arrEducacion: any = [];
  vareducacion: any = [];
  vareducacionTemp: any = [];
  arrConocimiento: any = [];
  varconocimiento: any = [];
  varconocimientoTemp: any = [];
  arrExperiencia: any = [];
  varexperiencia: any = [];
  varexperienciaTemp: any = [];
  arrCompetencia: any = [];
  varcompetencia: any = [];
  varcompetenciaTemp: any = [];

  tipo_categoria_id: any;

  varcuerpoitems: any = [];
  varcuerposelectedItems: any = [];

  varespecialidaditems: any = [];
  varespecialidadselectedItems: any = [];

  varareaitems: any = [];
  varareaselectedItems: any = [];

  vareducacionitems: any = [];
  vareducacionselectedItems: any = [];

  varconocimientoitems: any = [];
  varconocimientoselectedItems: any = [];

  varexperienciaitems: any = [];
  varexperienciaselectedItems: any = [];

  varcompetenciaitems: any = [];
  varcompetenciaselectedItems: any = [];

  lstNivel1: any = [];
  lstNivel2: any = [];
  lstNivel3: any = [];
  lstNivel4: any = [];
  lstNivel5: any = [];
  lstNivel6: any = [];
  lstNivel7: any = [];
  lstNivel8: any = [];

  currentUser: any;

  selectCuerpoModal: any;
  selectEspecialidadModal: any;
  selectAreaModal: any;
  selectEducacionModal: any;
  selectConocimientoModal: any;
  selectExperienciaModal: any;
  selectCompetenciaModal: any;

  isEliminar: boolean = true;

  titleModal = "";
  inputform: any;
  indexform: any;
  selectModal: any;
  array: any = [];

  varPermisos: any = {
    consultar: 0,
    crear: 0,
    actualizar: 0,
    eliminar: 0
  }

  constructor(private router: Router,
              private api: ApiService,
              private cargo: CargoService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService,
              private area: AreaService,
              private grado: GradoService,
              private usuario: UsuarioService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;
    this.getPermisos(this.currentUser.usuario, this.router.url);
  }

  ngOnInit(): void {
    this.tab = 1;
    this.getCargos();
    this.getListas();
    this.getListasNiveles();
  }

  reload() {
    let currentUrl = this.router.url;
    setTimeout(() => {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
      });
    }, 500);
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.cargo_id.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.cargo.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.clase_cargo.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.categoria.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  getCargos() {
    let json: any = {
      filtro: 0
    }

    this.cargo.getCargos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.desc_data = (x.descripcion == "" || x.descripcion == undefined) ? 'N' : 'S';
        });
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    })

    this.getCargosFull();

    this.area.getAreasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.area_id;
          x.texto = x.area;
        });
        this.vararea = response.result;
      }
    });

    this.cuerpo.getCuerposFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.cuerpo_id;
          x.texto = x.cuerpo;
        });
        this.varcuerpo = response.result;
      }
    });

    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.especialidad_id;
          x.texto = x.especialidad;
        });
        this.varespecialidad = response.result;
      }
    });

    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.vargradoOficial = response.result.filter((x: any) => x.categoria_id == 5);
        this.vargradoSubOficial = response.result.filter((x: any) => x.categoria_id == 6);
      }
    })
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Cargo";
    this.model.tipo = 'C';
    this.model.varGrados = [];
    this.isEliminar = false;
    this.IsLectura = false;
  }

  closeModal(bol: any) {
    this.modal = bol;
    this.reload();
  }

  changeCategoria(id: any) {
    this.model.categoria = this.varcategoria.filter((x: any) => x.id == Number(id))[0].detalle;
    this.tipo_categoria_id = id;

    if (id == 5) {
      this.lstGrados = this.vargradoOficial;
    }
    else if (id == 6) {
      this.lstGrados = this.vargradoSubOficial;
    }
  }

  changeGrado(index: any) {
    let grado: any = this.model.varGrados[index];
    let listaGrado: any = this.lstGrados.filter((x: any) => x.grado_id == Number(grado.grado_id));
    this.model.grado = listaGrado[0].descripcion;

    if (this.model.varGradosTemp.length == 0) {
      this.model.varGradosTemp = this.model.varGrados;
    }

    let esEscontrado = this.model.varGradosTemp.filter((x: any) => x.grado_id == Number(grado.grado_id));
    if (esEscontrado.length != 1) {
      swal({
        title: 'Grados',
        text: "El grado '" + listaGrado[0].grado + " - " + listaGrado[0].descripcion + "' ya existe.",
        type: 'warning',
        allowOutsideClick: false,
        showConfirmButton: true
      }).then((result: any) => {
        this.model.varGrados[index].grado_id = 0;
      });
    }
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

  openConfigModal(data: any) {
    this.configModal = true;
    this.model.varConfiguracion.cargo_grado_id = data.cargo_grado_id;
    this.model.grado = data.descripcion;
    this.IsLectura = false;
  }

  closeConfigModal(bol: any) {
    this.configModal = bol;
    this.model.varCargosExperiencias = [];
    this.model.varCargosExperienciasTemp = [];
    this.model.varUbicacionCargos = [];
    this.model.varUbicacionCargosTemp = [];
    this.model.varConfiguracion = new Model().varConfiguracion;
    this.lstCargos = [];
  }

  editConfigModal(data: any, IsModal: boolean) {
    if (IsModal == true) this.configModal = true;
    this.IsLectura = false;

    // this.lstCargos = this.lstCargos.filter((x: any) => x.categoria_id == data.categoria_id);
    this.model.grado = data.descripcion;
    this.model.varConfiguracion.cargo_configuracion_id = data.cargo_configuracion_id;
    this.model.varConfiguracion.cargo_grado_id = data.cargo_grado_id;
    
    this.arrCuerpo = Utilidades.toArray(data.cuerpo_id);
    this.arrEspecialidad = Utilidades.toArray(data.especialidad_id);
    this.arrArea = Utilidades.toArray(data.area_id);
    this.arrEducacion = Utilidades.toArray(data.educacion_id);
    this.arrConocimiento = Utilidades.toArray(data.conocimiento_id);
    this.arrExperiencia = Utilidades.toArray(data.experiencia_id);
    this.arrCompetencia = Utilidades.toArray(data.competencia_id);

    this.model.varUbicacionCargosTemp = [];

    if (data.cargo_configuracion_id != 0 && data.cargo_configuracion_id != null) {
      this.getCargosConfiguracion(data.cargo_configuracion_id);
    }

    this.getCargosFull();
  }

  openDetalleConfig(data: any) {
    this.IsLectura = true;
    this.configModal = true;
    this.model.grado = data.descripcion;
    this.model.varConfiguracion.cargo_configuracion_id = data.cargo_configuracion_id;
    this.model.varConfiguracion.cargo_grado_id = data.cargo_grado_id;
    this.lstCargos = this.lstCargos.filter((x: any) => x.categoria_id == data.categoria_id);
    
    this.arrCuerpo = Utilidades.toArray(data.cuerpo_id);
    this.arrEspecialidad = Utilidades.toArray(data.especialidad_id);
    this.arrArea = Utilidades.toArray(data.area_id);
    this.arrEducacion = Utilidades.toArray(data.educacion_id);
    this.arrConocimiento = Utilidades.toArray(data.conocimiento_id);
    this.arrExperiencia = Utilidades.toArray(data.experiencia_id);
    this.arrCompetencia = Utilidades.toArray(data.competencia_id);

    this.model.varUbicacionCargosTemp = [];

    if (data.cargo_configuracion_id != 0 && data.cargo_configuracion_id != null) {
      this.getCargosConfiguracion(data.cargo_configuracion_id);
    }
  }

  getCargosExperiencias(id: any) {
    this.cargo.getCargosExperiencias({cargo_configuracion_id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.varCargosExperiencias = response.result;
        this.model.varCargosExperienciasTemp = response.result;
      }
    });
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
    this.vareducacion = varlistas.filter((x: any) => x.nombre_lista == 'BAS_EDUCACION');
    this.vareducacion.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.descr = x.lista_dinamica;
      x.sigla = x.lista_dinamica;
      x.texto = x.descripcion;
    });
    this.varconocimiento = varlistas.filter((x: any) => x.nombre_lista == 'BAS_CONOCIMIENTOS');
    this.varconocimiento.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.descr = x.lista_dinamica;
      x.sigla = x.lista_dinamica;
      x.texto = x.descripcion;
    })
    this.varexperiencia = varlistas.filter((x: any) => x.nombre_lista == 'BAS_EXPERIENCIA');
    this.varexperiencia.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.descr = x.lista_dinamica;
      x.sigla = x.lista_dinamica;
      x.texto = x.descripcion;
    });
    this.varcompetencia = varlistas.filter((x: any) => x.nombre_lista == 'BAS_COMPETENCIA');
    this.varcompetencia.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.descr = x.lista_dinamica;
      x.sigla = x.lista_dinamica;
      x.texto = x.descripcion;
    });
    this.varcargoruta = varlistas.filter((x: any) => x.nombre_lista == 'BAS_CARGO_RUTA');
    this.varcargoruta.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.varcargoruta = this.varcargoruta.filter((x: any) => x.id != 1094);
  }

  addGrado() {
    this.model.varGrados.push({cargo_grado_id: 0, cargo_id: 0, grado: "", grado_id:0, usuario_creador: "", usuario_modificador: "", activo: true, NuevoRegistro: true, EliminarRegistro: false});
  }

  deleteGrado(index: any) {
    this.model.varGrados.splice(index, 1);
  }

  editCargos(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Cargos";
    this.model.tipo = 'U';
    this.isEliminar = true;

    this.model.varCargo.cargo_id = data.cargo_id;
    this.model.varCargo.cargo = data.cargo;
    this.model.varCargo.descripcion = data.descripcion == null ? data.descripcion : data.descripcion.replace(/<br\s?\/?>/g, '\r\n');
    this.model.varCargo.clase_cargo_id = data.clase_cargo_id;
    this.model.varCargo.categoria_id = data.categoria_id;
    this.model.varCargo.cargo_ruta_id = data.cargo_ruta_id;
    this.model.varCargo.activo = (data.activo == 'S') ? true : false;

    this.model.cargo = data.cargo;

    this.changeCategoria(data.categoria_id);

    this.getCargosGrados(data.cargo_id);
  }

  openDetalle(data: any) {
    this.modal = true;
    this.model.title = "Detalle Cargos";
    this.model.tipo = 'L';
    this.isEliminar = false;
    this.IsLectura = true;

    this.model.varCargo.cargo_id = data.cargo_id;
    this.model.varCargo.cargo = data.cargo;
    this.model.varCargo.descripcion = data.descripcion == null ? data.descripcion : data.descripcion.replace(/<br\s?\/?>/g, '\r\n');
    this.model.varCargo.clase_cargo_id = data.clase_cargo_id;
    this.model.varCargo.categoria_id = data.categoria_id;
    this.model.varCargo.cargo_ruta_id = data.cargo_ruta_id;
    this.model.varCargo.activo = (data.activo == 'S') ? true : false;

    this.model.cargo = data.cargo;

    this.changeCategoria(data.categoria_id);

    this.getCargosGrados(data.cargo_id);
  }

  getCargosGrados(id: any) {
    this.cargo.getCargosGrados({cargo_id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        })
        this.model.varGrados = response.result;
        this.model.varGradosTemp = response.result;
      }
    });
  }

  saveCargos() {
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;

    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);
    this.model.varCargo.cargo_ruta_id = Number(this.model.varCargo.cargo_ruta_id);
    this.model.varCargo.descripcion = this.model.varCargo.descripcion == "" ? this.model.varCargo.descripcion : this.model.varCargo.descripcion.replace(/(?:\r\n|\r|\n)/g, '<br />');

    let esEscontrado = this.varhistorial.filter((x: any) => x.cargo == this.model.varCargo.cargo);
    if (esEscontrado.length == 1) {
      swal({
        title: 'Cargos',
        text: "El cargo '" + this.model.varCargo.cargo + "' ya existe",
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'success'
      });
    }
    else {
      this.cargo.createCargos(this.model.varCargo).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          if (this.model.varGrados.length > 0) {
            this.model.varGrados.forEach((x: any) => {
              x.cargo_id = response.id;
              x.grado_id = Number(x.grado_id);
              x.usuario_creador = this.currentUser.usuario;
              x.usuario_modificador = this.currentUser.usuario;
        
              if (x.NuevoRegistro == true) {
                this.cargo.createCargosGrados(x).subscribe(data1 => {});
              }
            });
          }
          swal({
            title: 'Cargos',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            //this.modal = false;
            // this.reload();
            this.model.tipo = 'U';
            this.getCargosInd(response.id);
          })
        }
      });
    }
  }

  updateCargos() {
    this.model.varCargo.usuario_creador = this.currentUser.usuario;
    this.model.varCargo.usuario_modificador = this.currentUser.usuario;
    
    this.model.varCargo.clase_cargo_id = Number(this.model.varCargo.clase_cargo_id);
    this.model.varCargo.categoria_id = Number(this.model.varCargo.categoria_id);
    this.model.varCargo.cargo_ruta_id = Number(this.model.varCargo.cargo_ruta_id);
    this.model.varCargo.descripcion = this.model.varCargo.descripcion == null ? this.model.varCargo.descripcion : this.model.varCargo.descripcion.replace(/(?:\r\n|\r|\n)/g, '<br />');

    this.cargo.updateCargos(this.model.varCargo).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.model.varGrados.length > 0) {
          this.model.varGrados.forEach((x: any) => {
            x.cargo_id = this.model.varCargo.cargo_id;
            x.grado_id = Number(x.grado_id);
            x.activo = (x.activo == 'S') ? true : false;
            x.usuario_creador = this.currentUser.usuario;
            x.usuario_modificador = this.currentUser.usuario;
      
            if (x.NuevoRegistro == true) {
              this.cargo.createCargosGrados(x).subscribe(data1 => {});
            }
            else {
              this.cargo.updateCargosGrados(x).subscribe(data1 => {});
            }
          });
        }
        swal({
          title: 'Cargos',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          // this.modal = false;
          // this.reload();
          this.model.tipo = 'U';
          this.getCargosInd(this.model.varCargo.cargo_id);
        })
      }
    });
  }

  addCargosExperiencias() {
    this.model.varCargosExperiencias.push({cargo_experiencia_id: 0, cargo_configuracion_id:0, cargo_previo_id:0, cargo_previo:"", anio: 0, mes: 0, usuario_creador: this.currentUser.usuario, usuario_modificador: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false });
  }

  deleteCargosExperiencias(index: any) {
    this.model.varCargosExperiencias.splice(index, 1);
  }

  changeCargoPrevio(index: any) {
    let cargo: any = this.model.varCargosExperiencias[index];
    let listaCargo: any = this.lstCargos.filter((x: any) => x.cargo_id == Number(cargo.cargo_previo_id));
    
    if (this.model.varCargosExperienciasTemp.length == 0) {
      this.model.varCargosExperienciasTemp = this.model.varCargosExperiencias;
    }
    
    let esEscontrado = this.model.varCargosExperienciasTemp.filter((x: any) => x.cargo_previo_id == Number(cargo.cargo_previo_id));
    
    if (esEscontrado.length != 1) {
      swal({
        title: 'ADVERTENCIA',
        text: "El cargo '" + listaCargo[0].cargo + "' ya existe.",
        type: 'warning',
        allowOutsideClick: false,
        showConfirmButton: true
      }).then((result: any) => {
        this.model.varCargosExperiencias[index].cargo_id = 0;
      });
    }
  }

  openCuerpoSelect() {
    this.selectCuerpoModal = true;
    this.varcuerpoitems = this.varcuerpo.filter((x: any) => x.tipo_categoria_id == this.tipo_categoria_id && !this.arrCuerpo.includes(x.cuerpo_id));
    if (this.arrCuerpo.length > 0) {
      this.varcuerposelectedItems = this.varcuerpo.filter((x: any) => x.tipo_categoria_id == this.tipo_categoria_id && this.arrCuerpo.includes(x.cuerpo_id));
    }
    else this.varcuerposelectedItems = [];
  }

  openEspecialidadSelect() {
    this.selectEspecialidadModal = true;
    this.varespecialidaditems = this.varespecialidad.filter((x: any) => x.tipo_categoria_id == this.tipo_categoria_id && !this.arrEspecialidad.includes(x.especialidad_id));
    if (this.arrEspecialidad.length > 0) {
      this.varespecialidadselectedItems = this.varespecialidad.filter((x: any) => x.tipo_categoria_id == this.tipo_categoria_id && this.arrEspecialidad.includes(x.especialidad_id));
    }
    else this.varespecialidadselectedItems = [];
  }

  openAreaSelect() {
    this.selectAreaModal = true;
    this.varareaitems = this.vararea.filter((x: any) => x.tipo_categoria_id == this.tipo_categoria_id && !this.arrArea.includes(x.area_id));
    if (this.arrArea.length > 0) {
      this.varareaselectedItems = this.vararea.filter((x: any) => x.tipo_categoria_id == this.tipo_categoria_id && this.arrArea.includes(x.area_id));
    }
    else this.varareaselectedItems = [];
  }

  openEducacionSelect() {
    this.selectEducacionModal = true;
    this.vareducacionitems = this.vareducacion.filter((x: any) => !this.arrEducacion.includes(x.id));
    if (this.arrEducacion.length > 0) {
      this.vareducacionselectedItems = this.vareducacion.filter((x: any) => this.arrEducacion.includes(x.id));
    }
    else this.vareducacionselectedItems = [];
  }

  openConocimientoSelect() {
    this.selectConocimientoModal = true;
    this.varconocimientoitems = this.varconocimiento.filter((x: any) => !this.arrConocimiento.includes(x.id));
    if (this.arrConocimiento.length > 0) {
      this.varconocimientoselectedItems = this.varconocimiento.filter((x: any) => this.arrConocimiento.includes(x.id));
    }
    else this.varconocimientoselectedItems = [];
  }

  openExperienciaSelect() {
    this.selectExperienciaModal = true;
    this.varexperienciaitems = this.varexperiencia.filter((x: any) => !this.arrExperiencia.includes(x.id));
    if (this.arrExperiencia.length > 0) {
      this.varexperienciaselectedItems = this.varexperiencia.filter((x: any) => this.arrExperiencia.includes(x.id));
    }
    else this.varexperienciaselectedItems = [];
  }

  openCompetenciaSelect() {
    this.selectCompetenciaModal = true;
    this.varcompetenciaitems = this.varcompetencia.filter((x: any) => !this.arrCompetencia.includes(x.id));
    if (this.arrCompetencia.length > 0) {
      this.varcompetenciaselectedItems = this.varcompetencia.filter((x: any) => this.arrCompetencia.includes(x.id));
    }
    else this.varcompetenciaselectedItems = [];
  }
  
  closeCuerpoSelectModal(bol: any) {
    this.selectCuerpoModal = bol;
  }

  closeEspecialidadSelectModal(bol: any) {
    this.selectEspecialidadModal = bol;
  }

  closeAreaSelectModal(bol: any) {
    this.selectAreaModal = bol;
  }

  closeEducacionSelectModal(bol: any) {
    this.selectEducacionModal = bol;
  }

  closeConocimientoSelectModal(bol: any) {
    this.selectConocimientoModal = bol;
  }

  closeExperienciaSelectModal(bol: any) {
    this.selectExperienciaModal = bol;
  }

  closeCompetenciaSelectModal(bol: any) {
    this.selectCompetenciaModal = bol;
  }

  saveCuerpoSelected(e: any) {
    this.varcuerpoTemp = e;
    this.model.varCuerpo.cuerpo = e.map((x: any) => x.descr).join(", ");

    this.model.varConfiguracion.cuerpo_id = e.map((x: any) => x.id).join(",");
  }

  saveEspecialidadSelected(e: any) {
    this.varespecialidadTemp = e;
    this.model.varEspecialidad.especialidad = e.map((x: any) => x.descr).join(", ");

    this.model.varConfiguracion.especialidad_id = e.map((x: any) => x.id).join(",");
  }

  saveAreaSelected(e: any) {
    this.varareaTemp = e;
    this.model.varArea.area = e.map((x: any) => x.descr).join(", ");

    this.model.varConfiguracion.area_id = e.map((x: any) => x.id).join(",");
  }

  saveEducacionSelected(e: any) {
    this.vareducacionTemp = e;
    this.model.varEducacion.educacion = e.map((x: any) => x.descr).join(", ");

    this.model.varConfiguracion.educacion_id = e.map((x: any) => x.id).join(",");
  }

  saveConocimientoSelected(e: any) {
    this.varconocimientoTemp = e;
    this.model.varConocimiento.conocimiento = e.map((x: any) => x.descr).join(", ");

    this.model.varConfiguracion.conocimiento_id = e.map((x: any) => x.id).join(",");
  }

  saveExperienciaSelected(e: any) {
    this.varexperienciaTemp = e;
    this.model.varExperiencia.experiencia = e.map((x: any) => x.descr).join(", ");

    this.model.varConfiguracion.experiencia_id = e.map((x: any) => x.id).join(",");
  }

  saveCompetenciaSelected(e: any) {
    this.varcompetenciaTemp = e;
    this.model.varCompetencia.competencia = e.map((x: any) => x.descr).join(", ");

    this.model.varConfiguracion.competencia_id = e.map((x: any) => x.id).join(",");
  }

  saveConfiguracion() {
    this.model.varConfiguracion.usuario_creador = this.currentUser.usuario;
    this.model.varConfiguracion.usuario_modificador = this.currentUser.usuario;

    this.model.varConfiguracion.requisito_cargo = this.model.varConfiguracion.requisito_cargo == null || this.model.varConfiguracion.requisito_cargo == "" ? null : this.model.varConfiguracion.requisito_cargo.replace(/(?:\r\n|\r|\n)/g, '<br />');
    this.model.varConfiguracion.cuerpo = this.model.varCuerpo.cuerpo;
    this.model.varConfiguracion.especialidad = this.model.varEspecialidad.especialidad;
    this.model.varConfiguracion.area = this.model.varArea.area;

    this.model.varConfiguracion.educacion = this.model.varEducacion.educacion;
    this.model.varConfiguracion.conocimiento = this.model.varConocimiento.conocimiento;

    this.model.varConfiguracion.experiencia = this.model.varExperiencia.experiencia;
    this.model.varConfiguracion.competencia = this.model.varCompetencia.competencia;

    this.model.varConfiguracion.cuerpo_id = (this.model.varConfiguracion.cuerpo_id == null || this.model.varConfiguracion.cuerpo_id == "") ? null : this.model.varConfiguracion.cuerpo_id.toString();
    this.model.varConfiguracion.especialidad_id = (this.model.varConfiguracion.especialidad_id == null || this.model.varConfiguracion.especialidad_id == "") ? null : this.model.varConfiguracion.especialidad_id.toString();
    this.model.varConfiguracion.area_id = (this.model.varConfiguracion.area_id == null || this.model.varConfiguracion.area_id == "") ? null : this.model.varConfiguracion.area_id.toString();
    this.model.varConfiguracion.educacion_id = (this.model.varConfiguracion.educacion_id == null || this.model.varConfiguracion.educacion_id == "") ? null : this.model.varConfiguracion.educacion_id.toString();
    this.model.varConfiguracion.conocimiento_id = (this.model.varConfiguracion.conocimiento_id == null || this.model.varConfiguracion.conocimiento_id == "") ? null : this.model.varConfiguracion.conocimiento_id.toString();
    this.model.varConfiguracion.experiencia_id = (this.model.varConfiguracion.experiencia_id == null || this.model.varConfiguracion.experiencia_id == "") ? null : this.model.varConfiguracion.experiencia_id.toString();
    this.model.varConfiguracion.competencia_id = (this.model.varConfiguracion.competencia_id == null || this.model.varConfiguracion.competencia_id == "") ? null : this.model.varConfiguracion.competencia_id.toString();

    if (this.model.varConfiguracion.cargo_configuracion_id == 0) {
      this.cargo.createCargosConfiguracion(this.model.varConfiguracion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          let id = response.id;
          if (this.model.varCargosExperiencias.length > 0) {
            this.model.varCargosExperiencias.forEach((x: any) => {
              x.cargo_configuracion_id = id;
              x.cargo_id = Number(x.cargo_id);
      
              if (x.NuevoRegistro == true) {
                this.cargo.createCargosExperiencias(x).subscribe(data1 => {});
              }
            });
          }

          if (this.model.varUbicacionCargos.length > 0) {
            this.model.varUbicacionCargos.forEach((x: any) => {
              x.cargo_configuracion_id = id;
              x.usuario_creador = this.currentUser.usuario;
              x.usuario_modificador = this.currentUser.usuario;

              if (x.NuevoRegistro == true) {
                this.cargo.createUbicacionCargos(x).subscribe(data1 => {});
              }
            });
          }
          swal({
            title: 'Cargo / Grado Configuración',
            text: "Fue creado exitosamente",
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            //this.configModal = false;
            //this.reload();
            setTimeout(() => {
              this.getCargosConfiguracion(id);
            this.tab = 1;
            }, 500);
          })
        }
      });
    }
    else {
      this.cargo.updateCargosConfiguracion(this.model.varConfiguracion).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          if (this.model.varCargosExperiencias.length > 0) {
            this.model.varCargosExperiencias.forEach((x: any) => {
              x.cargo_configuracion_id = this.model.varConfiguracion.cargo_configuracion_id;
              x.cargo_id = Number(x.cargo_id);
      
              if (x.NuevoRegistro == true) {
                this.cargo.createCargosExperiencias(x).subscribe(data1 => {});
              }
              else {
                this.cargo.updateCargosExperiencias(x).subscribe(data1 => {});
              }
            });
          }

          if (this.model.varUbicacionCargos.length > 0) {
            this.model.varUbicacionCargos.forEach((x: any) => {
              x.cargo_configuracion_id = this.model.varConfiguracion.cargo_configuracion_id;
              x.usuario_creador = this.currentUser.usuario;
              x.usuario_modificador = this.currentUser.usuario;

              if (x.NuevoRegistro == true) {
                this.cargo.createUbicacionCargos(x).subscribe(data1 => {});
              }
              else {
                this.cargo.updateUbicacionCargos(x).subscribe(data1 => {});
              }
            });
          }
          swal({
            title: 'Cargo / Grado Configuración',
            text: "Fue actualizado exitosamente",
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            // this.configModal = false;
            // this.reload();
            setTimeout(() => {
              this.getCargosConfiguracion(this.model.varConfiguracion.cargo_configuracion_id);
            this.tab = 1;
            }, 500);
          })
        }
      });
    }
  }

  openDescripcion(texto: any) {
    swal({
      title: 'Descripción',
      html: '<textarea id="swal-input2" class="swal2-input" rows="100" style="height: 20em !important" disabled></textarea>',
      allowOutsideClick: false,
      showConfirmButton: true,
      customClass: 'sweetalert-lg',
      width: '800px',
      heightAuto: false,
      onOpen: () => {
        $('#swal-input2').val(texto.replace(/<br\s?\/?>/g, '\r\n'));
      }
    });
  }

  getCargosConfiguracion(id: any) {
    this.cargo.getCargosConfiguracionId({cargo_configuracion_id: id}).subscribe(data1 => {
      let response: any = this.api.ProcesarRespuesta(data1);
      if (response.tipo == 0) {
        if (response.result.length != 0) {
          let cargo = response.result[0];
          this.model.varConfiguracion.cargo_configuracion_id = cargo.cargo_configuracion_id;
          this.model.varConfiguracion.requisito_cargo = cargo.requisito_cargo == null ? null : cargo.requisito_cargo.replace(/<br\s?\/?>/g, '\r\n');
          this.model.varCuerpo.cuerpo = cargo.cuerpo;
          this.model.varConfiguracion.cuerpo_id = cargo.cuerpo_id;
          this.model.varEspecialidad.especialidad = cargo.especialidad;
          this.model.varConfiguracion.especialidad_id = cargo.especialidad_id;
          this.model.varArea.area = cargo.area;
          this.model.varConfiguracion.area_id = cargo.area_id;
          this.model.varEducacion.educacion = cargo.educacion;
          this.model.varConfiguracion.educacion_id = cargo.educacion_id;
          this.model.varConocimiento.conocimiento = cargo.conocimiento;
          this.model.varConfiguracion.conocimiento_id = cargo.conocimiento_id;
          this.model.varExperiencia.experiencia = cargo.experiencia;
          this.model.varConfiguracion.experiencia_id = cargo.experiencia_id;
          this.model.varCompetencia.competencia = cargo.competencia;
          this.model.varConfiguracion.competencia_id = cargo.competencia_id;
          this.model.varConfiguracion.observaciones = cargo.observaciones;

          this.arrCuerpo = Utilidades.toArray(cargo.cuerpo_id);
          this.arrEspecialidad = Utilidades.toArray(cargo.especialidad_id);
          this.arrArea = Utilidades.toArray(cargo.area_id);
          this.arrEducacion = Utilidades.toArray(cargo.educacion_id);
          this.arrConocimiento = Utilidades.toArray(cargo.conocimiento_id);
          this.arrExperiencia = Utilidades.toArray(cargo.experiencia_id);
          this.arrCompetencia = Utilidades.toArray(cargo.competencia_id);
          
          this.getCargosExperiencias(cargo.cargo_configuracion_id);
          this.getUbicacionCargos(cargo.cargo_configuracion_id);
        }
        else {
          this.model.varConfiguracion.cargo_configuracion_id = 0;
          this.model.varConfiguracion.requisito_cargo = "";
          this.model.varCuerpo.cuerpo = "";
          this.model.varConfiguracion.cuerpo_id = "";
          this.model.varEspecialidad.especialidad = "";
          this.model.varConfiguracion.especialidad_id = "";
          this.model.varArea.area = "";
          this.model.varConfiguracion.area_id = "";
          this.model.varEducacion.educacion = "";
          this.model.varConfiguracion.educacion_id = "";
          this.model.varConocimiento.conocimiento = "";
          this.model.varConfiguracion.conocimiento_id = "";
          this.model.varExperiencia.experiencia = "",
          this.model.varCompetencia.competencia = "";
          this.model.varConfiguracion.competencia_id = "";
          this.model.varConfiguracion.observaciones = "";

          this.model.varCargosExperiencias = [];
          this.model.varUbicacionCargos = [];
          this.model.varUbicacionCargosTemp = [];
        }
      }
    });
  }

  getUbicacionCargos(id: any) {
    this.cargo.getUbicacionCargosId({cargo_configuracion_id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.varUbicacionCargos = response.result;
        this.model.varUbicacionCargosTemp = response.result;
      }
    });
  }

  addUbicacion() {
    this.model.varUbicacionCargos.push({ ubicacion_cargo_id:0,cargo_configuracion_id:0,nivel_id1:0,nivel1:"",nivel_id2:0,nivel2:"",nivel_id3:0,nivel3:"",nivel_id4:0,nivel4:"",nivel_id5:0,nivel5:"",usuario_creador:"",usuario_modificador:"", NuevoRegistro:true, EliminarRegistro: false });
  }

  deleteUbicacion(index: any) {
    this.model.varUbicacionCargos.splice(index, 1);
  }

  getCargosInd(id: any) {
    this.cargo.getCargosId({cargo_id: id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        let cargo = response.result[0];
        this.model.varCargo.cargo_id = cargo.cargo_id;
        this.model.varCargo.cargo = cargo.cargo;
        this.model.varCargo.descripcion = cargo.descripcion == null ? cargo.descripcion : cargo.descripcion.replace(/<br\s?\/?>/g, '\r\n');
        this.model.varCargo.clase_cargo_id = cargo.clase_cargo_id;
        this.model.varCargo.categoria_id = cargo.categoria_id;
        this.model.varCargo.cargo_ruta_id = cargo.cargo_ruta_id;
        this.model.varCargo.activo = (cargo.activo == 'S') ? true : false;

        this.model.cargo = cargo.cargo;

        this.changeCategoria(cargo.categoria_id);

        this.getCargosGrados(cargo.cargo_id);
      }
    });
  }

  eliminarRegistro(data: any, index: any) {
    swal({
      title: 'Cargos Grados',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      type: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          cargo_grado_id: data.cargo_grado_id
        }
        this.cargo.deleteCargosGradosById(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.varGrados.splice(index, 1);
          }
        });
      }
    }));
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveJefe(index: any) {
    this.titleModal = 'Cargo Jefe Inmediato';
    this.array = this.lstCargos;
    this.inputform = 'jefe';
    this.indexform = index;
    this.selectModal = true;
  }

  saveCargoExperiencia(index: any) {
    this.titleModal = 'Experiencia: cargos previos a desempeñar';
    this.array = this.lstCargos;
    this.inputform = 'cargo-experiencia';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel1(index: any) {
    this.titleModal = 'Nivel 1';
    this.array = this.lstNivel1;
    this.inputform = 'nivel1';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel2(index: any) {
    this.titleModal = 'Nivel 2';
    this.array = this.lstNivel2;
    this.inputform = 'nivel2';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel3(index: any) {
    this.titleModal = 'Nivel 3';
    this.array = this.lstNivel3;
    this.inputform = 'nivel3';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel4(index: any) {
    this.titleModal = 'Nivel 4';
    this.array = this.lstNivel4;
    this.inputform = 'nivel4';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel5(index: any) {
    this.titleModal = 'Nivel 5';
    this.array = this.lstNivel5;
    this.inputform = 'nivel5';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel6(index: any) {
    this.titleModal = 'Nivel 6';
    this.array = this.lstNivel6;
    this.inputform = 'nivel6';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel7(index: any) {
    this.titleModal = 'Nivel 7';
    this.array = this.lstNivel7;
    this.inputform = 'nivel7';
    this.indexform = index;
    this.selectModal = true;
  }

  saveNivel8(index: any) {
    this.titleModal = 'Nivel 8';
    this.array = this.lstNivel8;
    this.inputform = 'nivel8';
    this.indexform = index;
    this.selectModal = true;
  }

  dataform(inputform: any, data: any) {
    this.selectModal = false;

    if (inputform == 'cargo-experiencia') {
      this.model.varCargosExperiencias[this.indexform].cargo_previo_id = data.cargo_id;
      this.model.varCargosExperiencias[this.indexform].cargo_previo = data.cargo;
    }

    if (inputform == 'jefe') {
      this.model.varUbicacionCargos[this.indexform].cargo_jefe_inmediato_id = data.cargo_id;
      this.model.varUbicacionCargos[this.indexform].cargo_jefe_inmediato = data.cargo;
    }

    if (inputform == 'nivel1') {
      this.model.varUbicacionCargos[this.indexform].nivel_id1 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel1 = data.descripcion;
    }

    if (inputform == 'nivel2') {
      this.model.varUbicacionCargos[this.indexform].nivel_id2 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel2 = data.descripcion;
    }

    if (inputform == 'nivel3') {
      this.model.varUbicacionCargos[this.indexform].nivel_id3 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel3 = data.descripcion;
    }

    if (inputform == 'nivel4') {
      this.model.varUbicacionCargos[this.indexform].nivel_id4 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel4 = data.descripcion;
    }

    if (inputform == 'nivel5') {
      this.model.varUbicacionCargos[this.indexform].nivel_id5 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel5 = data.descripcion;
    }

    if (inputform == 'nivel6') {
      this.model.varUbicacionCargos[this.indexform].nivel_id6 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel6 = data.descripcion;
    }

    if (inputform == 'nivel7') {
      this.model.varUbicacionCargos[this.indexform].nivel_id7 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel7 = data.descripcion;
    }

    if (inputform == 'nivel8') {
      this.model.varUbicacionCargos[this.indexform].nivel_id8 = data.id;
      this.model.varUbicacionCargos[this.indexform].nivel8 = data.descripcion;
    }
  }

  getPermisos(user: any, url: any) {
    url = url.replace('/fac', '');
    this.usuario.getPermisosByUser({usuario: user, url: url}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varPermisos.consultar = response.result.consultar;
        this.varPermisos.crear = response.result.crear;
        this.varPermisos.actualizar = response.result.actualizar;
        this.varPermisos.eliminar = response.result.eliminar;
      }
    })
  }

  getCargosFull() {
    this.cargo.getCargosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.descripcion = x.cargo;
          x.sigla = x.categoria_id == 5 ? "OFICIALES" : "SUBOFICIALES";
        });
        this.lstCargos = response.result;
      }
    });
  }

  eliminarUbicacionRegistro(item: any, index: any) {
    swal({
      title: 'Ubicación de Cargos',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      type: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          ubicacion_cargo_id: item.ubicacion_cargo_id
        }
        this.cargo.deleteUbicacionCargosId(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.varUbicacionCargos.splice(index, 1);
          }
        });
      }
    }));
  }

  eliminarCargosExperienciasRegistro(item: any, index: any) {
    swal({
      title: 'Experiencia: cargos previos a desempeñar',
      text: "¿Está seguro que desea eliminar el registro?",
      allowOutsideClick: false,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: "#ed1c24",
      type: 'question'
    }).then(((result: any) => {
      if (result.dismiss != "cancel") {
        let json = {
          cargo_experiencia_id: item.cargo_experiencia_id
        }
        this.cargo.deleteCargosExperienciasId(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.varCargosExperiencias.splice(index, 1);
          }
        });
      }
    }));
  }

  getListasNiveles() {
    this.cargo.getListasNiveles().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        let ubicacion: any = response.result;
        this.lstNivel1 = ubicacion.filter((x: any) => x.nivel_id == 1);
        this.lstNivel1.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
        this.lstNivel2 = ubicacion.filter((x: any) => x.nivel_id == 2);
        this.lstNivel2.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
        this.lstNivel3 = ubicacion.filter((x: any) => x.nivel_id == 3);
        this.lstNivel3.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
        this.lstNivel4 = ubicacion.filter((x: any) => x.nivel_id == 4);
        this.lstNivel4.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
        this.lstNivel5 = ubicacion.filter((x: any) => x.nivel_id == 5);
        this.lstNivel5.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
        this.lstNivel6 = ubicacion.filter((x: any) => x.nivel_id == 6);
        this.lstNivel6.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
        this.lstNivel7 = ubicacion.filter((x: any) => x.nivel_id == 7);
        this.lstNivel7.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
        this.lstNivel8 = ubicacion.filter((x: any) => x.nivel_id == 8);
        this.lstNivel8.forEach((x: any) => {
          x.id = x.lista_dinamica_id;
          x.detalle = x.lista_dinamica;
          x.descripcion = x.lista_dinamica;
          x.sigla = "";
        });
      }
    });
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }
}
