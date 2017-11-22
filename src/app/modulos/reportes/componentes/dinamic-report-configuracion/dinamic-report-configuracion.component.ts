import { Component, OnInit } from '@angular/core';
import { Rep } from '../../modelos/rep';
import { Repp } from '../../modelos/repp';
import { Repu } from '../../modelos/repu';
import { Usu } from '../../../seguridad/modelos/usu';
import { RepService } from '../../servicios/rep.service';
import { ReppService } from '../../servicios/repp.service';
import { RepuService } from '../../servicios/repu.service';
import { UsuService } from '../../../seguridad/servicios/usu.service';
import { Helper } from '../../../../app-helper';
declare var $: any;
declare var ace: any;
declare var bootbox: any;
@Component({
  selector: 'app-dinamic-report-configuracion',
  templateUrl: './dinamic-report-configuracion.component.html',
  styleUrls: ['./dinamic-report-configuracion.component.css']
})
export class DinamicReportConfiguracionComponent implements OnInit {
  private btnAgregarUsuario: any;
  constructor(
    private _repService: RepService,
    private _reppService: ReppService,
    private _repuService: RepuService,
    private _usuService: UsuService,
    private _helper: Helper
  ) { }

  ngOnInit() {
    this._repService.reportes().subscribe(reportes => {
      this.reportes = reportes;
      // console.log((this.reportes));
    });

    this._usuService.usuarios().subscribe(usuarios => {
      this.usuariosDelSistema = usuarios;

      // console.log('Usuarios Disponibles');
      // console.log(this.usuariosDisponibles);
      // console.log(this.usuario);

    });
    this.btnAgregarUsuario = $('#btnAgregarUsuario');

  }

  private _reportes: Rep[] = [];
  public get reportes(): Rep[] {
    return this._reportes;
  }
  public set reportes(v: Rep[]) {
    this._reportes = v;
  }

  private _reporte: Rep = new Rep();;
  public get reporte(): Rep {
    if (!this._reporte) { this._reporte = new Rep(); }
    // console.log('REPORTEID: ' + this._reporte.REPORTEID.valueOf());
    return this._reporte;
  }
  public set reporte(v: Rep) {
    this._reporte = v;
    this.query = this.reporte.QUERY;
    this.getParametros();
    this.getUsuarios();
  }

  private _parametros: Repp[] = [];
  public get parametros(): Repp[] {
    return this._parametros;
  }
  public set parametros(v: Repp[]) {
    this._parametros = v;
  }

  private _query: string;
  public get query(): string {
    return this._query;
  }
  public set query(v: string) {
    this._query = v.trim();
  }


  private _usuarios: Repu[] = [];
  public get usuarios(): Repu[] {
    if (!this._usuarios) { this._usuarios = []; }
    return this._usuarios;
  }
  public set usuarios(v: Repu[]) {
    this._usuarios = v;
  }


  private _usuario: Usu = new Usu();
  public get usuario(): Usu {
    if (!this._usuario) { this._usuario = new Usu(); }
    return this._usuario;
  }
  public set usuario(v: Usu) {
    this._usuario = v;
    // console.log(this.usuario);
  }



  private _usuariosDelSistema: Usu[] = [];
  public get usuariosDelSistema(): Usu[] {
    if (!this._usuariosDelSistema) { this._usuariosDelSistema = []; }
    return this._usuariosDelSistema;
  }
  public set usuariosDelSistema(v: Usu[]) {
    this._usuariosDelSistema = v;
  }


  private _usuariosDisponibles: Usu[] = [];
  public get usuariosDisponibles(): Usu[] {
    return this._usuariosDisponibles;
  }
  public set usuariosDisponibles(v: Usu[]) {
    this._usuariosDisponibles = v;
  }




  getParametros() {
    this.parametros = [];
    // console.log(this.reporte);
    if (this.reporte.REPORTEID !== '') {
      this._reppService.parametros(this.reporte.REPORTEID).subscribe(parametros => {
        this.parametros = parametros;
        // console.log(this.parametros);
      });
      // console.log(this.consultaParametros);
    }
  }

  getUsuarios() {
    this.usuarios = [];
    if (this.reporte.REPORTEID !== '') {
      this._usuariosDisponibles = this.usuariosDelSistema;
      this._repuService.usuarios(this.reporte.REPORTEID).subscribe(usuarios => {
        this.usuarios = usuarios;
        // console.log(this.usuarios);

        this.usuariosDisponibles = [];
        this.usuariosDelSistema.forEach(usuarioSistema => {
          let existe = false;
          this.usuarios.forEach(usuarioReporte => {
            if (usuarioSistema.USUARIOID === usuarioReporte.USUARIOID && !existe) {
              existe = true;
            }
          });
          if (!existe) {
            this.usuariosDisponibles.push(usuarioSistema);
          }
        });

      });
    }
  }

  actualizarQuery() {
    // console.log(this.query);
    this._repService.actualizarQuery(this.reporte.REPORTEID, this.query).subscribe(actualizado => {
      if (actualizado) {
        this.reporte.QUERY = this.query;
        this._helper.Notificacion('Consulta del reporte actualizada en la base de datos');
      } else {
        this._helper.Notificacion('La consulta no ha podido ser actualizada en la base de datos. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
      }
    });
  }

  eliminarUsuario(usuarioid: string, sedeid: string) {
    const me = this;

    bootbox.confirm("¿Confirma que realmente desea eliminar el usuario del reporte?", function (result) {
      if (result) {
        // console.log('Eliminar Usuario (' + me.reporte.REPORTEID + ' - ' + sedeid + ' - ' + usuarioid + ')');
        me._repuService.quitarUsuario(me.reporte.REPORTEID, usuarioid, sedeid).subscribe(eliminado => {
          if (eliminado) {
            // let i = 0;
            // me.usuarios.forEach(usuario => {
            //   if (usuario.USUARIOID === usuarioid) {
            //     me.usuarios.splice(i);
            //   }
            //   i++;
            // });
            me.getUsuarios();
            me._helper.Notificacion('Quitado el acceso del reporte ' + me.reporte.NOMBRE + ' al usuario ' + usuarioid);
          } else {
            me._helper.Notificacion('No ha sido posible quitarle el acceso al usuario ' + usuarioid + '. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
          }
        });

      }
    });
  }

  agregarUsuario() {
    const _me = this;
    this.btnAgregarUsuario.button('loading');
    // console.log('Agregar Usuario: '+this.usuario.NOMBRE+" al reporte "+this.reporte.REPORTEID);
    this._repuService.agregarUsuario(this.reporte.REPORTEID, this.usuario.USUARIOID, this.usuario.SEDEID).subscribe(registrado => {
      this.btnAgregarUsuario.button('reset');
      if (registrado) {
        this.getUsuarios();
        // this.usuariosDisponibles;

        // this._helper.Notificacion('Consulta del reporte actualizada en la base de datos');
      } else {
        // this._helper.Notificacion('La consulta no ha podido ser actualizada en la base de datos. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
      }
    });
    return false;
  }

}
