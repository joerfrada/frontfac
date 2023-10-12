import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { CuerpoService } from 'src/app/services/modules/cuerpo.service';
import { EspecialidadService } from 'src/app/services/modules/especialidad.service';
import { GradoService } from 'src/app/services/modules/grado.service';
import { RequisitoLeyService } from 'src/app/services/modules/requisito-ley.service';
import { UsuarioService } from '../../../services/modules/usuario.service';

declare var $:any;
declare var swal: any;

export class Model {
  title = "";
  tipo = 'C';

  varRequisito: any = {
    requisito_ley_id: 0,
    requisito_ley: "",
    descripcion: "",
    categoria_id: 0,
    cuerpo_id: 0,
    cuerpo: "",
    sigla: "",
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  }

  varRequisitoEspecialidad: any = [];
  varRequisitoGrado: any = [];

  IsLectura: any = false;
}

@Component({
  selector: 'app-requisitos',
  templateUrl: './requisitos.component.html',
  styleUrls: ['./requisitos.component.scss']
})
export class RequisitosComponent implements OnInit {

  model = new Model();

  modal: any;

  varhistorial: any = [];
  varhistorialTemp: any = [];
  varcategoria: any = [];
  varcuerpo: any = [];
  varcuerpoTemp: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  vargrado: any = [];
  vargradoTemp: any = [];
  vargradoOficial: any = [];
  vargradoSubOficial: any = [];

  titleModal = "";
  selectModal: any;
  especialidadModal: any;
  gradoModal: any;
  array: any = [];
  inputform: any;
  loading = true;

  currentUser: any;

  IsEditar: any;

  varPermisos: any = {
    consultar: 0,
    crear: 0,
    actualizar: 0,
    eliminar: 0
  }

  constructor(private router: Router,
    private api: ApiService,
    private requisito: RequisitoLeyService,
    private cuerpo: CuerpoService,
    private especialidad: EspecialidadService,
    private grado: GradoService,
    private usuario: UsuarioService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.model.varRequisito.usuario_creador = this.currentUser.usuario;
    this.model.varRequisito.usuario_modificador = this.currentUser.usuario;
    this.getPermisos(this.currentUser.usuario, 'PM');
  }

  ngOnInit(): void {
    this.getRequisitosLey();
    this.getListas();
    this.getCuerposFull();
    this.getEspecialidadesFull();
    this.getGradosFull();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  search(e: any) {
    let filtro: string = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varhistorial = this.varhistorialTemp;
    }
    else {
      this.varhistorial = this.varhistorialTemp.filter((item: any) => {
        if (item.requisito_ley.toString().toLowerCase().indexOf(filtro) !== -1 ||
          item.categoria.toString().toLowerCase().indexOf(filtro) !== -1 ||
          item.cuerpoDescripcion.toString().toLowerCase().indexOf(filtro) !== -1) {
          return true;
        }
        return false;
      });
    }
  }

  getRequisitosLey() {
    let json: any = {
      filtro: 0
    }

    this.requisito.getRequisitosLey(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
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
          this.varespecialidadTemp.push({ requisito_especialidad_id: 0, requisito_ley_id: 0, categoria_id: x.tipo_categoria_id, cuerpo_id: x.cuerpo_id, especialidad_id: x.especialidad_id, descripcion: x.especialidad, sigla: x.sigla, checked: false, usuario_creador: "", usuario_modificador: "", NuevoRegistro: false });
        });
      }
    })
  }

  getGradosFull() {
    this.grado.getGradosFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.id = x.grado_id;
          x.descripcion = x.descripcion;
          x.sigla = x.grado;
          x.checked = false;
          this.vargradoTemp.push({ requisito_grado_id: 0, requisito_ley_id: 0, categoria_id: x.categoria_id, grado_id: x.grado_id, descripcion: x.descripcion, sigla: x.grado, checked: false, usuario_creador: "", usuario_modificador: "", NuevoRegistro: false });
        });
      }
    });
  }

  getRequisitosEspecialidades(id: any, cuerpo_id: any, show: any = false) {
    this.requisito.getRequisitosEspecialidades({ requisito_ley_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (response.result.length > 0) {
          response.result.forEach((x: any) => {
            x.id = x.requisito_especialidad_id;
            x.checked = (x.checked == 'S') ? true : false;
            x.IsLectura = false;
          });
          // let temp = this.varespecialidadTemp.filter((x: any) => x.cuerpo_id == cuerpo_id);
          this.model.varRequisitoEspecialidad = response.result;
          this.varespecialidad = response.result;
          // this.varespecialidad = temp.map((x: any) => response.result.find((c:any) => { return c.especialidad_id === x.especialidad_id }) || x);
        }
        else {
          this.varespecialidad = this.varespecialidadTemp.filter((x: any) => x.cuerpo_id == cuerpo_id);
        }

        if (show == true) {
          this.titleModal = 'Especialidades';
          this.varespecialidad.forEach((x: any) => x.IsLectura = true);
          this.array = this.varespecialidad;
          this.especialidadModal = true;
          this.model.IsLectura = true;
        }
      }
    });
  }

  getRequisitosGrados(id: any, categoria_id: any, show: any = false) {
    this.requisito.getRequisitosGrados({ requisito_ley_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        if (response.result.length > 0) {
          response.result.forEach((x: any) => {
            x.id = x.requisito_grado_id;
            x.checked = (x.checked == 'S') ? true : false;
            x.IsLectura = false;
          });
          // let temp = this.vargradoTemp.filter((x: any) => x.categoria_id == categoria_id);
          this.model.varRequisitoGrado = response.result;
          this.vargrado = response.result;
          // this.vargrado = temp.map((x: any) => response.result.find((c:any) => { return c.grado_id === x.grado_id }) || x);
        }
        else {
          this.vargrado = this.vargradoTemp.filter((x: any) => x.categoria_id == categoria_id);
        }
        if (show == true) {
          this.titleModal = 'Grados';
          this.vargrado.forEach((x: any) => x.IsLectura = true);
          this.array = this.vargrado;
          this.gradoModal = true;
          this.model.IsLectura = true;
        }
      }
    });
  }

  clearRequisitos() {
    this.model.varRequisito = {
      requisito_ley_id: 0,
      requisito_ley: "",
      categoria_id: 0,
      cuerpo_id: 0,
      cuerpo: "",
      activo: true,
      usuario_creador: this.currentUser.usuario,
      usuario_modificador: this.currentUser.usuario
    }
    this.varespecialidad = [];
    this.varespecialidadTemp = [];
    this.vargrado = [];
    this.vargradoTemp = [];
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Requisito del Ley";
    this.model.tipo = 'C';
    this.model.IsLectura = false;
    this.IsEditar = false;
  }

  closeModal(bol: any) {
    this.modal = bol;
    this.reload();
  }

  closeEspecialidadModal(bol: any) {
    this.especialidadModal = bol;
  }

  closeGradoModal(bol: any) {
    this.gradoModal = bol;
  }

  editRequisito(data: any) {
    this.modal = true;
    this.model.title = "Actualizar Requisito del Ley";
    this.model.tipo = 'U';
    this.model.IsLectura = false;
    this.IsEditar = true;

    this.model.varRequisito.requisito_ley_id = data.requisito_ley_id;
    this.model.varRequisito.requisito_ley = data.requisito_ley.replace(/<br\s?\/?>/g, '\r\n');
    this.model.varRequisito.descripcion = data.descripcion.replace(/<br\s?\/?>/g, '\r\n');
    this.model.varRequisito.categoria_id = data.categoria_id;
    this.model.varRequisito.cuerpo_id = data.cuerpo_id;
    this.model.varRequisito.activo = (data.activo == 'S') ? true : false;

    this.model.varRequisito.usuario_creador = this.currentUser.usuario;
    this.model.varRequisito.usuario_modificador = this.currentUser.usuario;

    this.changeCategoria(data.categoria_id);

    this.model.varRequisito.cuerpo = data.cuerpo;

    this.getRequisitosEspecialidades(data.requisito_ley_id, data.cuerpo_id);
    this.getRequisitosGrados(data.requisito_ley_id, data.categoria_id);
  }

  openDetalle(data: any) {
    this.modal = true;
    this.model.title = "Detalle Requisito del Ley";
    this.model.tipo = 'L';
    this.model.IsLectura = true;
    this.IsEditar = false;

    this.model.varRequisito.requisito_ley_id = data.requisito_ley_id;
    this.model.varRequisito.requisito_ley = data.requisito_ley.replace(/<br\s?\/?>/g, '\r\n');
    this.model.varRequisito.descripcion = data.descripcion.replace(/<br\s?\/?>/g, '\r\n');
    this.model.varRequisito.categoria_id = data.categoria_id;
    this.model.varRequisito.cuerpo_id = data.cuerpo_id;
    this.model.varRequisito.activo = (data.activo == 'S') ? true : false;

    this.model.varRequisito.usuario_creador = this.currentUser.usuario;
    this.model.varRequisito.usuario_modificador = this.currentUser.usuario;

    this.changeCategoria(data.categoria_id);

    this.model.varRequisito.cuerpo = data.cuerpo;

    this.getRequisitosEspecialidades(data.requisito_ley_id, data.cuerpo_id);
    this.getRequisitosGrados(data.requisito_ley_id, data.categoria_id);
  }

  changeCategoria(id: any) {
    this.varcuerpo = this.varcuerpoTemp.filter((x: any) => x.tipo_categoria_id == id);
    this.varespecialidad = this.varespecialidadTemp.filter((x: any) => x.tipo_categoria_id == id);
    this.vargrado = this.vargradoTemp.filter((x: any) => x.categoria_id == id);
    this.model.varRequisito.cuerpo = "";
  }

  saveRequisito() {
    this.model.varRequisito.categoria_id = Number(this.model.varRequisito.categoria_id);

    this.requisito.createRequisitosLey(this.model.varRequisito).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.createRequisitoEspGrad(this.model.varRequisitoEspecialidad, this.model.varRequisitoGrado, response.id);

        swal({
          title: 'Requisitos de Ley',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.clearRequisitos();
          this.reload();
        })
      }
    });
  }

  updateRequisito() {
    this.model.varRequisito.categoria_id = Number(this.model.varRequisito.categoria_id);
    this.model.varRequisito.cuerpo_id = this.model.varRequisito.cuerpo_id;

    this.requisito.updateRequisitosLey(this.model.varRequisito).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.updateRequisitoEspGrad(this.model.varRequisitoEspecialidad, this.model.varRequisitoGrado);

        swal({
          title: 'Requisitos de Ley',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.clearRequisitos();
          this.reload();
        })
      }
    });
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveCuerpo() {
    this.titleModal = 'Cuerpos';
    this.array = this.varcuerpo;
    this.inputform = 'cuerpo';
    this.selectModal = true;
  }

  saveEspecialidad() {
    this.titleModal = 'Especialidades';
    this.array = this.varespecialidad;
    this.especialidadModal = true;
  }

  saveGrado() {
    this.titleModal = 'Grados';
    this.array = this.vargrado;
    this.gradoModal = true;
  }

  dataform(inputform: any, data: any) {
    this.selectModal = false;

    if (inputform == 'cuerpo') {
      this.model.varRequisito.cuerpo_id = data.cuerpo_id;
      this.model.varRequisito.cuerpo = data.descripcion;
      this.model.varRequisito.sigla = data.sigla;

      this.varespecialidad = this.varespecialidadTemp.filter((x: any) => x.cuerpo_id == data.cuerpo_id);
    }
  }

  dataSelectEspecialidad(data: any) {
    this.especialidadModal = false;
    this.model.varRequisitoEspecialidad = data;
  }

  dataSelectGrado(data: any) {
    this.gradoModal = false;
    this.model.varRequisitoGrado = data;
  }

  createRequisitoEspGrad(requestEspecialidad: any, requestGrado: any, id: any) {
    if (requestEspecialidad.length > 0) {
      requestEspecialidad.forEach((x: any) => {
        x.requisito_ley_id = id;
        x.usuario_creador = this.model.varRequisito.usuario_creador;
        x.usuario_modificador = this.model.varRequisito.usuario_modificador;
        x.NuevoRegistro = (x.requisito_especialidad_id == 0) ? true : false;

        if (x.NuevoRegistro == true) {
          this.requisito.createRequisitosEspecialidades(x).subscribe(data => { });
        }
      });
    }
    
    if (requestGrado.length > 0) {
      requestGrado.forEach((x: any) => {
        x.requisito_ley_id = id;
        x.usuario_creador = this.model.varRequisito.usuario_creador;
        x.usuario_modificador = this.model.varRequisito.usuario_modificador;
        x.NuevoRegistro = (x.requisito_grado_id == 0) ? true : false;

        if (x.NuevoRegistro == true) {
          this.requisito.createRequisitosGrados(x).subscribe(data => { });
        }
      });
    }
  }

  updateRequisitoEspGrad(requestEspecialidad: any, requestGrado: any) {
    if (requestEspecialidad.length > 0) {
      requestEspecialidad.forEach((x: any) => {
        x.requisito_ley_id = this.model.varRequisito.requisito_ley_id;
        x.usuario_creador = this.model.varRequisito.usuario_creador;
        x.usuario_modificador = this.model.varRequisito.usuario_modificador;
        x.NuevoRegistro = (x.requisito_especialidad_id == 0) ? true : false;

        if (x.NuevoRegistro == true) {
          this.requisito.createRequisitosEspecialidades(x).subscribe(data => { });
        }
        else {
          this.requisito.updateRequisitosEspecialidades(x).subscribe(data => { });
        }
      });
    }

    if (requestGrado.length > 0) {
      requestGrado.forEach((x: any) => {
        x.requisito_ley_id = this.model.varRequisito.requisito_ley_id;
        x.usuario_creador = this.model.varRequisito.usuario_creador;
        x.usuario_modificador = this.model.varRequisito.usuario_modificador;
        x.NuevoRegistro = (x.requisito_grado_id == 0) ? true : false;

        if (x.NuevoRegistro == true) {
          this.requisito.createRequisitosGrados(x).subscribe(data => { });
        }
        else {
          this.requisito.updateRequisitosGrados(x).subscribe(data => { });
        }
      });
    }
  }

  openRequisito(texto: any) {
    swal({
      title: 'Requisito de Ley',
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

  getPermisos(user: any, cod_modulo: any) {
    this.usuario.getPermisosByUser({usuario: user, cod_modulo: cod_modulo}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varPermisos.consultar = response.result.consultar;
        this.varPermisos.crear = response.result.crear;
        this.varPermisos.actualizar = response.result.actualizar;
        this.varPermisos.eliminar = response.result.eliminar;
      }
    })
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
    }
  }
}
