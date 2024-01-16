import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamenesService } from '../servicios/examenes.service';

@Component({
  selector: 'app-examenes-pasados',
  templateUrl: './examenes-pasados.component.html',
  styleUrls: ['./examenes-pasados.component.scss'],
})
export class ExamenesPasadosComponent  implements OnInit {

public examenes:any;
  public cargando = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public eServ:ExamenesService

  ) { }

  ngOnInit() {
    this.doGet();
  }

  doGet() {
    this.eServ.past().subscribe(e => {
     this.examenes = e;
     for (let i = 0; i < this.examenes.length; i++) {
       this.examenes[i].data = JSON.stringify(this.examenes[i]);
     }
     console.log(this.examenes);

      this.cargando = false;
    });
  }


}
