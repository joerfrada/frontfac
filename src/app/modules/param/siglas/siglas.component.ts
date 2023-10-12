import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AreaService } from 'src/app/services/modules/area.service';
import { CuerpoService } from 'src/app/services/modules/cuerpo.service';
import { EspecialidadService } from 'src/app/services/modules/especialidad.service';
import { UsuarioService } from '../../../services/modules/usuario.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

  varCuerpo: any = {
    cuerpo_id: 0,
    tipo_categoria_id: 0,
    sigla: "",
    cuerpo: "",
    usuario_creador: "",
    usuario_modificador: ""
  }

  varEspecialidad: any = {
    especialidad_id: 0,
    tipo_categoria_id: 0,
    sigla: "",
    especialidad: "",
    cuerpo_id: 0,
    usuario_creador: "",
    usuario_modificador: ""
  }

  varArea: any = {
    area_id: 0,
    tipo_categoria_id: 0,
    sigla: "",
    area: "",
    especialidad_id: 0,
    usuario_creador: "",
    usuario_modificador: ""
  }
}

@Component({
  selector: 'app-siglas',
  templateUrl: './siglas.component.html',
  styleUrls: ['./siglas.component.scss']
})
export class SiglasComponent implements OnInit {

  model = new Model();

  tab: any;

  varcuerpo: any = [];
  varcuerpoTemp: any = [];
  varespecialidad: any = [];
  varespecialidadTemp: any = [];
  vararea: any = [];
  varareaTemp: any = [];

  lstEspecialidad: any = [];
  lstEspecialidadTemp: any = [];
  lstCuerpo: any = [];
  lstCuerpoTemp: any = [];

  IsLectura: any = true;

  currentUser: any;

  cuerpoModal: any;
  especialidadModal: any;
  areaModal: any;

  loading = true;

  varcategoria: any = [];

  varPermisos: any = {
    consultar: 0,
    crear: 0,
    actualizar: 0,
    eliminar: 0
  }

  constructor(private router: Router,
              private api: ApiService,
              private area: AreaService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService,
              private usuario: UsuarioService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.getPermisos(this.currentUser.usuario, 'PM');
  }

  ngOnInit(): void {
    this.tab = 1;
    this.filtro();
    this.getListas();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

  filtro() {
    let json: any = {
      filtro: 0
    }

    this.area.getAreas(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.vararea =  response.result;
        this.varareaTemp = response.result;
      }
    });

    this.cuerpo.getCuerpos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      if (response.tipo == 0) {
        this.varcuerpo = response.result;
        this.varcuerpoTemp = response.result;
      }
    });

    this.especialidad.getEspecialidades(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varespecialidad = response.result;
        this.varespecialidadTemp = response.result;
      }
    });

    this.cuerpo.getCuerposFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstCuerpo = response.result;
        this.lstCuerpoTemp = response.result;
      }
    });

    this.especialidad.getEspecialidadesFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstEspecialidad = response.result;
        this.lstEspecialidadTemp = response.result;
      }
    });
  }

  searchCuerpo(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varcuerpo = this.varcuerpoTemp;
    }
    else {
      this.varcuerpo = this.varcuerpoTemp.filter((item: any) => {
        if (item.sigla.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.cuerpo.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  searchEspecialidad(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varespecialidad = this.varespecialidadTemp;
    }
    else {
      this.varespecialidad = this.varespecialidadTemp.filter((item: any) => {
        if (item.sigla.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.especialidad.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  searchArea(e: any) {
    let filtro = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.vararea = this.varareaTemp;
    }
    else {
      this.vararea = this.varareaTemp.filter((item: any) => {
        if (item.sigla.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.area.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  getListas() {
    let varlistas = JSON.parse(localStorage.getItem("listasDinamicasFull") as any);
    this.varcategoria = varlistas.filter((x: any) => x.nombre_lista == 'BAS_TIPO_CATEGORIA');
    this.varcategoria.forEach((x: any) => {
      x.id = x.lista_dinamica_id;
      x.detalle = x.lista_dinamica;
    });
  }

  openModal(tipo = 1) {
    this.model = new Model();
    this.model.tipo = 'C';
    this.IsLectura = false;

    if (tipo == 1) {
      this.cuerpoModal = true;
      this.model.title = "Crear Cuerpo"; 
    }
    else if (tipo == 2) {
      this.especialidadModal = true;
      this.model.title = "Crear Especialidad";
    }
    else if (tipo == 3) {
      this.areaModal = true;
      this.model.title = "Crear Área de Conocimiento";
    }
  }

  closeModal(bol: any, tipo = 1) {
    if (tipo == 1) this.cuerpoModal = bol;
    else if (tipo == 2) this.especialidadModal = bol;
    else if (tipo == 3) this.areaModal = bol;
  }

  editModal(data: any, tipo = 1) {
    this.model.tipo = 'U';
    this.IsLectura = false;

    if (tipo == 1) {
      this.cuerpoModal = true;
      this.model.title = "Actualizar Cuerpo";

      this.model.varCuerpo.cuerpo_id = data.cuerpo_id;
      this.model.varCuerpo.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varCuerpo.sigla = data.sigla;
      this.model.varCuerpo.cuerpo = data.cuerpo;
    }
    else if (tipo == 2) {
      this.especialidadModal = true;
      this.model.title = "Actualizar Especialidad";

      this.model.varEspecialidad.especialidad_id = data.especialidad_id;
      this.model.varEspecialidad.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varEspecialidad.sigla = data.sigla;
      this.model.varEspecialidad.especialidad = data.especialidad;
      this.model.varEspecialidad.cuerpo_id = data.cuerpo_id;

      this.changeCategoriaEspecialidad(data.tipo_categoria_id);
    }
    else if (tipo == 3) {
      this.areaModal = true;
      this.model.title = "Actualizar Área de Conocimiento";

      this.model.varArea.area_id = data.area_id;
      this.model.varArea.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varArea.sigla = data.sigla;
      this.model.varArea.area = data.area;
      this.model.varArea.especialidad_id = data.especialidad_id;

      this.changeCategoriaArea(data.tipo_categoria_id);
    }
  }

  saveData(tipo = 1) {
    if (tipo == 1) {
      this.model.varCuerpo.tipo_categoria_id = Number(this.model.varCuerpo.tipo_categoria_id);
      this.model.varCuerpo.usuario_creador = this.currentUser.usuario;
      this.model.varCuerpo.usuario_modificador = this.currentUser.usuario;

      this.cuerpo.createCuerpos(this.model.varCuerpo).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Cuerpos',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.cuerpoModal = false;
            this.reload();
          })
        }
      });
    }
    else if (tipo == 2) {
      this.model.varEspecialidad.tipo_categoria_id = Number(this.model.varEspecialidad.tipo_categoria_id);
      this.model.varEspecialidad.cuerpo_id = Number(this.model.varEspecialidad.cuerpo_id);
      this.model.varEspecialidad.usuario_creador = this.currentUser.usuario;
      this.model.varEspecialidad.usuario_modificador = this.currentUser.usuario;

      this.especialidad.createEspecialidades(this.model.varEspecialidad).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Especialidades',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.especialidadModal = false;
            this.reload();
          })
        }
      });
    }
    else if (tipo == 3) {
      this.model.varArea.tipo_categoria_id = Number(this.model.varArea.tipo_categoria_id);
      this.model.varArea.especialidad_id = Number(this.model.varArea.especialidad_id);
      this.model.varArea.usuario_creador = this.currentUser.usuario;
      this.model.varArea.usuario_modificador = this.currentUser.usuario;

      this.area.createAreas(this.model.varArea).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Área de Conocimiento',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.especialidadModal = false;
            this.reload();
          })
        }
      });
    }
  }

  updateData(tipo = 1) {
    if (tipo == 1) {
      this.model.varCuerpo.tipo_categoria_id = Number(this.model.varCuerpo.tipo_categoria_id);
      this.model.varCuerpo.usuario_creador = this.currentUser.usuario;
      this.model.varCuerpo.usuario_modificador = this.currentUser.usuario;

      this.cuerpo.updateCuerpos(this.model.varCuerpo).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Cuerpos',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.cuerpoModal = false;
            this.reload();
            this.tab = 1;
          })
        }
      });
    }
    else if (tipo == 2) {
      this.model.varEspecialidad.tipo_categoria_id = Number(this.model.varEspecialidad.tipo_categoria_id);
      this.model.varEspecialidad.cuerpo_id = Number(this.model.varEspecialidad.cuerpo_id);
      this.model.varEspecialidad.usuario_creador = this.currentUser.usuario;
      this.model.varEspecialidad.usuario_modificador = this.currentUser.usuario;

      this.especialidad.updateEspecialidades(this.model.varEspecialidad).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Especialidades',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.especialidadModal = false;
            this.reload();
            this.tab = 2;
          })
        }
      });
    }
    else if (tipo == 3) {
      this.model.varArea.tipo_categoria_id = Number(this.model.varArea.tipo_categoria_id);
      this.model.varArea.especialidad_id = Number(this.model.varArea.especialidad_id);
      this.model.varArea.usuario_creador = this.currentUser.usuario;
      this.model.varArea.usuario_modificador = this.currentUser.usuario;

      this.area.updateAreas(this.model.varArea).subscribe(data => {
        let response: any = this.api.ProcesarRespuesta(data);
        if (response.tipo == 0) {
          swal({
            title: 'Área de Conocimiento',
            text: response.mensaje,
            allowOutsideClick: false,
            showConfirmButton: true,
            type: 'success'
          }).then((result: any) => {
            this.areaModal = false;
            this.reload();
            this.tab = 3;
          })
        }
      });
    }
  }

  changeCategoriaEspecialidad(id: any) {
    setTimeout(() => {
      this.lstCuerpo = this.lstCuerpoTemp.filter((x: any) => x.tipo_categoria_id == id);
    }, 100);
  }

  changeCategoriaArea(id: any) {
    setTimeout(() => {
      this.lstEspecialidad = this.lstEspecialidadTemp.filter((x: any) => x.tipo_categoria_id == id);
    }, 100);
  }

  openDetalle(data: any, tipo = 1) {
    this.IsLectura = true;
    this.model.tipo = 'L';

    if (tipo == 1) {
      this.cuerpoModal = true;
      this.model.title = "Detalle Cuerpo";

      this.model.varCuerpo.cuerpo_id = data.cuerpo_id;
      this.model.varCuerpo.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varCuerpo.sigla = data.sigla;
      this.model.varCuerpo.cuerpo = data.cuerpo;
    }
    else if (tipo == 2) {
      this.especialidadModal = true;
      this.model.title = "Detalle Especialidad";

      this.model.varEspecialidad.especialidad_id = data.especialidad_id;
      this.model.varEspecialidad.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varEspecialidad.sigla = data.sigla;
      this.model.varEspecialidad.especialidad = data.especialidad;
      this.model.varEspecialidad.cuerpo_id = data.cuerpo_id;

      this.changeCategoriaEspecialidad(data.tipo_categoria_id);
    }
    else if (tipo == 3) {
      this.areaModal = true;
      this.model.title = "Detalle Área de Conocimiento";

      this.model.varArea.area_id = data.area_id;
      this.model.varArea.tipo_categoria_id = data.tipo_categoria_id;
      this.model.varArea.sigla = data.sigla;
      this.model.varArea.area = data.area;
      this.model.varArea.especialidad_id = data.especialidad_id;

      this.changeCategoriaArea(data.tipo_categoria_id);
    }
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

  clearSearchCuerpo(e: any) {
    if (e.target.value == "") {
      this.varcuerpo = this.varcuerpoTemp;
    }
  }

  clearSearchEspecialidad(e: any) {
    if (e.target.value == "") {
      this.varespecialidad = this.varespecialidadTemp;
    }
  }

  clearSearchArea(e: any) {
    if (e.target.value == "") {
      this.vararea = this.varareaTemp;
    }
  }
}
