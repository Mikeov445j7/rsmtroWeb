import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
 public user: any;
  public uEmail: any;
  public rUser: any;
  public ver = true;
  public image: any;
  public nombre: any;
  public log = false;
  public usuario: any;
  public idUsuario: any;
  public idPass: any;
  public contrase: any;
  public msj: any;
  public logdata = {
    email: '',
    pass: ''
  }
  public pass = {
    pass1: '',
    pass2: ''

   }
  constructor(
    private router: Router,
    public Userv: UsuariosService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('user')) {
      //this.router.navigate(['/home']);
      this.log = true;
    } else {
      this.log = false;
    }
  }



  login(val: any) {
    const data = { email: val.email };
    let ver: any;
    this.Userv.verificar(data).subscribe(v => {
      this.usuario = v;
    if (this.usuario.success==0) {
      console.log("registrar");
      const dataR = {
          celcontacto: '',
          email: val.email,
          nombre: val.email,
          pass: val.pass,
          GoogleId: '',
          premiun: 0
      };
      this.Userv.insertar(data).subscribe(r => {
        let reg:any = r;
        if (reg.success == 1) {
          this.msj = 'te registraste exitosamente por favor inicia sesion';
          this.contrase = false;
        } else {
          this.msj = 'FALLO el registro por favor intente de nuevo';
        }
      })
    } else {
      this.usuario = this.usuario[0];
      console.log(this.usuario);
      if (this.usuario.pass == null || this.usuario.pass == '' ) {
        console.log('sin pass');
        this.contrase = true;
        this.idUsuario = this.usuario.id;
        console.log("falta pass", this.idUsuario);
      } else {
        this.loginusuario(val.email, val.pass);
       }
    }

    });
  }

  loginusuario(email: any, pass: any) {
    const data = { email: email, pass: pass }
    this.Userv.logad(data).subscribe(log => {
      let l: any = log;
      if (l.success != 0) {
        this.usuario = log;
        this.usuario = this.usuario[0];
        console.log(this.usuario);
        const user = {
          id: this.usuario.id,
          email: email,
          name: this.usuario.nombre,
          imageUrl: 'assets/perfil.png'
        };
        console.log(user);
        localStorage.setItem('activo', this.usuario.premiun);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('usuarios', JSON.stringify(this.usuario));
        this.router.navigate(['/home']);

      } else {
        this.msj = 'tu correo o la contraseña esta equivocadas';
      }


    });

  }

  resPass(val:any) {
    if (val.pass1 === val.pass2) {
      console.log(val);
      const data = { id: this.idUsuario, pass: val.pass1 };
      this.Userv.UpdatePass(data).subscribe(up => {
        let p:any = up;

        if (p.success == 1) {
          console.log(p);
          this.contrase = false;
          this.logdata.pass = val.pass1;
          this.msj = 'su contarseña fue verificada: puedes Loguearte';
        } else {
          this.msj = 'FALLO el registro por favor intente de nuevo';
        }

      });

    } else {
      this.msj = 'LAS CONTRASEÑAS NO SON IGUALES';
    }
  }



}
