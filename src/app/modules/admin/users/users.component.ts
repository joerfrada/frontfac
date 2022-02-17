import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { UsuarioService } from '../../../services/modules/usuario.service';
import { RolService } from '../../../services/modules/rol.service';

declare var swal:any;

export class Model {
  title: any;
  tipo = 'C';

  varUsuario: any = {
    usuario_id: 0,
    usuario: "",
    nombres: "",
    apellidos: "",
    num_identificacion: 0,
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
  selectModal: any;

  usuario_id: any;
  index: any;
  indexform: any;

  array: any = [];
  varprivilegio: any = [];

  currentUser: any;

  constructor(private router: Router, private api: ApiService, private usuario: UsuarioService, private rol: RolService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
    this.model.varUsuario.usuario_creador = this.currentUser.usuario;
    this.model.varUsuario.usuario_modificador = this.currentUser.usuario;
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
        if (item.rol.toString().toLowerCase().indexOf(filtro) !== -1) {
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
      nombres: "",
      apellidos: "",
      num_identificacion: 0,
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
        response.result.forEach((x: any) => {
          x.sigla1 = x.rol;
          x.sigla2 = x.modulo;
          x.sigla3 = x.nombre_pantalla;
        });
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
    this.model.varUsuario.nombres = dato.nombres;
    this.model.varUsuario.apellidos = dato.apellidos;
    this.model.varUsuario.num_identificacion = dato.num_identificacion;
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
        this.model.varRol = response.result;
      }
    });
  }

  closeRolModal(bol: any) {
    this.rolModal = bol;
  }

  changeRol(rol_id: any, index: any) {
    this.model.varRol[index].descripcion = this.lstRoles.filter((x: any) => x.rol_id == rol_id )[0].descripcion;
  }

  addRol() {
    this.model.varRol.push({usuario_rol_id: 0, usuario_id: 0, rol_id: 0, rol_privilegio_id: 0, rol: "", modulo: "", nombre_pantalla: "", activo: true, usuario_creador: this.currentUser.usuario, usuario_modificador: this.currentUser.usuario, NuevoRegistro: true});
  }

  deleteRol(index: any) {
    this.model.varRol.splice(index, 1);
  }

  saveRol() {
    if (this.model.varRol.length > 0) {
      this.model.varRol.forEach((element: any) => {
        element.usuario_id = this.usuario_id;

        if (element.NuevoRegistro == true) {
          //this.usuario.createUsuariosRoles(element).subscribe(data1 => {});
          console.log('Create Rol:', element);
        }
        else {
          //this.usuario.updateUsuariosRoles(element).subscribe(data1 => {});
          console.log('Update Rol:', element);
        }
      });
    }

    // swal({
    //   title: 'Roles Privilegios',
    //   text: 'Los roles privilegios ha guardado exitoso.',
    //   allowOutsideClick: false,
    //   showConfirmButton: true,
    //   type: 'success'
    // }).then((result: any) => {
    //   this.rolModal = false;
    //   this.reload();
    // })
  }

  saveRolPrivilegio(index: number) {
    this.array = this.varprivilegio;
    this.indexform = 'rol-privilegio';
    this.index = index;
    this.selectModal = true;
  }

  dataform(indexform: any, data: any) {
    this.selectModal = false;
    if (indexform == 'rol-privilegio') {
      this.model.varRol[this.index].rol_id = data.rol_id;
      this.model.varRol[this.index].rol_privilegio_id = data.rol_privilegio_id;
      this.model.varRol[this.index].rol = data.sigla1;
      this.model.varRol[this.index].modulo = data.sigla2;
      this.model.varRol[this.index].nombre_pantalla = data.sigla3;
    }
  }
}
