import { Component, OnInit } from '@angular/core';
import { Tgen } from '../../modelos/tgen';
import { TgenService } from '../../servicios/tgen.service';
import { Helper } from '../../../../app-helper';
declare var $: any;
declare var ace: any;
declare var bootbox: any;
@Component({
  selector: 'app-tgen',
  templateUrl: './tgen.component.html',
  styleUrls: ['./tgen.component.css']
})
export class TgenComponent implements OnInit {
  // public tabla = 'GENERAL';
  // public campo = '';
  // public codigo = '';
  // public descripcion = '';
  // public dato = '';
  public actualizar = false;
  public cargando = false;
  constructor(
    private _tgenService: TgenService,
    private _helper: Helper
  ) { }

  ngOnInit() {
    this.obtenerRegistros();

    // this._tgenService.distintasTablas().subscribe(tablas => {
    //   this.tablas = tablas;
    // });

    // #region typeahead.js
    // example taken from plugin's page at: https://twitter.github.io/typeahead.js/examples/
    const substringMatcher = function (strs) {
      return function findMatches(q, cb) {
        let matches;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        let substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function (i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });

        cb(matches);
      }
    }

    // $('input.typeahead').typeahead({
    //   hint: true,
    //   highlight: true,
    //   minLength: 1
    // }, {
    //     name: 'states',
    //     displayKey: 'value',
    //     source: substringMatcher(ace.vars['US_STATES']),
    //     limit: 10
    //   });
    // #endregion

    const me = this;
    let aux = <HTMLElement>document.getElementById('tabla');
    aux.addEventListener('keypress', function (e) { if (e.keyCode === 13) { $('#campo').focus().select(); /*me.guardar();*/ } });
    aux = <HTMLElement>document.getElementById('campo');
    aux.addEventListener('keypress', function (e) { if (e.keyCode === 13) { $('#codigo').focus().select(); /*me.guardar();*/ } });
    aux = <HTMLElement>document.getElementById('codigo');
    aux.addEventListener('keypress', function (e) { if (e.keyCode === 13) { $('#dato').focus().select(); /*me.guardar();*/ } });
    aux = <HTMLElement>document.getElementById('dato');
    aux.addEventListener('keypress', function (e) { if (e.keyCode === 13) { $('#descripcion').focus().select(); /*me.guardar();*/ } });
    aux = <HTMLElement>document.getElementById('descripcion');
    aux.addEventListener('keypress', function (e) { if (e.keyCode === 13) { me.guardar(); } });

  }

  // #region Metodos de obtención y establecimiento de valores

  private _registros: Tgen[] = [];
  public get registros(): Tgen[] {
    return this._registros;
  }
  public set registros(v: Tgen[]) {
    this._registros = v;
  }

  private _registro: Tgen = new Tgen();
  public get registro(): Tgen {
    return this._registro;
  }
  public set registro(v: Tgen) {
    this._registro = v;
  }


  private _tablas: string[] = [];
  public get tablas(): string[] {
    return this._tablas;
  }
  public set tablas(v: string[]) {
    this._tablas = v;
  }


  private _campos: string[] = [];
  public get campos(): string[] {
    return this._campos;
  }
  public set campos(v: string[]) {
    this._campos = v;
  }

  private _tabla: string = 'GENERAL';
  public get tabla(): string {
    this._tabla = this._tabla.toUpperCase();
    return this._tabla;
  }
  public set tabla(v: string) {
    this._tabla = v;
  }


  private _campo: string = '';
  public get campo(): string {
    this._campo = this._campo.toUpperCase();
    return this._campo;
  }
  public set campo(v: string) {
    this._campo = v;
  }

  private _codigo: string = '';
  public get codigo(): string {
    return this._codigo;
  }
  public set codigo(v: string) {
    this._codigo = v;
  }

  private _descripcion: string = '';
  public get descripcion(): string {
    return this._descripcion;
  }
  public set descripcion(v: string) {
    this._descripcion = v;
  }

  private _dato: string = '';
  public get dato(): string {
    return this._dato;
  }
  public set dato(v: string) {
    this._dato = v;
  }



  // #endregion

  // #region Métodos CRUD

  public nuevoRegistro() {
    $('.notifyjs-corner').empty();
    if (this.tabla === '') {
      this._helper.Notificacion('Debes escribir el nombre de la tabla', 'error', 'tabla', false);
      return false;
    }
    if (this.campo === '') {
      this._helper.Notificacion('Debes escribir el campo', 'error', 'campo', false);
      return false;
    }
    if (this.descripcion === '') {
      this._helper.Notificacion('Debes escribir la descripción del registro', 'error', 'descripcion', false);
      return false;
    }
    this.registro.CAMPO = this.campo;
    this.registro.CODIGO = this.codigo;
    this.registro.DATO1 = this.dato;
    this.registro.DESCRIPCION = this.descripcion;
    this.registro.TABLA = this.tabla;
    this._tgenService.nuevoRegistro(this.registro).subscribe(registrado => {
      if (registrado) {
        this._helper.Notificacion('Registro agregado a la tabla');
        this.obtenerRegistros();
      } else {
        let msj = 'El registro no ha podido ser agregado en la base de datos. ';
        msj += 'Si el problema persiste, contacta por favor al departamento de tecnología.';
        this._helper.Notificacion(msj, 'error', '', false);
      }
    });
    $('#codigo').focus().select();
  }

  public obtenerRegistros() {
    if (this.tabla === '' || this.campo === '') { return; }
    this._tgenService.registros(this.tabla, this.campo, '').subscribe(registros => {
      this.registros = registros;
      // console.log(this.registros);
    });
  }

  public actualizarRegistro() {
    this.registro.CODIGO = this.codigo;
    this.registro.DESCRIPCION = this.descripcion;
    this.registro.DATO1 = this.dato;
    this._tgenService.actualizarRegistro(this.registro).subscribe(actualizado => {
      if (actualizado) {
        this._helper.Notificacion('Registro actualizado');
        this.obtenerRegistros();
      } else {
        let msj = 'El registro no ha podido ser actualizado en la base de datos. ';
        msj += 'Si el problema persiste, contacta por favor al departamento de tecnología.';
        this._helper.Notificacion(msj, 'error', '', false);
      }
    });
  }

  public eliminarRegistro(registro: Tgen) {
    const me = this;
    bootbox.dialog({
      message: `
      <span class="bigger-110">
      ¿Confirma que realmente desea eliminar el registro de la tabla? Ésta acción no podrá deshacerse.
      </span>`,
      buttons:
        {
          'click':
            {
              'label': 'Cancelar',
              'className': 'btn-sm btn-primary',
              'callback': function () {
              }
            },
          'danger':
            {
              'label': 'Borrar!',
              'className': 'btn-sm btn-danger',
              'callback': function () {
                me._tgenService.eliminarRegistro(registro.TABLA, registro.CAMPO, registro.CODIGO).subscribe(eliminado => {
                  if (eliminado) {
                    me._helper.Notificacion('Registro descartado de la base de datos');
                    me.obtenerRegistros();
                  } else {
                    let msj = 'El registro no ha podido ser descartado de la base de datos. ';
                    msj += 'Si el problema persiste, contacta por favor al departamento de tecnología.';
                    me._helper.Notificacion(msj, 'error', '', false);
                  }
                });
              }
            }
        }
    });
  }

  // #endregion

  guardar() {
    if (!this.actualizar) {
      // Nuevo registro en tgen
      this.nuevoRegistro();
    } else {
      // Actualizar registro en tgen
      this.actualizarRegistro();
    }

  }
  cancelar() {
    this.actualizar = false;
    this.registro = new Tgen();
    this.tabla = 'GENERAL';
    // this.campo = '';
    this.codigo = '';
    this.descripcion = '';
    this.dato = '';
    $('#campo').focus();
  }

  refrescar() {
    this.obtenerRegistros();
  }

  editar(registro: Tgen) {
    this.actualizar = true;
    this.registro = registro;
    this.tabla = this.registro.TABLA;
    this.campo = this.registro.CAMPO;
    this.codigo = this.registro.CODIGO;
    this.descripcion = this.registro.DESCRIPCION;
    this.dato = this.registro.DATO1;

    return false;
  }
}
