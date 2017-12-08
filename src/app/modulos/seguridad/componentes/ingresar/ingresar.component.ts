import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../app-helper';
import { environment } from '../../../../../environments/environment';
import { Usu } from '../../modelos/usu';
import { SedService } from '../../../general/servicios/sed.service';
import { Sed } from '../../../general/modelos/sed';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

declare var $: any;
declare var jQuery: any;
declare var toastr: any;
@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements OnInit {
  constructor(
    private _sedService: SedService,
    private _helper: Helper,
    private _authService: AuthService,
    private _router: Router
  ) { }
  environment = environment;
  sedeDefault: Sed = new Sed('', 'Elige tu Sede', '', '0', '', '', '');

  private _usuario: Usu;
  public get usuario(): Usu {
    if (!this._usuario) { this._usuario = new Usu(); }
    return this._usuario;
  }
  public set usuario(v: Usu) {
    this._usuario = v;
  }

  private _sedes: Sed[];
  public get sedes(): Sed[] {
    if (!this._sedes) { this._sedes = []; }
    return this._sedes;
  }
  public set sedes(v: Sed[]) {
    this._sedes = v;
  }


  private _sede: Sed = new Sed();
  public get sede(): Sed {
    if (!this._sede) { this._sede = new Sed(); }
    return this._sede;
  }
  public set sede(v: Sed) {
    this._sede = v;
  }



  ngOnInit() {
    // $('body').attr('class', 'login-layout');
    $('body').attr('class', 'login-layout blur-login');
    $('#id-text2').attr('class', 'white');
    $('#id-company-text').attr('class', 'light-blue');

    jQuery(function ($) {
      $(document).on('click', '.toolbar a[data-target]', function (e) {
        e.preventDefault();
        const target = $(this).data('target');
        $('.widget-box.visible').removeClass('visible');// hide others
        $(target).addClass('visible');// show target
      });
    });

    // you don't need this, just used for changing background
    jQuery(function ($) {
      $('#btn-login-dark').on('click', function (e) {
        $('body').attr('class', 'login-layout');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
      });
      $('#btn-login-light').on('click', function (e) {
        $('body').attr('class', 'login-layout light-login');
        $('#id-text2').attr('class', 'grey');
        $('#id-company-text').attr('class', 'blue');

        e.preventDefault();
      });
      $('#btn-login-blur').on('click', function (e) {
        $('body').attr('class', 'login-layout blur-login');
        $('#id-text2').attr('class', 'white');
        $('#id-company-text').attr('class', 'light-blue');

        e.preventDefault();
      });

    });

    this._sedService.Sedes().subscribe(sedes => {
      this.sedes = sedes;
    });

    // this._helper.Notificacion('Bienvenido a ' + this.environment.appname,'info');
    // $.notify("Hello World");
    this._authService.CerrarSesion();
    const me = this;
    let aux = <HTMLElement>document.getElementById('USUARIOID');
    aux.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        me.ingresar();
      }
    });
    aux = <HTMLElement>document.getElementById('CLAVE');
    aux.addEventListener('keypress', function (e) {
      if (e.keyCode === 13) {
        me.ingresar();
      }
    });

  }

  ingresar() {
    // console.log(this.sede);
    if (!this.sede.SEDEID || this.sede.SEDEID === '') {
      this._helper.Notificacion('Debes seleccionar una sede', 'error', 'SEDE', false);
      return false;
    }
    if (this.usuario.USUARIOID === '') {
      this._helper.Notificacion('Debes ingresar tu USUARIO para ingresar al sistema', 'error', 'USUARIOID', false);
      return false;
    }
    if (this.usuario.CLAVE === '') {
      this._helper.Notificacion('Debes ingresar la CLAVE de tu usuario para ingresar al sistema', 'error', 'CLAVE', false);
      return false;
    }

    this._authService.Ingresar(this.usuario.USUARIOID, this.usuario.CLAVE, this.sede.SEDEID).subscribe(valido => {
      // console.log('Valido: ', valido);
      if (valido) {
        // this._helper.Notificacion('Bienvenido...');
        // this._router.navigate(['/']);
        // this._router.navigate(['/escritorio/principal']);
        // window.location.href = 'escritorio/principal';
        window.location.href = '';
        // location.reload();
      } else {
        this._helper.Notificacion('Ups! No te reconozco, vuelve a intentarlo.', 'error');
        this._helper.AnimarDiv('formularios');
      }
    });
    return false;
  }

}
