import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RutaCarreraService } from '../../../services/modules/ruta-carrera.service';
import { CuerpoService } from '../../../services/modules/cuerpo.service';
import { EspecialidadService } from '../../../services/modules/especialidad.service';
import { AreaService } from '../../../services/modules/area.service';
import { CargoService } from '../../../services/modules/cargo.service';
import { GradoService } from '../../../services/modules/grado.service';
// import { Utilidades } from '../../../helper/utilidades';

declare var $:any;
declare var swal:any;

export class Model {
  title = "";
  tipo = "";

  varRutaCarrera: any = {
    ruta_carrera_id: 0,
    cuerpo_id: 0,
    cuerpo: "",
    especialidad_id: 0,
    especialidad: "",
    area_id: 0,
    area: "",
    descripcion: "",
    tipo_categoria_id: 0,
    tipo_ruta_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  }

  varConsulta: any = {
    tipo_ruta_id: 0,
    tipo_ruta: "",
    tipo_categoria_id: 0,
    tipo_categoria: "",
    especialidad_id: 0,
    especialidad: ""
  }

  varDetalleCargo: any = {
    cargo_id: 0,
    cargo: "",
    categoria: "",
    clase_cargo: "",
    cargo_ruta: "",
    descripcion: ""
  }

  varDetalleGrado: any = {
    grado_id: 0,
    grado: "",
    descripcion: "",
    duracion: 0,
    nivel_id: 0,
    nivel: "",
    grado_previo_id: 0,
    grado_previo: "",
    categoria_id: 0,
    categoria: ""
  };

  varConfiguracion: any = {
    puesto_cantidad: 0,
    cargo_jefe_inmediato_id: 0,
    nivel1: 0,
    nivel2: 0,
    nivel3: 0,
    nivel4: 0,
    nivel5: 0,
    anio: 0,
    mes: 0,
    requisito_cargo: "",
    cuerpo: "",
    especialidad: "",
    area: "",
    educacion: "",
    conocimiento: "",
    experiencia: "",
    competencia: ""
  }
}

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.scss']
})
export class RutaComponent implements OnInit {

  model = new Model();

  modal: any;
  consultaModal: any;
  especialidadModal: any;
  workflowModal: any;
  viewCargoModal: any;
  piramideModal: any;
  detalleReqModal: any;
  detalleModal: any;
  detalleCargoModal: any;
  detalleGradoModal: any;
  rutaCarreraModal: any;
  configModal: any;
  loader = false;

  varhistorial: any = [];
  varhistorialTemp: any = [];
  varRutaCarrera: any = [];

  varlinea: any = [];

  varcategoria: any = [];
  varcuerpo: any = [];
  varcuerpoTemp: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  vararea: any = [];
  varareaTemp: any = [];
  varcargoruta: any = [];
  vartiporuta: any = [];
  vartipocargo: any = [];
  varcargo: any = [];
  varcargoTemp: any = [];
  varcargoOficial: any = [];
  varcargoSubOficial: any = [];
  varruta: any = [];
  vargrado: any = [];
  vargradoTemp: any = [];
  vargradoOficial: any = [];
  vargradoSubOficial: any = [];

  lstEspecialidad: any = [];
  lstGrados: any = [];

  tipo_categoria_id: any;
  especialidad_id: any;
  cargo_grado_id:any;

  datasource1: any = [];

  varPiramide1: any = [];
  varPiramide2: any = [];

  tituloCargo = "";
  datosCargo = "";
  detalle = "";
  titleDetalle = "";

  currentUser: any;

  titleModal = "";
  selectModal: any;
  array: any = [];
  indexform: any;

  lstRutas: any = [];

  sizeModal = "";
  lstCargo: any = [];
  lstCuerpo: any = [];
  lstEspec: any = [];
  lstArea: any = [];

  tab: any;

  cargo_desc = "";
  grado_desc = "";
  categoria = "";

  lstCargos: any = [];

  varnivel1: any = [];
  varnivel2: any = [];
  varnivel3: any = [];
  varnivel4: any = [];
  varnivel5: any = [];

  constructor(private router: Router,
              private api: ApiService,
              private ruta: RutaCarreraService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService,
              private area: AreaService,
              private cargo: CargoService,
              private grado: GradoService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varRutaCarrera.usuario_creador = this.currentUser.usuario;
    this.model.varRutaCarrera.usuario_modificador = this.currentUser.usuario;
    this.tab = 1;
  }

  ngOnInit(): void {
    this.getRutaCarrera();
    this.getCuerposFull();
    this.getEspecialidadesFull();
    this.getAreasFull();
    this.getCargosFull();
    this.getGradosFull();
    // this.getCuerposEspecialidadesAreasRutaCarrera();
    this.getEspecialidadesRutas();
    this.getRutaCarreraActivos();
    this.getListas();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.cuerpo.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.especialidad.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  getRutaCarrera() {
    let json = {
      filtro: 0
    };

    this.ruta.getRutaCarrera(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.ruta_carrera_id;
        });
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getCuerposFull() {
    this.cuerpo.getCuerposFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.descripcion = x.cuerpo;
        });
        this.varcuerpoTemp = response.result;
      }
    });
  }

  getEspecialidadesFull() {
    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.descripcion = x.especialidad;
        });
        this.varespecialidadTemp = response.result;
      }
    })
  }

  getAreasFull() {
    this.area.getAreasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.descripcion = x.area;
        });
        this.varareaTemp = response.result;
      }
    })
  }

  getCargosFull() {
    this.cargo.getCargosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varcargoOficial = response.result.filter((x: any) => x.categoria_id == 5);
        this.varcargoSubOficial = response.result.filter((x: any) => x.categoria_id == 6);
        this.lstCargos = response.result;
      }
    })
  }

  getGradosFull() {
    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.vargradoOficial = response.result.filter((x: any) => x.categoria_id == 5);
        this.vargradoSubOficial = response.result.filter((x: any) => x.categoria_id == 6);
        this.lstGrados = response.result;
      }
    });
  }

  getCuerposEspecialidadesAreasRutaCarrera() {
    this.ruta.getCuerposEspecialidadesAreasRutaCarrera().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        console.log(response.result);
      }
    })
  }

  getEspecialidadesRutas() {
    this.ruta.getEspecialidadesRutas().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstEspecialidad = response.result;
      }
    });
  }

  getRutaCarreraActivos() {
    this.ruta.getRutaCarreraActivos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varRutaCarrera = response.result;
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
    this.varcargoruta = varlistas.filter((x: any) => x.nombre_lista == 'BAS_CARGO_RUTA');
    this.varcargoruta.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    let vartiporuta = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_RUTA');
    vartiporuta.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.vartiporuta = vartiporuta.sort((x1: any, x2: any) => {
      if (x1.detalle > x2.detalle) {
        return 1;
      }
      if (x1.detalle < x2.detalle) {
        return -1;
      }
      return 0;
    });

    this.vartipocargo = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CARGO');
    this.vartipocargo.forEach((x: any) => {
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
  }

  openModal() {
    this.modal = true;
    this.model = new Model();
    this.model.title = "Crear Ruta de Carrera";
    this.model.tipo = "C";
    this.varruta = [];

    this.model.varRutaCarrera.usuario_creador = this.currentUser.usuario;
    this.model.varRutaCarrera.usuario_modificador = this.currentUser.usuario;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  editRutaCarrera(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Ruta de Carrera";
    this.model.tipo = "U";

    this.model.varRutaCarrera.ruta_carrera_id = data.ruta_carrera_id;
    this.model.varRutaCarrera.cuerpo_id = data.cuerpo_id;
    this.model.varRutaCarrera.cuerpo = data.cuerpo;
    this.model.varRutaCarrera.especialidad_id = data.especialidad_id;
    this.model.varRutaCarrera.especialidad = data.especialidad;
    this.model.varRutaCarrera.area_id = data.area_id;
    this.model.varRutaCarrera.area = data.area;
    this.model.varRutaCarrera.tipo_categoria_id = data.tipo_categoria_id;
    this.model.varRutaCarrera.tipo_ruta_id = data.tipo_ruta_id;
    this.model.varRutaCarrera.descripcion = data.descripcion;
    this.model.varRutaCarrera.activo = (data.activo == 'S') ? true : false;

    this.model.varRutaCarrera.usuario_creador = this.currentUser.usuario;
    this.model.varRutaCarrera.usuario_modificador = this.currentUser.usuario;

    this.varcuerpo = this.varcuerpoTemp.filter((x: any) => x.tipo_categoria_id == data.tipo_categoria_id);
    this.varespecialidad = this.varespecialidadTemp.filter((x: any) => x.tipo_categoria_id == data.tipo_categoria_id && x.cuerpo_id == data.cuerpo_id);
    this.vararea = this.varareaTemp.filter((x: any) => x.tipo_categoria_id == data.tipo_categoria_id && x.especialidad_id == data.especialidad_id);

    if (data.tipo_categoria_id == 5) {
      this.varcargo = this.varcargoOficial;
      this.vargrado = this.vargradoOficial;
    }
    else if (data.tipo_categoria_id == 6) {
      this.varcargo = this.varcargoSubOficial;
      this.vargrado = this.vargradoSubOficial;
    }

    this.ruta.getRutas({ruta_carrera_id: data.ruta_carrera_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.activo = (x.activo == 'S') ? true : false;
        });
        this.varruta = response.result;
      }
    });

    if (data.tipo_categoria_id == 5) {
      this.varcargo = this.varcargoOficial;
      this.vargrado = this.vargradoOficial;
    }
    else if (data.tipo_categoria_id == 6) {
      this.varcargo = this.varcargoSubOficial;
      this.vargrado = this.vargradoSubOficial;
    }
  }

  openConsulta() {
    this.consultaModal = true;
    this.model.varConsulta.tipo_ruta = "";
    this.model.varConsulta.tipo_categoria = "";
    this.model.varConsulta.especialidad = "";
  }

  closeConsultaModal(bol: any) {
    this.consultaModal = bol;
  }

  openEspecialidad() {
    this.especialidadModal = true;
  }

  closeEspecialidadModal(bol: any) {
    this.especialidadModal = bol;
  }

  openWorkflow() {
    this.workflowModal = true;
    this.consultaModal = false;

    this.ruta.getCargosByRutas(this.model.varConsulta).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (response.result.length != false) {
          this.workflowModal = true;
          this.consultaModal = false;

          this.lstRutas = response.result;
        }
        else {
          swal({
            title: 'ERROR',
            text: 'No se encuentra la información.',
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'error'
          }).then((result: any) => {
            this.model.varConsulta.tipo_categoria_id = 0;
            this.model.varConsulta.especialidad_id = 0;
            this.model.varConsulta.tipo_ruta_id = 0;
          });
        }
      }
    });
  }

  closeWorkflowModal(bol: any) {
    this.workflowModal = bol;
    this.reload();
  }

  closeViewCargoModal(bol: any) {
    this.viewCargoModal = bol;
  }

  openPiramide() {
    this.piramideModal = true;
    this.consultaModal = false;

    this.model.varConsulta.especialidad_id = Number(this.model.varConsulta.especialidad_id);

    this.ruta.getGradosByEspecialidad(this.model.varConsulta).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varPiramide1 = response.result;
      }
    });

    this.ruta.getGradosDetalleByEspecialidad(this.model.varConsulta).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varPiramide2 = response.result;
      }
    });
  }

  closePiramideModal(bol: any) {
    this.piramideModal = bol;
  }

  openDetalle(dato: any) {
    this.detalleReqModal = true;

    this.ruta.getGradosDetalleRequerimiento({ especialidad_id: dato.especialidad_id, grado_id: dato.grado_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.detalle = response.result.map((x: any) => x.detalle).join('<br />');
        $('#text').html(this.detalle);
      }
    });
  }

  openDirectos(data: any) {
    this.detalleModal = true;
    this.sizeModal = "modal-detalle-sm";

    this.ruta.getGradosDetalleCargo({ ruta_carrera_id: data.ruta_carrera_id, grado_id: data.grado_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.cargo = x.cargo.split(',');
        });
        this.lstCargo = response.result;
      }
    });

    // this.grado.getDetalleGrados({grado_id: data.grado_id}).subscribe(data1 => {
    //   let response: any = this.api.ProcesarRespuesta(data1);
    //   if (response.tipo == 0) {
    //     var dato = response.result[0];
    //     this.model.varDetalleGrado.grado_id = dato.grado_id;
    //     this.model.varDetalleGrado.grado = dato.grado;
    //     this.model.varDetalleGrado.descripcion = dato.descripcion;
    //     this.model.varDetalleCargo.duracion = dato.duracion;
    //     this.model.varDetalleGrado.grado_previo_id = dato.grado_previo_id;
    //     this.model.varDetalleGrado.grado_previo = dato.grado_previo;
    //     this.model.varDetalleGrado.nivel_id = dato.nivel_id;
    //     this.model.varDetalleGrado.nivel = dato.nivel;
    //     this.model.varDetalleGrado.categoria_id = dato.categoria_id;
    //     this.model.varDetalleGrado.categoria = dato.categoria;
    //   }
    // })
  }
  
  closeDetalleModal(bol: any) {
    this.detalleModal = bol;
  }

  closeDetalleReqModal(bol: any) {
    this.detalleReqModal = bol;
  }

  addLinea() {
    this.varlinea.push({linea_cargo_id: 0,ruta_carrera_id: 0,cargo_ruta_id: 0,tipo_ruta_id: 0,tipo_cargo_id: 0,activo: true,usuario_creador: this.currentUser.usuario,usuario_modificador: this.currentUser.usuario, NuevoRegistro: true});
  }

  deleteLinea(id: any) {
    this.varlinea.splice(id, 1);
  }

  addRuta() {
    this.varruta.push({ruta_id:0,ruta_carrera_id:0,cargo_id:0,cargo_prev_id:0,ruta_padre_id:0,activo:true,usuario_creador: this.currentUser.usuario,usuario_modificador: this.currentUser.usuario, NuevoRegistro: true})
  }

  deleteRuta(id: any) {
    this.varruta.splice(id, 1);
  }

  changeCategoria(id: any) {
    this.ruta.getCuerposByCategoria({ tipo_categoria_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.descripcion = x.cuerpo;
        });
        this.varcuerpo = response.result;
        this.tipo_categoria_id = response.result[0].tipo_categoria_id;

        this.model.varRutaCarrera.cuerpo_id = 0;
        this.model.varRutaCarrera.cuerpo = "";
        this.model.varRutaCarrera.especialidad_id = 0;
        this.model.varRutaCarrera.especialidad = "";
        this.model.varRutaCarrera.area_id = 0;
        this.model.varRutaCarrera.area = "";
      }
    });

    if (id == 5) {
      this.varcargo = this.varcargoOficial;
      this.vargrado = this.vargradoOficial;
    }
    else if (id == 6) {
      this.varcargo = this.varcargoSubOficial;
      this.vargrado = this.vargradoSubOficial;
    }
  }

  saveRuta() {
    this.model.varRutaCarrera.cuerpo_id = Number(this.model.varRutaCarrera.cuerpo_id);
    this.model.varRutaCarrera.especialidad_id = Number(this.model.varRutaCarrera.especialidad_id);
    this.model.varRutaCarrera.area_id = Number(this.model.varRutaCarrera.area_id);
    this.model.varRutaCarrera.tipo_categoria_id = Number(this.model.varRutaCarrera.tipo_categoria_id);
    this.model.varRutaCarrera.tipo_ruta_id = Number(this.model.varRutaCarrera.tipo_ruta_id);

    let esEscontrado = this.varhistorial.filter((x: any) => (x.especialidad_id == this.model.varRutaCarrera.especialidad_id) && (x.tipo_ruta_id == this.model.varRutaCarrera.tipo_ruta_id) && (x.area_id == this.model.varRutaCarrera.area_id));
    if (esEscontrado.length == 1) {
      swal({
        title: 'ADVERTENCIA',
        text: 'La ruta de carrera ya existe.',
        allowOutsideClick: false,
        showConfirmButton: true,
        type: 'warning'
      });
    }
    else {
      this.ruta.createRutaCarrera(this.model.varRutaCarrera).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          if (this.varruta.length > 0) {
            this.varruta.forEach((element: any) => {
              element.ruta_carrera_id = response.id;
              element.cargo_id = Number(element.cargo_id);

              if (element.NuevoRegistro == true)
                this.ruta.createRutas(element).subscribe(data1 => {});

              swal({
                title: 'Ruta de Carrera',
                text: response.mensaje,
                allowOutsideClick: false,
                showConfirmButton: true,
                type: 'success'
              }).then((result: any) => {
                this.modal = false;
                this.reload();
              })
            });
          }
          else {
            swal({
              title: 'Ruta de Carrera',
              text: response.mensaje,
              allowOutsideClick: false,
              showConfirmButton: true,
              type: 'success'
            }).then((result: any) => {
              this.modal = false;
              this.reload();
            });
          }
        }
      });
    }
  }

  updateRuta() {
    this.model.varRutaCarrera.cuerpo_id = Number(this.model.varRutaCarrera.cuerpo_id);
    this.model.varRutaCarrera.especialidad_id = Number(this.model.varRutaCarrera.especialidad_id);
    this.model.varRutaCarrera.area_id = Number(this.model.varRutaCarrera.area_id);
    this.model.varRutaCarrera.tipo_categoria_id = Number(this.model.varRutaCarrera.tipo_categoria_id);
    this.model.varRutaCarrera.tipo_ruta_id = Number(this.model.varRutaCarrera.tipo_ruta_id);

    this.ruta.updateRutaCarrera(this.model.varRutaCarrera).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.varruta.length > 0) {
          this.varruta.forEach((element: any) => {
            element.ruta_carrera_id = this.model.varRutaCarrera.ruta_carrera_id;
            element.cargo_id = Number(element.cargo_id);

            if (element.NuevoRegistro == true) {
              this.ruta.createRutas(element).subscribe(data1 => {
                this.api.ProcesarRespuesta(data1);
              });
            }
            else {
              this.ruta.updateRutas(element).subscribe(data1 => {
                this.api.ProcesarRespuesta(data1);
              });
            }
          });
        }
        swal({
          title: 'Ruta de Carrera',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        });
      }
    });
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveCuerpo() {
    this.titleModal = 'Cuerpos';
    this.array = this.varcuerpo;
    this.indexform = 'cuerpo';
    this.selectModal = true;
  }

  saveEspecialidad() {
    this.titleModal = 'Especialidades';
    this.array = this.varespecialidad;
    this.indexform = 'especialidad';
    this.selectModal = true;
  }

  saveArea() {
    this.titleModal = 'Áreas de Conocimiento';
    this.array = this.vararea;
    this.indexform = 'area';
    this.selectModal = true;
  }

  saveTipoRuta() {
    this.array = this.varRutaCarrera;
    this.indexform = 'rutacarrera';
    this.rutaCarreraModal = true;
  }

  dataform(indexform: any, data: any, tipo: any = 1) {
    if (tipo == 1) this.selectModal = false;
    else if (tipo == 2) this.rutaCarreraModal = false;

    if (indexform == 'cuerpo') {
      this.model.varRutaCarrera.cuerpo_id = data.cuerpo_id;
      this.model.varRutaCarrera.cuerpo = data.descripcion;

      this.model.varRutaCarrera.especialidad_id = 0;
      this.model.varRutaCarrera.especialidad = "";
      this.model.varRutaCarrera.area_id = 0;
      this.model.varRutaCarrera.area = "";

      let json: any = {
        tipo_categoria_id: data.tipo_categoria_id,
        cuerpo_id: data.cuerpo_id
      }
      this.ruta.getEspecialidadesByCategoriaCuerpo(json).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          response.result.forEach((x: any) => {
            x.descripcion = x.especialidad;
          });
          this.varespecialidad = response.result;
        }
      });
    }

    if (indexform == 'especialidad') {
      this.model.varRutaCarrera.especialidad_id = data.especialidad_id;
      this.model.varRutaCarrera.especialidad = data.descripcion;

      this.model.varRutaCarrera.area_id = 0;
      this.model.varRutaCarrera.area = "";

      let json: any = {
        tipo_categoria_id: data.tipo_categoria_id,
        especialidad_id: data.especialidad_id
      }
      this.ruta.getAreasByCategoriaEspecialidad(json).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data)
        if (response.tipo == 0) {
          response.result.forEach((x: any) => {
            x.descripcion = x.area;
          });
          this.vararea = response.result;
        }
      });
    }
    if (indexform == 'area') {
      this.model.varRutaCarrera.area_id = data.area_id;
      this.model.varRutaCarrera.area = data.descripcion;
    }
    if (indexform == 'rutacarrera') {
      this.model.varConsulta.tipo_ruta_id = data.tipo_ruta_id;
      this.model.varConsulta.tipo_ruta = data.tipo_ruta;
      this.model.varConsulta.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varConsulta.tipo_categoria = data.tipo_categoria;
      this.model.varConsulta.especialidad_id = data.especialidad_id;
      this.model.varConsulta.especialidad = data.especialidad;
    }
  }

  openDetalleCargo() {
    this.detalleCargoModal = true;
  }

  closeDetalleCargoModal(bol: any) {
    this.detalleCargoModal = bol;
  }

  closeDetalleGradoModal(bol: any) {
    this.detalleGradoModal = bol;
  }

  closeRutaCarreraModal(bol: any) {
    this.rutaCarreraModal = bol;
  }

  openDetalleCargoRutaCarrera(dato: any) {
    this.lstCuerpo = [];
    this.lstEspec = [];
    this.lstArea = [];
    this.viewCargoModal = true;
    this.tituloCargo = dato.cargo + ' (' + dato.grado + ')';
    this.cargo_desc = dato.cargo;
    this.grado_desc = dato.grado_desc;
    this.categoria = dato.categoria;
    
    this.ruta.getDetalleCargoRutaCarrera({cargo_id: dato.cargo_id,grado_id: dato.grado_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (response.result.length == 0) this.cargo_grado_id = 0;
        else this.cargo_grado_id = response.result[0].cargo_grado_id;

        response.result.forEach((x: any) => {
          this.lstCuerpo = x.cuerpo.split(',');
          this.lstEspec = x.especialidad.split(',');
          this.lstArea = x.area.split(',');
        });
      }
    });

    this.cargo.getDetalleCargos({cargo_id: dato.cargo_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.model.varDetalleCargo.cargo = response.result[0].cargo;
        this.model.varDetalleCargo.categoria = response.result[0].categoria;
        this.model.varDetalleCargo.clase_cargo = response.result[0].clase_cargo;
        this.model.varDetalleCargo.cargo_ruta = response.result[0].cargo_ruta;
        this.model.varDetalleCargo.descripcion = response.result[0].descripcion;
      }
    });
  }

  openConfigModal() {
    if (this.cargo_grado_id != 0) {
      this.configModal = true;
      this.cargo.getCargosConfiguracion({cargo_grado_id: this.cargo_grado_id}).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0)  {
          let dato = response.result[0];
          this.model.varConfiguracion.cargo = this.cargo_desc;
          this.model.varConfiguracion.grado = this.grado_desc;
          this.model.varConfiguracion.categoria = this.categoria;
          this.model.varConfiguracion.puesto_cantidad = dato.puesto_cantidad;
          this.model.varConfiguracion.cargo_jefe_inmediato_id = dato.cargo_jefe_inmediato_id;
          this.model.varConfiguracion.nivel1 = dato.nivel1;
          this.model.varConfiguracion.nivel2 = dato.nivel2;
          this.model.varConfiguracion.nivel3 = dato.nivel3;
          this.model.varConfiguracion.nivel4 = dato.nivel4;
          this.model.varConfiguracion.nivel5 = dato.nivel5;
          this.model.varConfiguracion.anio = dato.anio;
          this.model.varConfiguracion.mes = dato.mes;
          this.model.varConfiguracion.requisito_cargo = dato.requisito_cargo;
          this.model.varConfiguracion.cuerpo = dato.cuerpo;
          this.model.varConfiguracion.especialidad = dato.especialidad;
          this.model.varConfiguracion.area = dato.area;
          this.model.varConfiguracion.educacion = dato.educacion;
          this.model.varConfiguracion.conocimiento = dato.conocimiento;
          this.model.varConfiguracion.experiencia = dato.experiencia;
          this.model.varConfiguracion.competencia = dato.competencia;
          this.model.varConfiguracion.observaciones = dato.observaciones;
        }
      });
    }
    else {
      swal({
        text: 'No hay información del cargo',
        allowOutsideClick: false,
        showConfirmButton: true,
      })
    }
  }

  closeConfigModal(bol: any) {
    this.configModal = bol;
  }

  selectTab(tab: any) {
    this.tab = tab;
  }
}
