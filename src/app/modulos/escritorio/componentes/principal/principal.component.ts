import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Usu } from '../../../seguridad/modelos/usu';
import { AuthService } from '../../../seguridad/servicios/auth.service';
import { Router } from '@angular/router';
declare var jQuery: any;
declare var $: any;
declare var ace: any;
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {
  environment = environment;
  constructor(private _authService: AuthService, private _router: Router) { }

  private _usuario: Usu;
  public get usuario(): Usu {
    if (!this._usuario) { this._usuario = new Usu(); }
    return this._usuario;
  }
  public set usuario(v: Usu) {
    this._usuario = v;
  }

  ngOnInit() {
    $('body').attr('class', 'no-skin');
    this.usuario = this._authService.Usuario();
    // <!-- inline scripts related to this page -->
    // this._router.navigate(['/consultas']);

  }

}
