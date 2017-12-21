import { Component, OnInit, Directive, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Usu } from '../../../seguridad/modelos/usu';
import { AuthService } from '../../../seguridad/servicios/auth.service';
import { Router } from '@angular/router';
import { MyLinkDirective } from '../../../general/directivas/my-link.directive';
import { UsgruhService } from '../../../seguridad/servicios/usgruh.service';
import { Usgruh } from '../../../seguridad/modelos/usgruh';
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
  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _usgruhService: UsgruhService,
  ) { }

  private _usuario: Usu;
  public get usuario(): Usu {
    if (!this._usuario) { this._usuario = new Usu(); }
    return this._usuario;
  }
  public set usuario(v: Usu) {
    this._usuario = v;
  }


  private _ctrls: Usgruh[] = [];
  public get ctrls(): Usgruh[] {
    return this._ctrls;
  }
  public set ctrls(v: Usgruh[]) {
    this._ctrls = v;
  }



  ngOnInit() {
    $('body').attr('class', 'no-skin');
    this.usuario = this._authService.Usuario();
    // <!-- inline scripts related to this page -->
    // this._router.navigate(['/consultas']);

    this.msjMarquesina();

    // $('#btnRouterLinkRadicaciones').click();
    // this._usgruhService.registros(this.usuario.GRUPOID,)
    this.permisos();
  }
  private msjMarquesina() {
    this.marquesina = this._authService.MsjBienvenida();
    const _me = this;
    setTimeout(function () {
      _me.msjMarquesina();
    }, 60000);
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

  permisos() {
    this.ctrls = [];
    this._usgruhService.registros(this.usuario.GRUPOID, 'MENUPRINCIPAL').subscribe(ctrls => {
      this.ctrls = ctrls;
    });
  }
  permiso(controlid: string): boolean {
    let permitido = false;
    this.ctrls.forEach(permiso => {
      if (permiso.ControlID === controlid && permiso.Permiso === 1) {
        permitido = true;
      }
    });
    return permitido;
  }

}
