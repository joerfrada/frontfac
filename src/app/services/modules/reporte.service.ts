import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private apiReporteCargoView = this.api.getReporteUrl + "reporte/perfilCargo/view/";
  private apiReporteCargo = this.api.getReporteUrl + "reporte/perfilCargo/";

  constructor(private api: ApiService) { }

  public getReporteCargoPreview(id: any) {
    return this.apiReporteCargoView + id.toString();
  }

  public getReporteCargo(id: any) {
    return this.apiReporteCargo + id.toString();
  }
}
