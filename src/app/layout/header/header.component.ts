import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { UsuarioService } from '../../services/modules/usuario.service';

declare var $:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBar: EventEmitter<any> = new EventEmitter();

  lstRoles: any = [];
  rolModal: any = false;

  currentUser: any;

  constructor(private api: ApiService, private usuario: UsuarioService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
  }

  ngOnInit(): void {
  }

  toggle() {
    this.toggleSideBar.emit();
  }

  openRoles() {
    let id = this.currentUser.usuario_id;
    this.getRolesByUsuarioId(id);
    this.rolModal = true;
  }

  closeRoles() {
    this.rolModal = false;
  }

  getRolesByUsuarioId(id: any) {
    this.usuario.getRolesByUsuarioId({ usuario_id: id }).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.lstRoles = response.result;
      }
    });
  }

  logout() {
    setTimeout(() => {
      localStorage.clear();
      location.href = 'https://plancarrera.fac.mil.co/apiplan/logout';
    }, 10);
  }

}
