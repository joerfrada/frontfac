import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RutaCarreraService } from '../../../services/modules/ruta-carrera.service';
import { CuerpoService } from '../../../services/modules/cuerpo.service';
import { EspecialidadService } from '../../../services/modules/especialidad.service';

declare var $:any;
declare var swal:any;

export class Model {
  title = "";
  tipo = "";

  varRuta: any = {
    ruta_carrera_id: 0,
    cuerpo_id: 0,
    especialidad_id: 0,
    descripcion: "",
    tipo_categoria_id: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
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

  varhistorial: any = [];
  varhistorialTemp: any = [];

  varlinea: any = [];

  varcategoria: any = [];
  varcuerpo: any = [];
  varcuerpoTemp: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  varcargoruta: any = [];
  vartiporuta: any = [];
  vartipocargo: any = [];

  lstEspecialidad: any = [];

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
    'children': [
      { 
        'id': '2',
        'name': 'Cargo (Cargo 2)',
        'parent_id': '1',
        'children': [
          { 
            'name': 'Cargo (Cargo 3)',
            'parent_id': '2'
          },
          { 
            'name': 'Cargo (Cargo 4)',
            'parent_id': '2'
          }
        ]
      },
      { 
        'id': '3',
        'name': 'Cargo (Cargo 5)',
        'parent_id': '1'
      },
      { 
        'id': '4',
        'name': 'Cargo (Cargo 6)',
        'children': [
          { 
            'name': 'Cargo (Cargo 7)',
            'parent_id': '4'
          },
          { 
            'name': 'Cargo (Cargo 8)',
            'parent_id': '4'
          }
        ]
      }
    ]
  };

  varPiramide = [
    {
      id: 1,
      grado: 'Grado XXX',
      duracion: 'Duración 3 años',
      requisitos: {
        id: 23,
        detalle: "Secrevit fontes liquidim locoque pronaque?\n\n<strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesitting industry."
      },
      detalleGrado: {
        id: 12,
        grado: "Secrevit fontes liquidim locoque pronaque?\n\n/><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesitting industry."
      }
    },
    {
      id: 2,
      grado: 'Grado XXX',
      duracion: 'Duración 16 años',
      requisitos: {
        id: 1,
        detalle: "Secrevit fontes liquidim locoque pronaque?\n\n/><strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesitting industry."
      },
      detalleGrado: {
        id: 23,
        grado: "Secrevit fontes liquidim locoque pronaque?\n\nLorem Ipsum is simply dummy text of the printing and typesitting industry."
      }
    },
    {
      id: 3,
      grado: 'Grado XXX',
      duracion: 'Duración 8 años',
      requisitos: {
        id: 12,
        detalle: "Secrevit fontes liquidim locoque pronaque?\n\nLorem Ipsum is simply dummy text of the printing and typesitting industry."
      },
      detalleGrado: {
        id: 102,
        grado: "Secrevit fontes liquidim locoque pronaque?\n\nLorem Ipsum is simply dummy text of the printing and typesitting industry."
      }
    },
    {
      id: 4,
      grado: 'Grado XXX',
      duracion: 'Duración 23 años',
      requisitos: {
        id: 35,
        detalle: "Secrevit fontes liquidim locoque pronaque?\n\nLorem Ipsum is simply dummy text of the printing and typesitting industry."
      },
      detalleGrado: {
        id: 48,
        grado: "Secrevit fontes liquidim locoque pronaque?\n\nLorem Ipsum is simply dummy text of the printing and typesitting industry."
      }
    },
    {
      id: 5,
      grado: 'Grado XXX',
      duracion: 'Duración 4 años',
      requisitos: {
        id: 82,
        detalle: "Secrevit fontes liquidim locoque pronaque?\n\nLorem Ipsum is simply dummy text of the printing and typesitting industry."
      },
      detalleGrado: {
        id: 96,
        grado: "Secrevit fontes liquidim locoque pronaque?\n\nLorem Ipsum is simply dummy text of the printing and typesitting industry."
      }
    }
  ];

  datos = "Cuerpos:\nXXXXXXXX\nXXXXX\nXXXXXXXX\nXXX\n\nEspecialidades:\nXXXXXXXX\nXXXXX\nXXXXXXXX\nXXX\n\nÁreas de Conocimientos:\nXXXXXXXX\nXXXXX\nXXXXXXXX\nXXX\n";
  tituloCargo = "";
  detalle = "";
  titleDetalle = "";

  currentUser: any;

  constructor(private router: Router,
              private api: ApiService,
              private ruta: RutaCarreraService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varRuta.usuario_creador = this.currentUser.usuario;
    this.model.varRuta.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getRutaCarrera();
    this.getCuerposFull();
    this.getEspecialidadesFull();
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
        this.varcuerpo = response.result;
        this.varcuerpoTemp = response.result;
      }
    });
  }

  getEspecialidadesFull() {
    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varespecialidad = response.result;
        this.varespecialidadTemp = response.result;
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
    this.varlinea = [];

    this.model.varRuta.usuario_creador = this.currentUser.usuario;
    this.model.varRuta.usuario_modificador = this.currentUser.usuario;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  editRutaCarrera(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Ruta de Carrera";
    this.model.tipo = "U";

    this.model.varRuta.ruta_carrera_id = data.ruta_carrera_id;
    this.model.varRuta.cuerpo_id = data.cuerpo_id;
    this.model.varRuta.especialidad_id = data.especialidad_id;
    this.model.varRuta.tipo_categoria_id = data.tipo_categoria_id;
    this.model.varRuta.descripcion = data.descripcion;
    this.model.varRuta.activo = (data.activo == 'S') ? true : false;

    this.model.varRuta.usuario_creador = this.currentUser.usuario;
    this.model.varRuta.usuario_modificador = this.currentUser.usuario;

    this.ruta.getLineasCargos({ruta_carrera_id: data.ruta_carrera_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.activo = (x.activo == 'S') ? true : false;
        });
        this.varlinea = response.result;
      }
    });
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
    setTimeout(() => { this.orgchartinit(); }, 300);
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
      'data' : this.datasource,
      'chartClass': 'orgchart-demo',
      'nodeTemplate': nodeTemplate,
      'createNode': function($node: any, data: any) {
        $node.on('click', function() {
          th.viewCargoModal = true;
          th.tituloCargo = data.name;
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
  }

  closePiramideModal(bol: any) {
    this.piramideModal = bol;
  }

  openDetalle(data: any, tipo = 1) {
    this.detalleModal = true;
    this.detalle = data;
    if (tipo == 1) this.titleDetalle = "Requisitos del Ley";
    else if (tipo == 2) this.titleDetalle = "Detalle Grado";
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

  changeCategoria(id: any) {
    this.varcuerpo = this.varcuerpoTemp.filter((x: any) => x.tipo_categoria_id == id);
    this.varespecialidad = this.varespecialidadTemp.filter((x: any) => x.tipo_categoria_id == id);
  }

  saveRuta() {
    this.model.varRuta.cuerpo_id = Number(this.model.varRuta.cuerpo_id);
    this.model.varRuta.especialidad_id = Number(this.model.varRuta.especialidad_id);
    this.model.varRuta.tipo_categoria_id = Number(this.model.varRuta.tipo_categoria_id);

    if (this.model.varRuta.cuerpo_id == 0)
      this.model.varRuta.cuerpo_id = null;

    if (this.model.varRuta.especialidad_id == 0)
      this.model.varRuta.especialidad_id = null;

    if (this.model.varRuta.tipo_categoria_id == 0)
      this.model.varRuta.tipo_categoria_id = null;

    this.ruta.createRutaCarrera(this.model.varRuta).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.varlinea.length > 0) {
          this.varlinea.forEach((element: any) => {
            element.ruta_carrera_id = response.id;
            element.cargo_ruta_id = Number(element.cargo_ruta_id);
            element.tipo_cargo_id = Number(element.tipo_cargo_id);
            element.tipo_ruta_id = Number(element.tipo_ruta_id);

            this.ruta.createLineasCargos(element).subscribe(data1 => {});

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
    this.model.varRuta.cuerpo_id = Number(this.model.varRuta.cuerpo_id);
    this.model.varRuta.especialidad_id = Number(this.model.varRuta.especialidad_id);
    this.model.varRuta.tipo_categoria_id = Number(this.model.varRuta.tipo_categoria_id);

    console.log(this.model.varRuta);

    this.ruta.updateRutaCarrera(this.model.varRuta).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (this.varlinea.length > 0) {
          this.varlinea.forEach((x: any) => {
            x.ruta_carrera_id = this.model.varRuta.ruta_carrera_id;
            x.cargo_ruta_id = Number(x.cargo_ruta_id);
            x.tipo_cargo_id = Number(x.tipo_cargo_id);
            x.tipo_ruta_id = Number(x.tipo_ruta_id);

            if (x.NuevoRegistro == true) {
              this.ruta.createLineasCargos(x).subscribe(data1 => {});
            }
            else {
              this.ruta.updateLineasCargos(x).subscribe(data1 => {});
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
}
