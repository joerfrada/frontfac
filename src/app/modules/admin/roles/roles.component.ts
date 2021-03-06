import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RolService } from '../../../services/modules/rol.service';

declare var swal:any;

export class Model {
  title = "";
  tipo = 'C';

  varRol: any = {
    rol_id: 0,
    rol: "",
    descripcion: "",
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  }

  varRolPrivilegio: any = {
    rol_privilegio_id: 0,
    rol_id: 0,
    num_pantalla: 0,
    nombre_pantalla: "",
    consultar: false,
    crear: false,
    actualizar: false,
    eliminar: false,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  }
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  model = new Model();

  modal: any;
  rolPrivilegioModal: any;
  editrolPrivilegioModal: any;
  selectModal: any;

  varhistorial: any = [];
  varhistorialTemp: any = [];
  varprivilegio: any = [];
  varprivilegioTemp: any = [];
  varmodulo: any = [];

  array: any = [];

  indexform: any;
  index: any;

  rol_id: any;

  currentUser: any;

  constructor(private router: Router,
              private api: ApiService,
              private rol: RolService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varRol.usuario_creador = this.currentUser.usuario;
    this.model.varRol.usuario_modificador = this.currentUser.usuario;
    this.model.varRolPrivilegio.usuario_creador = this.currentUser.usuario;
    this.model.varRolPrivilegio.usuario_modificador = this.currentUser.usuario;
  }

  ngOnInit(): void {
    this.getRoles();
    this.getModulos();
  }

  reload() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
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
        if (item.rol.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  searchPrivilegio(e: any) {
    let filtro: string = e.target.value.trim().toLowerCase();
    if (filtro.length == 0) {
      this.varprivilegio = this.varprivilegioTemp;
    }
    else {
      this.varprivilegio = this.varprivilegioTemp.filter((item: any) => {
        if (item.nombre_pantalla.toString().toLowerCase().indexOf(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  getRoles() {
    let json: any = {
      filtro: 0
    }

    this.rol.getRoles(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varhistorial = response.result;
        this.varhistorialTemp = response.result;
      }
    });
  }

  getModulos() {
    this.rol.getModulos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.descripcion = x.modulo;
          x.sigla = x.pantalla;
        });
        this.varmodulo = response.result;
      }
    });
  }

  openModal() {
    this.modal = true;
    this.model.title = 'Crear Rol';
    this.model.tipo = 'C';
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  editRoles(data: any) {
    this.modal = true;
    this.model.title = 'Actualizar Rol';
    this.model.tipo = 'U';

    this.model.varRol.rol_id = data.rol_id;
    this.model.varRol.rol = data.rol;
    this.model.varRol.descripcion = data.descripcion;
    this.model.varRol.activo = (data.activo == 'S') ? true : false;
  }

  saveRoles() {
    this.rol.createRoles(this.model.varRol).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Roles',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.reload();
        })
      }
    });
  }

  updateRoles() {
    this.rol.updateRoles(this.model.varRol).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Roles',
          text: response.mensaje,
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.modal = false;
          this.openRolPrivilegiosById(this.model.varRol.rol_id);
          this.reload();
        })
      }
    });
  }

  openRolPrivilegiosById(id: any) {
    this.rol.getRolPrivilegiosById({ rol_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.consultar = (x.consultar == 'S') ? true : false;
          x.crear = (x.crear == 'S') ? true : false;
          x.actualizar = (x.actualizar == 'S') ? true : false;
          x.eliminar = (x.eliminar == 'S') ? true : false;
          x.activo = (x.activo == 'S') ? true : false;
        });
        this.varprivilegio = response.result;
        this.varprivilegioTemp = response.result;
      }
    });
  }

  openRolPrivilegios(dato: any) {
    this.rolPrivilegioModal = true;
    this.model.title = "Roles Privilegios - " + dato.rol;

    this.rol_id = dato.rol_id;

    this.model.varRolPrivilegio.rol_id = dato.rol_id;

    this.openRolPrivilegiosById(dato.rol_id);
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveModulo(index: number) {
    this.array = this.varmodulo;
    this.indexform = 'modulo';
    this.index = index;
    this.selectModal = true;
  }

  addPrivilegio() {
    this.varprivilegio.push({rol_privilegio_id:0,rol_id:0,num_pantalla:0,modulo:"",nombre_pantalla:"",consultar:false,crear:false,actualizar:false,eliminar:false,activo:true,usuario_creador:this.currentUser.usuario,usuario_modificador:this.currentUser.usuario,NuevoRegistro:true});
  }

  deletePrivilegio(index: any) {
    this.varprivilegio.splice(index, 1);
  }

  closeRolPrivilegioModal(bol: any) {
    this.rolPrivilegioModal = bol;
  }

  // crearRolPrivilegioModal() {
  //   this.editrolPrivilegioModal = true;
  //   this.model.title = 'Crear Rol Privilegio';
  //   this.model.tipo = 'C';
  // }

  // editRolPrivilegios(dato: any) {
  //   this.editrolPrivilegioModal = true;
  //   this.model.title = 'Actualizar Rol Privilegio - ' + dato.nombre_pantalla;
  //   this.model.tipo = 'U';

  //   this.model.varRolPrivilegio.rol_privilegio_id = dato.rol_privilegio_id;
  //   this.model.varRolPrivilegio.rol_id = dato.rol_id;
  //   this.model.varRolPrivilegio.num_pantalla = dato.num_pantalla;
  //   this.model.varRolPrivilegio.nombre_pantalla = dato.nombre_pantalla;
  //   this.model.varRolPrivilegio.consultar = (dato.consultar == 'S') ? true : false;
  //   this.model.varRolPrivilegio.crear = (dato.crear == 'S') ? true : false; 
  //   this.model.varRolPrivilegio.actualizar = (dato.actualizar == 'S') ? true : false; 
  //   this.model.varRolPrivilegio.eliminar = (dato.eliminar == 'S') ? true : false; 
  //   this.model.varRolPrivilegio.activo = (dato.activo == 'S') ? true : false; 
  // }

  // closeEditRolPrivilegioModal(bol: any) {
  //   this.editrolPrivilegioModal = bol;
  // }

  // savePrivilegios() {
  //   this.rol.createRolPrivilegios(this.model.varRolPrivilegio).subscribe(data => {
  //     let response: any = this.api.ProcesarRespuesta(data);
  //     if (response.tipo == 0) {
  //       swal({
  //         title: 'Roles Privilegios',
  //         text: response.mensaje,
  //         allowOutsideClick: false,
  //         showConfirmButton: true,
  //         type: 'success'
  //       }).then((result: any) => {
  //         this.editrolPrivilegioModal = false;
  //         this.openRolPrivilegiosById(this.rol_id);
  //       })
  //     }
  //   });
  // }

  // updatePrivilegios() {
  //   this.rol.updateRolPrivilegios(this.model.varRolPrivilegio).subscribe(data => {
  //     let response: any = this.api.ProcesarRespuesta(data);
  //     if (response.tipo == 0) {
  //       swal({
  //         title: 'Roles Privilegios',
  //         text: response.mensaje,
  //         allowOutsideClick: false,
  //         showConfirmButton: true,
  //         type: 'success'
  //       }).then((result: any) => {
  //         this.editrolPrivilegioModal = false;
  //         this.openRolPrivilegiosById(this.rol_id);
  //       })
  //     }
  //   });
  // }

  savePrivilegios() {
    if (this.varprivilegio.length > 0) {
      this.varprivilegio.forEach((x: any) => {
        x.rol_id = this.rol_id;
        if (x.NuevoRegistro == true) {
          this.rol.createRolPrivilegios(x).subscribe(data => {
            this.api.ProcesarRespuesta(data);
          });
        }
        else {
          this.rol.updateRolPrivilegios(x).subscribe(data => {
            this.api.ProcesarRespuesta(data);
          });
        }

        swal({
          title: 'Roles Privilegios',
          text: 'El rol privilegio fue guardado con ??xito.',
          allowOutsideClick: false,
          showConfirmButton: true,
          type: 'success'
        }).then((result: any) => {
          this.rolPrivilegioModal = false;
          this.openRolPrivilegiosById(this.model.varRolPrivilegio.rol_id);
          this.reload();
        });
      });
    }
  }

  dataform(indexform: any, data: any) {
    this.selectModal = false;
    if (indexform == 'modulo') {
      this.varprivilegio[this.index].num_pantalla = data.menu_id;
      this.varprivilegio[this.index].modulo = data.descripcion;
      this.varprivilegio[this.index].nombre_pantalla = data.sigla;
    }
  }
}
