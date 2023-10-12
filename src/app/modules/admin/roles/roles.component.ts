import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { RolService } from '../../../services/modules/rol.service';
import { UsuarioService } from '../../../services/modules/usuario.service';

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
  loading = true;

  varhistorial: any = [];
  varhistorialTemp: any = [];
  varprivilegio: any = [];
  varprivilegioTemp: any = [];
  varmodulo: any = [];

  array: any = [];

  inputform: any;
  index: any;

  rol_id: any;

  currentUser: any;

  varPermisos: any = {
    consultar: 0,
    crear: 0,
    actualizar: 0,
    eliminar: 0
  }

  constructor(private router: Router,
              private api: ApiService,
              private rol: RolService,
              private usuario: UsuarioService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.model.varRol.usuario_creador = this.currentUser.usuario;
    this.model.varRol.usuario_modificador = this.currentUser.usuario;
    this.model.varRolPrivilegio.usuario_creador = this.currentUser.usuario;
    this.model.varRolPrivilegio.usuario_modificador = this.currentUser.usuario;
    this.getPermisos(this.currentUser.usuario, 'AD');
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
      setTimeout(() => {
        this.loading = false;
      }, 1000);
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
          x.EliminarRegistro = true;
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
    this.inputform = 'modulo';
    this.index = index;
    this.selectModal = true;
  }

  addPrivilegio() {
    this.varprivilegio.push({rol_privilegio_id:0,rol_id:0,num_pantalla:0,modulo:"",nombre_pantalla:"",consultar:false,crear:false,actualizar:false,eliminar:false,activo:true,usuario_creador:this.currentUser.usuario,usuario_modificador:this.currentUser.usuario,NuevoRegistro:true,EliminarRegistro:false});
  }

  deletePrivilegio(index: any) {
    this.varprivilegio.splice(index, 1);
  }

  closeRolPrivilegioModal(bol: any) {
    this.rolPrivilegioModal = bol;
  }

  eliminarRegistro(data: any, index: any) {
    swal({
      title: 'Roles Privilegios',
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
          rol_privilegio_id: data.rol_privilegio_id
        }
        this.rol.deleteRolPrivilegiosById(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.varprivilegio.splice(index, 1);
          }
        });
      }
    }));
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
          text: 'El rol privilegio fue guardado con éxito.',
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

  dataform(inputform: any, data: any) {
    this.selectModal = false;
    if (inputform == 'modulo') {
      this.varprivilegio[this.index].num_pantalla = data.menu_id;
      this.varprivilegio[this.index].modulo = data.descripcion;
      this.varprivilegio[this.index].nombre_pantalla = data.sigla;

      if (data.menu_id == null) {
        this.varprivilegio[this.index].consultar = true;
        this.varprivilegio[this.index].crear = true;
        this.varprivilegio[this.index].actualizar = true;
        this.varprivilegio[this.index].eliminar = true;
      }
    }
  }

  clearSearch(e: any) {
    if (e.target.value == "") {
      this.varhistorial = this.varhistorialTemp;
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
}
