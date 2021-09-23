import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { AreaService } from 'src/app/services/modules/area.service';
import { CuerpoService } from 'src/app/services/modules/cuerpo.service';
import { EspecialidadService } from 'src/app/services/modules/especialidad.service';

declare var swal:any;

@Component({
  selector: 'app-siglas',
  templateUrl: './siglas.component.html',
  styleUrls: ['./siglas.component.scss']
})
export class SiglasComponent implements OnInit {

  tab: any;

  varcuerpo: any = [];
  varespecialidad: any = [];
  vararea: any = [];

  currentUser: any;

  constructor(private router: Router,
              private api: ApiService,
              private area: AreaService,
              private cuerpo: CuerpoService,
              private especialidad: EspecialidadService) { 
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") as any)[0];
  }

  ngOnInit(): void {
    this.tab = 1;
    this.filtro();
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
        console.log('Areas', response.result);
      }
    });

    this.cuerpo.getCuerpos(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varcuerpo = response.result;
        console.log('Cuerpos', response.result);
      }
    });

    this.especialidad.getEspecialidades(json).subscribe(data => {
      let response: any = this.api.ProcesarRespuesta(data);
      if (response.tipo == 0) {
        this.varespecialidad = response.result;
        console.log('Especialidades', response.result);
      }
    });
  }

  openCuerpoModal() {}

  openEspecialidadModal() {}

  openAreaModal() {}

}
