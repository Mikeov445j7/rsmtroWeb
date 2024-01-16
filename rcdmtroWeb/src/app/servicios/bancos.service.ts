import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BancosService {
  public API = 'https://rcdmtro.online/apis/grupos.php';
  constructor(
    private _Http: HttpClient
  ) { }

  listar() {
    return this._Http.get(this.API+"?listar=1");
  }
  bancos(data: any) {
    return this._Http.post("https://rcdmtro.online/apis/bancos.php", data);
  }
  gentB(data: any) {
    return this._Http.post(this.API+"?gentB=1", data);
  }
  getLimit(data: any) {
    return this._Http.post(this.API+"?getLimit=1", data);
  }
  pregunta(data: any) {
    return this._Http.post(this.API+"?pregunta=1", data);
  }


}
