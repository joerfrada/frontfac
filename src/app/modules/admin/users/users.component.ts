import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UsuarioService } from '../../../services/modules/usuario.service';
import { RolService } from '../../../services/modules/rol.service';
import { UsuarioMenuService } from '../../../services/modules/usuario-menu.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

  varUsuario: any = {
    usuario_id: 0,
    usuario: "",
    nombre_completo: "",
    email: "",
    // nombres: "",
    // apellidos: "",
    // num_identificacion: 0,
    activo: true,
    usuario_creador: "",
    usuario_modificador: ""
  };

  varRol: any = [];
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  model = new Model();

  varhistorial: any = [];
  varhistorialTemp: any = [];

  lstRoles: any = [];

  modal: any;
  rolModal: any;
  menuModal: any;
  selectModal: any;
  loading = true;

  usuario_id: any;
  usuario_menu_id: any;
  index: any;
  inputform: any;

  array: any = [];
  varprivilegio: any = [];

  currentUser: any;

  varPermisos: any = {
    consultar: 0,
    crear: 0,
    actualizar: 0,
    eliminar: 0
  }

  constructor(private router: Router, private api: ApiService, private usuario: UsuarioService, private rol: RolService, private usuarioMenu: UsuarioMenuService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.model.varUsuario.usuario_creador = this.currentUser.usuario;
    this.model.varUsuario.usuario_modificador = this.currentUser.usuario;
    this.getPermisos(this.currentUser.usuario, 'AD');
  }

  ngOnInit(): void {
    this.getUsuarios();
    this.getRolPrivilegios();
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
        if (item.usuario.toString().toLowerCase().indexOf(filtro) !== -1 ||
            item.nombre_completo.toString().toLowerCase().index(filtro) !== -1) {
            return true;
        }
        return false;
      });
    }
  }

  clearUsuario() {
    this.model.varUsuario = {
      usuario_id: 0,
      usuario: "",
      email: "",
      // nombres: "",
      // apellidos: "",
      // num_identificacion: 0,
      activo: true,
      usuario_creador: this.currentUser.usuario,
      usuario_modificador: this.currentUser.usuario
    };
  }

  openModal() {
    this.modal = true;
    this.model.title = "Crear Usuario";
    this.model.tipo = 'C';

    this.clearUsuario();
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  getUsuarios() {
    let json = {
      filtro: 0
    }

    this.usuario.getUsuarios(json).subscribe(data => {
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

  getRoles() {
    this.rol.getRolesActivos().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstRoles = response.result;
      }
    });
  }

  getRolPrivilegios() {
    this.usuario.getRolPrivilegiosPantalla().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        // response.result.forEach((x: any) => {
        //   x.sigla1 = x.rol;
        //   x.sigla2 = x.modulo;
        //   x.sigla3 = x.nombre_pantalla;
        // });
        this.varprivilegio = response.result;
      }
    });
  }

  editUsuario(dato: any) {
    this.modal = true;
    this.model.title = "Actualizar Usuario";
    this.model.tipo = 'U';

    this.model.varUsuario.usuario_id = dato.usuario_id;
    this.model.varUsuario.usuario = dato.usuario;
    this.model.varUsuario.nombre_completo = dato.nombre_completo;
    this.model.varUsuario.email = dato.email;
    // this.model.varUsuario.nombres = dato.nombres;
    // this.model.varUsuario.apellidos = dato.apellidos;
    // this.model.varUsuario.num_identificacion = dato.num_identificacion;
    this.model.varUsuario.activo = (dato.activo == 'S') ? true : false;
  }

  closeSelectModal(bol: any) {
    this.selectModal = bol;
  }

  saveUsuario() {
    this.usuario.createUsuarios(this.model.varUsuario).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Usuarios',
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

  updateUsuario() {
    this.usuario.updateUsuarios(this.model.varUsuario).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        swal({
          title: 'Usuarios',
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

  openRol(dato: any) {
    this.rolModal = true;
    this.model.title = "Asignar Rol - " + dato.usuario;

    this.usuario_id = dato.usuario_id;

    this.usuario.getUsuariosRolesById({usuario_id: dato.usuario_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
          x.EliminarRegistro = true;
        });
        this.model.varRol = response.result;
      }
    });
  }

  closeRolModal(bol: any) {
    this.rolModal = bol;
    this.reload();
  }

  changeRol(rol_id: any, index: any) {
    this.model.varRol[index].descripcion = this.lstRoles.filter((x: any) => x.rol_id == rol_id )[0].descripcion;
  }

  addRol() {
    this.model.varRol.push({usuario_rol_id: 0, usuario_id: 0, rol_id: 0, rol_privilegio_id: 0, rol: "", modulo: "", nombre_pantalla: "", menu_id: null, activo: true, usuario_creador: this.currentUser.usuario, usuario_modificador: this.currentUser.usuario, NuevoRegistro: true, EliminarRegistro: false});
  }

  deleteRol(index: any) {
    this.model.varRol.splice(index, 1);
  }

  saveRol() {
    if (this.model.varRol.length > 0) {
      this.model.varRol.forEach((element: any) => {
        element.usuario_id = this.usuario_id;
        element.usuario_creador = this.currentUser.usuario;
        element.usuario_modificador = this.currentUser.usuario;

        if (element.NuevoRegistro == true) {
          this.usuario.createUsuariosRoles(element).subscribe(data1 => {});
        }
        else {
          this.usuario.updateUsuariosRoles(element).subscribe(data1 => {});
        }
      });
      let menus_id = this.model.varRol.map((x: any) => x.menu_id).join(",");
      let json = {
        usuario_id: this.usuario_id,
        menu_id: menus_id == "" ? null : menus_id,
        usuario_creador: this.currentUser.usuario,
        usuario_modificador: this.currentUser.usuario
      }
      this.usuarioMenu.crudAsignarMenus(json).subscribe(data => {});
    }

    swal({
      title: 'Asignar Roles',
      text: 'El registro ha guardado exitoso.',
      allowOutsideClick: false,
      showConfirmButton: true,
      type: 'success'
    }).then((result: any) => {
      this.rolModal = false;
      this.reload();
    })
  }

  openViewMenu(dato: any) {
    this.menuModal = true;
    this.model.title = "Ver Menú - " + dato.usuario;

    this.usuario_id = dato.usuario_id;
    this.usuario_menu_id = dato.usuario_menu_id;

    this.usuario.getUsuariosRolesById({usuario_id: dato.usuario_id}).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        response.result.forEach((x: any) => {
          x.NuevoRegistro = false;
        });
        this.model.varRol = response.result;
      }
    });
  }

  closeViewMenuModal(bol: any) {
    this.menuModal = bol;
  }

  saveRolPrivilegio(index: number) {
    this.array = this.varprivilegio;
    this.inputform = 'rol-privilegio';
    this.index = index;
    this.selectModal = true;
  }

  eliminarRegistro(data: any, index: any) {
    swal({
      title: 'Roles',
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
          usuario_rol_id: data.usuario_rol_id
        }
        this.usuario.deleteUsuariosRolesId(json).subscribe((data:any) => {
          let response: any = this.api.ProcesarRespuesta(data);
          if (response.tipo == 0) {
            this.model.varRol.splice(index, 1);
          }
        });
      }
    }));
  }

  dataform(inputform: any, data: any) {
    this.selectModal = false;
    if (inputform == 'rol-privilegio') {
      this.model.varRol[this.index].rol_id = data.rol_id;
      this.model.varRol[this.index].rol_privilegio_id = data.rol_privilegio_id;
      this.model.varRol[this.index].rol = data.rol;
      this.model.varRol[this.index].modulo = data.modulo;
      this.model.varRol[this.index].nombre_pantalla = data.nombre_pantalla;
      this.model.varRol[this.index].menu_id = data.menu_id;
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
