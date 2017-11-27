import { Component, OnInit, Directive, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Usu } from '../../../seguridad/modelos/usu';
import { AuthService } from '../../../seguridad/servicios/auth.service';
import { Router } from '@angular/router';
import { MyLinkDirective } from '../../../general/directivas/my-link.directive';

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
  public marquesina = '';
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

    this.msjMarquesina();
  }
  private msjMarquesina() {
    // console.log("Supervisar Sesión " + Date());
    this.marquesina = this._authService.MsjBienvenida();
    const _me = this;
    setTimeout(function () {
      _me.msjMarquesina();
    },60000);
  }

  passTheSalt() {
    return false;
  }

  prueba() {
    // nav-show
    // nav-hide
    // if ($('#ebert > ul').hasClass('nav-show')) {
    //   // $('#btnMinimizarFiltros').click();
    //   $('#ebert').parent().addClass('open');
    //   $('#ebert > ul').removeClass('nav-hide').addClass('nav-show');
    // }else{
    //   $('#ebert').parent().removeClass('open');
    //   $('#ebert > ul').removeClass('nav-show').addClass('nav-hide');
    // }
    // console.log("Prueba ");
    // return false;
  }

}
