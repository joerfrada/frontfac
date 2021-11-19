import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ListaDinamicaService } from '../services/modules/lista-dinamica.service';

declare var $:any;

@Component({
  selector: 'app-platform',
  templateUrl: './platform.component.html',
  styleUrls: ['./platform.component.scss']
})
export class PlatformComponent implements OnInit {

  sideBarOpen = true;
  modal: boolean = false;

  constructor(private api: ApiService, private listaDinamica: ListaDinamicaService) {}

  ngOnInit(): void {
    this.getListasDinamicasFull();
  }

  getListasDinamicasFull() {
    this.listaDinamica.getListasDinamicasFull().subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        localStorage.setItem('listasDinamicasFull', JSON.stringify(response.result));
      }
    });
  }

  openModal() {
    this.modal = true;
  }
  
  closeModal(bol: any) {
    this.modal = bol;
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
