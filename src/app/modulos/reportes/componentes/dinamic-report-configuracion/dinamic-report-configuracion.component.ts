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
  public nuevoFiltro = true;
  public nombreReporteNuevo = '';
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
    });

    this._usuService.registros().subscribe(usuarios => {
      this.usuariosDelSistema = usuarios;
    });
    this.btnAgregarUsuario = $('#btnAgregarUsuario');

    // this._repService.excel('1');

  }

  // #region Metodos de Obtención y Establecimiento de valores

  // #region Reportes
  private _reportes: Rep[] = [];
  public get reportes(): Rep[] {
    return this._reportes;
  }
  public set reportes(v: Rep[]) {
    this._reportes = v;
  }

  private _reporte: Rep = new Rep();
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
  // #endregion

  // #region Filtros en Reportes
  private _parametros: Repp[] = [];
  public get parametros(): Repp[] {
    return this._parametros;
  }
  public set parametros(v: Repp[]) {
    this._parametros = v;
  }


  private _parametro: Repp = new Repp();
  public get parametro(): Repp {
    if (!this._parametro) { this._parametro = new Repp(); }
    if (this._parametro.TIPO === '') { this._parametro.TIPO = 'ALFANUMERICO'; }
    if (this._parametro.REPORTEID === '') { this._parametro.REPORTEID = this.reporte.REPORTEID; }
    return this._parametro;
  }
  public set parametro(v: Repp) {
    this._parametro = v;
  }

  // #endregion

  // #region Querys
  private _query: string;
  public get query(): string {
    return this._query;
  }
  public set query(v: string) {
    this._query = v.trim();
  }
  // #endregion

  // #region Usuarios asignados al reporte
  private _usuarios: Repu[] = [];
  public get usuarios(): Repu[] {
    if (!this._usuarios) { this._usuarios = []; }
    return this._usuarios;
  }
  public set usuarios(v: Repu[]) {
    this._usuarios = v;
  }
  // #endregion

  // #region Usuarios del sistema
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
  // #endregion

  // #endregion

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

  /**
   * Obtiene los usuarios que tienen el permiso
   */
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
        let msj = 'La consulta no ha podido ser actualizada en la base de datos. ';
        msj += 'Si el problema persiste, contacta por favor al departamento de tecnología';
        this._helper.Notificacion(msj, 'error', '', false);
      }
    });
  }

  eliminarUsuario(usuarioid: string, sedeid: string) {
    const me = this;

    bootbox.confirm('¿Confirma que realmente desea eliminar el usuario del reporte?', function (result) {
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

  /**
   * Da permiso a un usuario al reporte, y consulta los usuarios asignados al reporte actualiza los filtros de los usuarios disponibles para ser agregados
   */
  agregarUsuario() {
    const _me = this;
    this.btnAgregarUsuario.button('loading');
    // console.log('Agregar Usuario: '+this.usuario.NOMBRE+" al reporte "+this.reporte.REPORTEID);
    this._repuService.agregarUsuario(this.reporte.REPORTEID, this.usuario.USUARIOID, this.usuario.SEDEID).subscribe(registrado => {
      this.btnAgregarUsuario.button('reset');
      if (registrado) {
        this.usuario = new Usu();
        this.getUsuarios();
        // this.usuariosDisponibles;

        // this._helper.Notificacion('Consulta del reporte actualizada en la base de datos');
      } else {
        // this._helper.Notificacion('La consulta no ha podido ser actualizada en la base de datos. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
      }
    });
    return false;
  }

  agregarEditarFiltro() {
    this.parametro.NOMBRE = this.parametro.NOMBRE.toUpperCase();
    if (this.nuevoFiltro) {
      this.parametro.REPORTEID = this.reporte.REPORTEID;
      this._reppService.nuevoParametro(this.parametro).subscribe(registrado => {
        if (registrado) {
          this.getParametros();
          this.nuevoFiltro = true;
          this.parametro = new Repp();
          if ($('#btnMinimizarFiltros > i').hasClass('fa-chevron-up')) {
            $('#btnMinimizarFiltros').click();
          }
          this._helper.Notificacion('Filtro agregado al reporte');
        } else {
          this._helper.Notificacion('El filtro no ha podido ser agregado al reporte. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
        }
      });
    } else {
      this._reppService.actualizarParametro(this.parametro).subscribe(actualizado => {
        if (actualizado) {
          this.getParametros();
          this.nuevoFiltro = true;
          this.parametro = new Repp();
          if ($('#btnMinimizarFiltros > i').hasClass('fa-chevron-up')) {
            $('#btnMinimizarFiltros').click();
          }
          this._helper.Notificacion('Datos del filtro actualizados');
        } else {
          this._helper.Notificacion('Los datos del filtro no han podido ser actualizados. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
        }
      });
    }
  }

  cancelarEditarFiltro() {
    this.nuevoFiltro = true;
    this.parametro = new Repp();
  }

  editarParametro(parametro: Repp) {
    this.nuevoFiltro = false;
    this.parametro = parametro;
    if ($('#btnMinimizarFiltros > i').hasClass('fa-chevron-down')) {
      $('#btnMinimizarFiltros').click();
    }
    $('#filtroNombre').focus();
    return false;
  }

  borrarParametro(parametroid) {
    const me = this;
    // bootbox.confirm("¿Confirma que realmente desea eliminar el filtro del reporte? Ésta acción no podrá deshacerse.", function (result) {
    //   if (result) {
    //     me._reppService.quitarParametro(parametroid).subscribe(eliminado => {
    //       if (eliminado) {
    //         me.getParametros();
    //         // me.nuevoFiltro = true;
    //         // me.parametro = new Repp();
    //         // if($('#btnMinimizarFiltros > i').hasClass('fa-chevron-down')){
    //         //   $('#btnMinimizarFiltros').click();
    //         // }
    //         me._helper.Notificacion('Filtro eliminado');
    //       } else {
    //         me._helper.Notificacion('El filtro no ha ha podido ser eliminado del reporte. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
    //       }
    //     });
    //   }
    // });
    bootbox.dialog({
      message: "<span class='bigger-110'>¿Confirma que realmente desea eliminar el filtro del reporte? Ésta acción no podrá deshacerse.</span>",
      buttons:
        {
          "click":
            {
              "label": "Cancelar",
              "className": "btn-sm btn-primary",
              "callback": function () {
                //Example.show("Primary button");
              }
            },
          "danger":
            {
              "label": "Borrar!",
              "className": "btn-sm btn-danger",
              "callback": function () {
                me._reppService.quitarParametro(parametroid).subscribe(eliminado => {
                  if (eliminado) {
                    me.getParametros();
                    // me.nuevoFiltro = true;
                    // me.parametro = new Repp();
                    // if($('#btnMinimizarFiltros > i').hasClass('fa-chevron-down')){
                    //   $('#btnMinimizarFiltros').click();
                    // }
                    me._helper.Notificacion('Filtro eliminado');
                  } else {
                    me._helper.Notificacion('El filtro no ha ha podido ser eliminado del reporte. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
                  }
                });
              }
            }
        }
    });

    return false;
  }


  public generarExcel() {
    let tab: any;
    var textRange; var j = 0;
    tab = document.getElementById('tablaFiltros'); // id of table

    var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
    for (j = 0; j < tab.rows.length; j++) {
      tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
      //tab_text=tab_text+"</tr>";
    }
    tab_text = tab_text + "</table>";
    tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
    tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    let sa: any;
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
      let txtArea1 = $('#txtArea1');
      txtArea1.document.open("txt/html", "replace");
      txtArea1.document.write(tab_text);
      txtArea1.document.close();
      txtArea1.focus();
      sa = txtArea1.document.execCommand("SaveAs", true, "Say Thanks to Sumit.xls");
    }
    else                 //other browser not tested on IE 11
    {
      sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));
    }

    return (sa);
  }

  nuevoReporte() {
    this._repService.nuevoReporte(this.nombreReporteNuevo).subscribe(registrado => {
      if (registrado) {
        this.reporte = new Rep();
        this.reportes = [];
        this._repService.reportes().subscribe(reportes => {
          this.reportes = reportes;
        });
        this.nombreReporteNuevo = '';
        this._helper.Notificacion('Reporte agregado a la base de datos, seleccionelo para editar');
      } else {
        this._helper.Notificacion('El reporte no ha podido ser registrado. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
      }
    });
  }
}
