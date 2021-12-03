import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RutaCarreraService } from '../../../services/modules/ruta-carrera.service';
import { CuerpoService } from '../../../services/modules/cuerpo.service';
import { EspecialidadService } from '../../../services/modules/especialidad.service';
import { AreaService } from '../../../services/modules/area.service';
import { CargoService } from '../../../services/modules/cargo.service';
import { GradoService } from '../../../services/modules/grado.service';

declare var $:any;
declare var swal:any;

export function replace(input: string) {
  var newline = String.fromCharCode(13, 10);
  return replaceAll(input, "<br />", newline.toString());
}

export function replaceAll(str: any, find: any, replace: any) {
  return str.replace(new RegExp(find, 'g'), replace);
}

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
    especialidad_id: 0,
    tipo_ruta_id: 0
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
  detalleModal: any;
  loader = false;

  varhistorial: any = [];
  varhistorialTemp: any = [];

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

  tipo_categoria_id: any;
  especialidad_id: any;

  varitem = [
    {
      id: 1,
      cuerpo: "Cuerpo 1",
      especialidad: "Especialidad 1"
    },
    {
      id: 2,
      cuerpo: "Cuerpo 2",
      especialidad: "Especialidad 2"
    }
  ];

  datasource = {
    'id': '1',
    'name': 'Cargo (Cargo 1)',
    'className': 'confianza',
    'parent_id': null,
    'children': [
      { 
        'id': '2',
        'name': 'Cargo (Cargo 2)',
        'parent_id': '1',
        'className': 'critico',
        'children': [
          { 
            'name': 'Cargo (Cargo 3)',
            'parent_id': '2',
            'className': 'clave',
            'children': []
          },
          { 
            'name': 'Cargo (Cargo 4)',
            'parent_id': '2',
            'className': 'critico',
            'children': []
          }
        ]
      },
      { 
        'id': '3',
        'name': 'Cargo (Cargo 5)',
        'parent_id': '1',
        'className': 'confianza',
        'children': []
      },
      { 
        'id': '4',
        'name': 'Cargo (Cargo 6)',
        'className': 'critico',
        'children': [
          { 
            'name': 'Cargo (Cargo 7)',
            'parent_id': '4',
            'className': 'confianza',
            'children': []
          },
          { 
            'name': 'Cargo (Cargo 8)',
            'parent_id': '4',
            'className': 'clave',
            'children': []
          }
        ]
      }
    ]
  };

  datasource1: any = [];

  varPiramide1: any = [];
  varPiramide2: any = [];

  datos = "Cuerpos:\nXXXXXXXX\nXXXXX\nXXXXXXXX\nXXX\n\nEspecialidades:\nXXXXXXXX\nXXXXX\nXXXXXXXX\nXXX\n\nÁreas de Conocimientos:\nXXXXXXXX\nXXXXX\nXXXXXXXX\nXXX\n";
  tituloCargo = "";
  datosCargo = "";
  detalle = "";
  titleDetalle = "";

  currentUser: any;

  titleModal = "";
  selectModal: any;
  array: any = [];
  indexform: any;

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
  }

  ngOnInit(): void {
    this.getRutaCarrera();
    this.getCuerposFull();
    this.getEspecialidadesFull();
    this.getAreasFull();
    this.getCargosFull();
    this.getGradosFull();
    this.getCuerposEspecialidadesAreasRutaCarrera();
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
        this.lstEspecialidad = response.result;
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
      }
    })
  }

  getGradosFull() {
    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.vargradoOficial = response.result.filter((x: any) => x.categoria_id == 5);
        this.vargradoSubOficial = response.result.filter((x: any) => x.categoria_id == 6);
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
    this.vartiporuta = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_RUTA');
    this.vartiporuta.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
    this.vartipocargo = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CARGO');
    this.vartipocargo.forEach((x: any) => {
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

    this.model.varConsulta.especialidad_id = Number(this.model.varConsulta.especialidad_id);
    this.model.varConsulta.tipo_ruta_id = Number(this.model.varConsulta.tipo_ruta_id);

    this.ruta.getCargosByRutas(this.model.varConsulta).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.datasource1 = response.result;
      }
    });

    setTimeout(() => { this.orgchartinit(); }, 1000);
  }

  closeWorkflowModal(bol: any) {
    this.workflowModal = bol;
    this.reload();
  }

  orgchartinit() {
    let th = this;
    let nodeTemplate = function(data: any) {
      return `
        <div class="title">
          ${data.name}
          <i class="icon fas fa-1mx fa-arrow-circle-right pointer noselect"></i>
        </div>
      `;
    };
    $('#chart-container').orgchart({
      'data' : this.datasource1,
      'chartClass': 'orgchart-demo',
      'nodeTemplate': nodeTemplate,
      'createNode': function($node: any, data: any) {
        $node.on('click', function() {
          th.viewCargoModal = true;
          th.tituloCargo = data.name;
          th.ruta.getDetalleCargoRutaCarrera({cargo_id: Number(data.id)}).subscribe(data1 => {
            let response: any = th.api.ProcesarRespuesta(data1);
            if (response.tipo == 0) {
              if (response.result.length != 0) {
                $('#textcargo').html(response.result[0].detalle);
              }
              else {
                $('#textcargo').html('No hay información.');
              }
            }
          });
        });
      }
    });
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
    this.detalleModal = true;
    this.titleDetalle = "Requisitos del Ley";

    this.ruta.getGradosDetalleRequerimiento({ especialidad_id: dato.especialidad_id, grado_id: dato.grado_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.detalle = response.result.map((x: any) => x.detalle).join('<br />');
        $('#text').html(this.detalle);
      }
    });
  }

  openDetalleGrado(dato: any) {
    this.detalleModal = true;
    this.titleDetalle = "Detalle Grado";

    this.ruta.getGradosDetalleCargo({ ruta_carrera_id: dato.ruta_carrera_id, grado_id: dato.grado_id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.detalle = response.result.map((x: any) => x.detalle).join('<br />');
        $('#text').html(this.detalle);
      }
    });
  }
  

  closeDetalleModal(bol: any) {
    this.detalleModal = bol;
  }

  addLinea() {
    this.varlinea.push({linea_cargo_id: 0,ruta_carrera_id: 0,cargo_ruta_id: 0,tipo_ruta_id: 0,tipo_cargo_id: 0,activo: true,usuario_creador: this.currentUser.usuario,usuario_modificador: this.currentUser.usuario, NuevoRegistro: true});
  }

  deleteLinea(id: any) {
    this.varlinea.splice(id, 1);
  }

  addRuta() {
    this.varruta.push({ruta_id:0,ruta_carrera_id:0,cargo_id:0,cargo_prev_id:0,tipo_cargo_id:0,grado_id:0,activo:true,usuario_creador: this.currentUser.usuario,usuario_modificador: this.currentUser.usuario, NuevoRegistro: true})
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

    if (this.model.varRutaCarrera.cuerpo_id == 0)
      this.model.varRutaCarrera.cuerpo_id = null;

    if (this.model.varRutaCarrera.especialidad_id == 0)
      this.model.varRutaCarrera.especialidad_id = null;

    if (this.model.varRutaCarrera.area_id == 0)
      this.model.varRutaCarrera.area_id = null;

    if (this.model.varRutaCarrera.tipo_categoria_id == 0)
      this.model.varRutaCarrera.tipo_categoria_id = null;

    if (this.model.varRutaCarrera.tipo_ruta_id == 0)
      this.model.varRutaCarrera.tipo_ruta_id = null;

    console.log(this.model.varRutaCarrera);

    this.ruta.createRutaCarrera(this.model.varRutaCarrera).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        console.log(response.id);
        if (this.varruta.length > 0) {
          this.varruta.forEach((element: any) => {
            element.ruta_carrera_id = response.id;
            element.cargo_id = Number(element.cargo_id);
            element.cargo_prev_id = Number(element.cargo_prev_id);
            element.tipo_cargo_id = Number(element.tipo_cargo_id);
            element.grado_id = Number(element.grado_id);

            if (element.grado_id == 0) element.grado_id = null;

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

  updateRuta() {
    this.model.varRutaCarrera.cuerpo_id = Number(this.model.varRutaCarrera.cuerpo_id);
    this.model.varRutaCarrera.especialidad_id = Number(this.model.varRutaCarrera.especialidad_id);
    this.model.varRutaCarrera.area_id = Number(this.model.varRutaCarrera.area_id);
    this.model.varRutaCarrera.tipo_categoria_id = Number(this.model.varRutaCarrera.tipo_categoria_id);
    this.model.varRutaCarrera.tipo_ruta_id = Number(this.model.varRutaCarrera.tipo_ruta_id);

    console.log(this.model.varRutaCarrera);

    this.ruta.updateRutaCarrera(this.model.varRutaCarrera).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.varruta.length > 0) {
          this.varruta.forEach((element: any) => {
            element.ruta_carrera_id = this.model.varRutaCarrera.ruta_carrera_id;
            element.cargo_id = Number(element.cargo_id);
            element.cargo_prev_id = Number(element.cargo_prev_id);
            element.tipo_cargo_id = Number(element.tipo_cargo_id);
            element.grado_id = Number(element.grado_id);

            if (element.grado_id == 0) element.grado_id = null;

            if (element.NuevoRegistro == true) {
              this.ruta.createRutas(element).subscribe(data1 => {});
            }
            else {
              this.ruta.updateRutas(element).subscribe(data1 => {});
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

  dataform(indexform: any, data: any) {
    this.selectModal = false;

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
      console.log(data);
    }
  }
}
