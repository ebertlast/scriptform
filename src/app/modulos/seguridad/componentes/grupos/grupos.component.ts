import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { Helper } from '../../../../app-helper';
import { Usgru } from '../../modelos/usgru';
import { Usgruh } from '../../modelos/usgruh';
import { UsgruService } from '../../servicios/usgru.service';
import { UsgruhService } from '../../servicios/usgruh.service';
import { Uspro } from '../../modelos/uspro';
import { Usproh } from '../../modelos/usproh';
import { UsproService } from '../../servicios/uspro.service';
import { UsprohService } from '../../servicios/usproh.service';
declare var $: any;
declare var bootbox: any;
@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {
  editar = false;
  cargando = false;
  restringir = false;
  usprohVacio: Usproh = new Usproh();
  usproVacio: Uspro = new Uspro();
  constructor(
    private _helper: Helper,
    private _usgruService: UsgruService,
    private _usgruhService: UsgruhService,
    private _usproService: UsproService,
    private _usprohService: UsprohService,
  ) { }

  // #region Métodos de obtención y establecimiento de valores

  private _usgru: Usgru = new Usgru();
  public get usgru(): Usgru {
    return this._usgru;
  }
  public set usgru(v: Usgru) {
    this._usgru = v;
  }

  private _usgrus: Usgru[] = [];
  public get usgrus(): Usgru[] {
    return this._usgrus;
  }
  public set usgrus(v: Usgru[]) {
    this._usgrus = v;
  }

  private _usgruh: Usgruh = new Usgruh();
  public get usgruh(): Usgruh {
    return this._usgruh;
  }
  public set usgruh(v: Usgruh) {
    this._usgruh = v;
  }

  private _usgruhs: Usgruh[] = [];
  public get usgruhs(): Usgruh[] {
    return this._usgruhs;
  }
  public set usgruhs(v: Usgruh[]) {
    this._usgruhs = v;
  }


  private _uspro: Uspro = new Uspro();
  public get uspro(): Uspro {
    return this._uspro;
  }
  public set uspro(v: Uspro) {
    this._uspro = v;
  }

  private _uspros: Uspro[] = [];
  public get uspros(): Uspro[] {
    return this._uspros;
  }
  public set uspros(v: Uspro[]) {
    this._uspros = v;
  }

  private _usproh: Usproh = new Usproh();
  public get usproh(): Usproh {
    return this._usproh;
  }
  public set usproh(v: Usproh) {
    this._usproh = v;
  }

  private _usprohs: Usproh[] = [];
  public get usprohs(): Usproh[] {
    return this._usprohs;
  }
  public set usprohs(v: Usproh[]) {
    this._usprohs = v;
  }


  // #endregion

  // #region DataTable
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  /**
   * Usamos este disparador porque recuperar la lista de registros puede ser bastante largo,
   * por lo tanto, aseguramos que los datos se obtienen antes de la representación
   */
  dtTrigger: Subject<any> = new Subject();
  aux = 0;
  someClickHandler(_usgruh: any): void {
    const usgruh: Usgruh = new Usgruh(_usgruh[0], _usgruh[1], _usgruh[2], _usgruh[3]);
    this.usgruh = usgruh;
    this.editar = true;
    $('#ControlID').focus();
  }
  // #endregion


  ngOnInit() {
    this.refrescarUsgru();
    this.refrescarUspro();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        lengthMenu: 'Mostrar _MENU_ registros por página',
        zeroRecords: 'Nada encontrado - intenta con otra palabra',
        info: 'Mostrando página _PAGE_ de _PAGES_',
        infoEmpty: 'No hay registros disponibles',
        infoFiltered: '(filtrado de _MAX_ registros en total)',
        search: 'Buscar:',
        paginate: {
          previous: 'Anterior',
          next: 'Siguiente',
          first: 'Primera',
          last: 'Última',
        },
      },
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        /**
         * Desvincular primero para evitar cualquier controlador duplicado
         * (mirar https://github.com/l-lin/angular-datatables/issues/87)
         */
        $('td', row).unbind('click');
        $('td', row).bind('click', () => {
          self.someClickHandler(data);
        });
        return row;
      },
    };
  }

  private refrescarUspro() {
    this.cargando = true;
    this._usproService.registros().subscribe(uspros => {
      this.cargando = false;
      this.uspros = uspros;
    });
  }

  private refrescarUsgru() {
    this.cargando = true;
    this._usgruService.registros().subscribe(usgrus => {
      this.cargando = false;
      this.usgrus = usgrus;
    });
  }

  public refrescarUsproh() {
    if (this.uspro.ProcedimientoID === '') { return; }
    this.usproh = this.usprohVacio;
    this.usprohs = [];
    this._usprohService.registros(this.uspro.ProcedimientoID).subscribe(usprohs => {
      this.usprohs = usprohs;
      this.refrescarUsgruh();
    });
  }

  public refrescarUsgruh() {
    if (this.usgru.GrupoID === '' || this.uspro.ProcedimientoID === '') { return; }
    this.usgruh = new Usgruh(this.usgru.GrupoID);
    this.cargando = true;
    this._usgruhService.registros(this.usgru.GrupoID, this.uspro.ProcedimientoID).subscribe(usgruhs => {
      this.usgruhs = usgruhs;
      if (this.aux === 0) {
        this.aux++;
        this.dtTrigger.next();
      } else {
        this.rerender();
      }
      this.cargando = false;
    });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  public delUsgru() {
    if (this.usgru.GrupoID === '') {
      return;
    }
    const me = this;
    bootbox.dialog({
      // tslint:disable-next-line:max-line-length
      message: '<span class="bigger-110">¿Confirma que realmente desea borrar el registro definitivamente? Ésta acción no podrá deshacerse.</span>',
      buttons:
        {
          'click':
            {
              'label': 'Cancelar',
              'className': 'btn-sm btn-primary',
              'callback': function () {
                // Example.show('Primary button');
                me._helper.Notificacion('Cancelado por el usuario', 'info');
              }
            },
          'danger':
            {
              'label': 'Borrar!',
              'className': 'btn-sm btn-danger',
              'callback': function () {
                const btn = $('#btnDelUsgru');
                btn.button('loading');
                me._usgruService.eliminarRegistro(me.usgru.GrupoID).subscribe(exito => {
                  btn.button('reset');
                  if (exito) {
                    me.usproh = new Usproh(me.uspro.ProcedimientoID);
                    me.refrescarUsgru();
                    me._helper.Notificacion('Registro borrado de la base de datos');
                    // $('#ControlID').focus();
                  } else {
                    // tslint:disable-next-line:max-line-length
                    me._helper.Notificacion('No hemos podido borrar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
                  }
                });
              }
            }
        }
    });
  }

  public addUsgru() {
    if (this.usgru.GrupoID === '') {
      $('#GrupoID').focus();
      return;
    }
    if (this.usgru.DescripcionGrupo === '') {
      $('#DescripcionGrupo').focus();
      return;
    }

    const btn = $('#btnAddUsgru');
    btn.button('loading');
    this._usgruService.nuevoRegistro(this.usgru).subscribe(exito => {
      btn.button('reset');
      if (exito) {
        this.usgruh = new Usgruh();
        this.usgru = new Usgru();
        this.refrescarUsgru();
        this._helper.Notificacion('Registro agregado en la base de datos');
      } else {
        // tslint:disable-next-line:max-line-length
        this._helper.Notificacion('No hemos podido agregar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
      }
    });
  }

  public darPermiso(quitar = false) {
    if (this.usproh.ControlID === '' || this.usgru.GrupoID === '') { return; }
    this.usgruh = new Usgruh(this.usgru.GrupoID, this.uspro.ProcedimientoID, this.usproh.ControlID, 1);
    let existeEnBD = false;
    this.usgruhs.forEach(usgruh => {
      if (usgruh.ControlID === this.usgruh.ControlID) {
        existeEnBD = true;
      }
    });
    const btn = $('#btnPermitir');
    btn.button('loading');
    if (!existeEnBD) {
      this._usgruhService.nuevoRegistro(this.usgruh).subscribe(exito => {
        btn.button('reset');
        if (exito) {
          // this.uspro = this.usproVacio;
          this.usproh = this.usprohVacio;
          // this.usgruh = new Usgruh();
          // this.usgru = new Usgru();
          this.refrescarUsgruh();
          this._helper.Notificacion('Permiso concedido');
        } else {
          // tslint:disable-next-line:max-line-length
          this._helper.Notificacion('No hemos podido actualizar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
        }
      });
    } else {
      if (quitar) {
        this.usgruh.Permiso = 0;
      } else {
        this.usgruh.Permiso = 1;
      }
      this._usgruhService.actualizarRegistro(this.usgruh).subscribe(exito => {
        btn.button('reset');
        if (exito) {
          // this.uspro = this.usproVacio;
          this.usproh = this.usprohVacio;
          this.refrescarUsgruh();
          if (quitar) {
            this._helper.Notificacion('Permiso denegado');
          } else {
            this._helper.Notificacion('Permiso concedido');
          }
        } else {
          // tslint:disable-next-line:max-line-length
          this._helper.Notificacion('No hemos podido actualizar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
        }
      });
    }

  }

  public consultarAcceso() {
    if (this.usproh.ControlID === '' || this.usproh.ProcedimientoID === '' || this.usgru.GrupoID === '') { return; }
    this.restringir = false;
    this._usgruhService.registros(this.usgru.GrupoID, this.usproh.ProcedimientoID, this.usproh.ControlID).subscribe(usgruhs => {
      if (usgruhs.length > 0) {
        usgruhs.forEach(usgruh => {
          if (usgruh.Permiso) {
            this.restringir = true;
          }
        });
      }
      // console.log(usgruhs);
    });
  }

}
