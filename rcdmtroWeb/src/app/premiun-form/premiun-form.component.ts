import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-premiun-form',
  templateUrl: './premiun-form.component.html',
  styleUrls: ['./premiun-form.component.scss'],
})
export class PremiunFormComponent  implements OnInit {

  public user = {
    id: 0,
    celcontacto: '',
    email: '',
    nombre: '',
    pass: ''
  };

  public usuarios: any;
  public datos: any;
  public listo = false;
  public usuario: any;
  public activo: any;
  constructor(
    private router: Router,
    public uServ:UsuariosService
  ) { }

  ngOnInit() {
    console.log(localStorage.getItem('usuarios'));
    this.usuarios = localStorage.getItem('usuarios');
    this.activo = Number(localStorage.getItem('activo'));
    console.log(this.activo);
    this.usuarios = JSON.parse(this.usuarios);
    console.log(this.usuarios);
    this.usuarios = this.usuarios;
    this.user.id = this.usuarios.id;
    this.user.celcontacto = this.usuarios.celcontacto;
    this.user.email = this.usuarios.email;
    this.user.nombre = this.usuarios.nombre;
    this.user.pass = this.usuarios.pass;
  }

  eventoBtn(userFrom: any) {
    userFrom.id = this.usuarios.id;
    this.datos = userFrom;
    console.log(this.datos);
    this.guardar();
  }

  guardar() {
    this.uServ.actualizar(this.datos).subscribe(a => {
      console.log(a);
      let ac: any = a
      console.log(a);
      if (ac.success == 1) {
        const data = { id: this.usuarios.id };
        this.uServ.getUsuario(data).subscribe(us => {
          this.usuario = us
          localStorage.removeItem('usuarios');
          localStorage.setItem('usuarios', JSON.stringify(this.usuario[0]));
          this.user.id = this.usuario[0].id;
          this.user.celcontacto = this.usuario[0].celcontacto;
          this.user.email = this.usuario[0].email;
          this.user.nombre = this.usuario[0].nombre;
          this.user.pass = this.usuario[0].pass;
          this.listo = true;
        });
      }
    });
  }

  editar() {
    this.listo = false;
  }

  recargar() {
    const data = { id: this.user.id };
    this.uServ.getUsuario(data).subscribe(us => {
      this.usuario = us
      localStorage.removeItem('usuarios');
      localStorage.removeItem('activo');
      localStorage.setItem('usuarios', JSON.stringify(this.usuario[0]));
      localStorage.setItem('activo', this.usuario[0].premiun);
      this.router.navigate(['/home']);
    });
  }

}
