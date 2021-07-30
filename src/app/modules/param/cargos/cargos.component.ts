import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.scss']
})
export class CargosComponent implements OnInit {

  modal: any;
  configModal: any;
  tab: any;

  varhistorial: any = [
    {
      cargo_id: 1,
      cargo: "Cargo 1",
      descripcion: "Descripción 1",
      clase: "Clase 1",
      categoria: "Categoria 1",
      activo: true
    },
    {
      cargo_id: 2,
      cargo: "Cargo 2",
      descripcion: "Descripción 2",
      clase: "Clase 2",
      categoria: "Categoria 2",
      activo: false
    }
  ];

  vargrados = [
    {
      grado_id: 1,
      grado: "Grado 1",
      activo: true
    },
    {
      grado_id: 2,
      grado: "Grado 2",
      activo: true
    }
  ];

  constructor() { }

  ngOnInit(): void {
    this.tab = 1;
  }

  openModal() {
    this.modal = true;
  }

  closeModal(bol: any) {
    this.modal = bol;
  }

  openConfigModal() {
    this.configModal = true;
  }

  closeConfigModal(bol: any) {
    this.configModal = bol;
  }

  selectTab(tab: any) {
    this.tab = tab;
  }

}
