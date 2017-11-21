import { Component, OnInit } from '@angular/core';
import { Usu } from '../../../seguridad/modelos/usu';
import { AuthService } from '../../../seguridad/servicios/auth.service';
import { environment } from '../../../../../environments/environment';
@Component({
  selector: 'app-navbar-top',
  templateUrl: './navbar-top.component.html',
  styleUrls: ['./navbar-top.component.css']
})
export class NavbarTopComponent implements OnInit {
  environment = environment;
  private _usuario: Usu;
  public get usuario(): Usu {
    if (!this._usuario) { this._usuario = new Usu(); }
    return this._usuario;
  }
  public set usuario(v: Usu) {
    this._usuario = v;
  }

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.usuario = this._authService.Usuario();
  }

}
