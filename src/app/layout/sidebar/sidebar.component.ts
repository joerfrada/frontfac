import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  currentUser: any;
  allMenu: Menu[] = [];
  usuario = new Usuario();

  constructor() {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any);
    this.usuario.usuario = this.currentUser.usuario;
    let menus = this.currentUser.menus;
    menus.forEach((element: any) => {
      element.submenus = element.submenus.filter((x: any) => x.menu_id != 14);
    });
    this.allMenu = menus;
    // console.log(this.allMenu);
  }

  ngOnInit(): void {
  }

}
