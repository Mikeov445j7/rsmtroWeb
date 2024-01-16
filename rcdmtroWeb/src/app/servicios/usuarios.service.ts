import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
public API = 'https://rcdmtro.online/apis/usuarios.php';
  constructor(
    private _Http: HttpClient
  ) { }

  actualizarINFO(data: any) {
    return this._Http.post(this.API+"?actualizarINFO=1", data);
  }
  verificar(data: any) {
    return this._Http.post(this.API+"?verificar=1", data);
  }
  insertar(data: any) {
    return this._Http.post(this.API+"?insertar=1", data);
  }
  logad(data: any) {
    return this._Http.post(this.API+"?logad=1", data);
  }
  UpdatePass(data: any){
    return this._Http.post(this.API + "?UpdatePass=1", data);
  }
  actualizar(data: any) {
    return this._Http.post(this.API+"?actualizar=1", data);
  }
  getUsuario(data: any) {
    return this._Http.post(this.API+"?getUsuario=1", data);
  }

}
