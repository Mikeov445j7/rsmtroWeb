import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent  implements OnInit {

  public user: any;
  public image: any;
  public nombre: any;
  public premium = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
        this.user = localStorage.getItem('user');
        this.user = JSON.parse(this.user);
      this.image = this.user.imageUrl;
      let ne:any = localStorage.getItem('usuarios');
      ne = JSON.parse(ne);
      this.nombre = ne.nombre;
      console.log(ne);

      if (Number(localStorage.getItem('activo')) == 1) {
        this.premium = true;
      }

    } else {
        this.router.navigate(['/login']);
    }
  }
  cerrarSesion() {
    localStorage.removeItem('usuarios');
    localStorage.removeItem('activo');
    localStorage.removeItem('user');
    localStorage.removeItem('mail');
    localStorage.removeItem('SFNOM');
    localStorage.removeItem('id');
    window.location.reload();
    window.location.reload();
    this.router.navigate(['home']);
  }

}
