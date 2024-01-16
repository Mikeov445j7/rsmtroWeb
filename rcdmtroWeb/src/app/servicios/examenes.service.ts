import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenesService {

public API = 'https://rcdmtro.online/apis/examenes.php';
  constructor(
    private _Http: HttpClient
  ) { }


  ExPast(data: any) {
    return this._Http.post(this.API+"?ExPast=1", data);
  }
  past() {
    return this._Http.get(this.API+"?past=1");
  }
  examen() {
    return this._Http.get(this.API+"?examen=1");
  }

}
