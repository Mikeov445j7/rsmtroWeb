import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenesService } from '../servicios/examenes.service';

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'],
})
export class ExamenComponent implements OnInit {
    public maxTime = 3600;
  public hidevalue=false;
  public tiempo: any;
  public reloj = 0;
  public mitad = 0;
  public cerca = 0;
  public examen: any = [];
  public contestado = false;
  public terminado = false;
  public calificacion = 0;
  public Pconstestadas = 0;
  public Pcorrectas = 0;
  public Pincorrectas = 0;
  public exaIniciado = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public eServ:ExamenesService
  ) { }

  ngOnInit() {
    if (Number(localStorage.getItem('activo')) == 1) {
      this.reloj = this.maxTime;
      this.mitad = this.maxTime / 2;
      this.cerca = this.maxTime / 6;
      this.tiempo = this.secondsToString(this.maxTime);
    } else {
      this.router.navigate(['/obtener-premium']);
    }



  }

  StartTimer(){
    setTimeout(()=>
      {
        if(this.maxTime <= 0) { }
          this.maxTime -= 1;
          this.tiempo = this.secondsToString(this.maxTime)
        if(this.maxTime>0){
          this.hidevalue = false;
          this.StartTimer();
        }
        else{
          this.hidevalue = true;
          this.terminarExamen();
        }
    }, 1000);
  }

  iniciarExamen() {
    this.hidevalue = false;
    this.maxTime = 3600
    this.terminado = false;
    this.reloj = this.maxTime;
    this.mitad = this.maxTime / 2;
    this.cerca = this.maxTime / 6;
    this.calificacion = 0;
    this.Pconstestadas = 0;
    this.Pcorrectas = 0;
    this.Pincorrectas = 0;
    this.exaIniciado = true;
    this.tiempo = this.secondsToString(this.maxTime);
    this.getexamen();

  }

  secondsToString(seconds:any) {
      let hour:any = Math.floor(seconds / 3600);
       hour = (hour < 10)? '' + hour : hour;
      let minute:any = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
      let second:any = seconds % 60;
        second = (second < 10)? '0' + second : second;
      return hour + ':' + minute + ':' + second;
  }

  getexamen() {
    this.eServ.examen().subscribe(e => {
      this.examen = e;
      for (let i = 0; i < this.examen.length; i++) {
          this.examen[i].contestada = 0;
          this.examen[i].numero = i + 1;
          this.examen[i].respuestas = [{ id: 1, texto: this.examen[i].r1, opcion: 'A' },
              { id: 2, texto: this.examen[i].r2, opcion: 'B' },
              { id: 3, texto: this.examen[i].r3, opcion: 'C' },
              { id: 4, texto: this.examen[i].r4, opcion: 'D' },
              { id: 5, texto: this.examen[i].r5, opcion: 'E' }];
          for (let r = 0; r < this.examen[i].respuestas.length; r++) {
              if (this.examen[i].respuestas[r].id == this.examen[i].respuesta) {
                  this.examen[i].respuestas[r].correcta = 1;
              } else {
                  this.examen[i].respuestas[r].correcta = 0;
              }
          }
      }
    this.StartTimer();
    });


  }

  responder(correcta: any, pi:any, ri:any, contestada:any) {
    if (contestada == 0 && !this.terminado) {
      //console.log(correcta, pi, ri);
      this.examen[pi].contestada = 1;
      this.examen[pi].respuestas[ri].seleccionada = 1;
      this.Pconstestadas++;
      if (this.Pconstestadas != 100) {
        if (correcta == 1) {
          this.calificacion++;
          this.Pcorrectas++;
        } else {
          this.Pincorrectas++;
        }
      } else {
        this.terminarExamen();

      }
      //console.log(this.examen[pi].respuestas[ri], this.calificacion);
    }

  }

  terminarExamen() {
    this.maxTime = 0;
    this.terminado = true;
    this.hidevalue = true;
  }

}
