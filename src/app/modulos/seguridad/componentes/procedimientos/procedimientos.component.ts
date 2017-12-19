import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { Helper } from '../../../../app-helper';
import { UsproService } from '../../servicios/uspro.service';
import { UsprohService } from '../../servicios/usproh.service';
import { Usproh } from '../../modelos/usproh';
import { Uspro } from '../../modelos/uspro';
declare var $: any;
declare var bootbox: any;
@Component({
  selector: 'app-procedimientos',
  templateUrl: './procedimientos.component.html',
  styleUrls: ['./procedimientos.component.css']
})
export class ProcedimientosComponent implements OnInit {
  private cargando = false;
  public editar = false;
  constructor(
    private _helper: Helper,
    private _usproService: UsproService,
    private _usprohService: UsprohService,
  ) { }

  // #region Métodos de obtención y establecimiento de valores

  private _usprohs: Usproh[] = [];
  public get usprohs(): Usproh[] {
    return this._usprohs;
  }
  public set usprohs(v: Usproh[]) {
    this._usprohs = v;
  }

  private _usproh: Usproh = new Usproh();
  public get usproh(): Usproh {
    return this._usproh;
  }
  public set usproh(v: Usproh) {
    this._usproh = v;
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
  someClickHandler(_usproh: any): void {
    const usproh: Usproh = new Usproh(_usproh[0], _usproh[1], _usproh[2]);
    this.usproh = usproh;
    this.editar = true;
    $('#ControlID').focus();
  }
  // #endregion

  ngOnInit() {
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

    const me = this;
    $('#ControlID').on('keypress', function (e) {
      if (e.keyCode === 13) {
        if (me.editar) {
          me.editUsproh();
        } else {
          me.addUsproh();
        }
      }
    });
    $('#DescripcionControl').on('keypress', function (e) {
      if (e.keyCode === 13) {
        if (me.editar) {
          me.editUsproh();
        } else {
          me.addUsproh();
        }
      }
    });
  }

  refrescarUspro() {
    this.cargando = true;
    this._usproService.registros().subscribe(uspros => {
      this.uspros = uspros;
      this.cargando = false;
    });
  }

  refrescarUsproh() {
    if (this.uspro.ProcedimientoID === '') { return; }
    this.usproh = new Usproh(this.uspro.ProcedimientoID);
    this.cargando = true;
    this._usprohService.registros(this.uspro.ProcedimientoID).subscribe(usprohs => {
      this.usprohs = usprohs;
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
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  addUspro() {
    if (this.uspro.ProcedimientoID === '') {
      $('#ProcedimientoID').focus();
      return false;
    }
    if (this.uspro.DescripcionProcedimiento === '') {
      $('#DescripcionProcedimiento').focus();
      return false;
    }
    const btn = $('#btnAddUspro');
    btn.button('loading');
    this._usproService.nuevoRegistro(this.uspro).subscribe(exito => {
      btn.button('reset');
      if (exito) {
        this.usproh = new Usproh();
        this.uspro = new Uspro();
        this.refrescarUspro();
        this._helper.Notificacion('Registro agregado en la base de datos');
      } else {
        // tslint:disable-next-line:max-line-length
        this._helper.Notificacion('No hemos podido agregar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
      }
    });
    return false;
  }

  delUspro() {
    if (this.uspro.ProcedimientoID === '') {
      this._helper.Notificacion('Debes elegir el registro a eliminar', 'warning');
      return false;
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
                const btn = $('#btnAddUspro');
                btn.button('loading');
                me._usproService.eliminarRegistro(me.uspro.ProcedimientoID).subscribe(exito => {
                  btn.button('reset');
                  if (exito) {
                    me.usproh = new Usproh();
                    me.uspro = new Uspro();
                    me.refrescarUspro();
                    me._helper.Notificacion('Registro borrado de la base de datos');
                  } else {
                    // tslint:disable-next-line:max-line-length
                    me._helper.Notificacion('No hemos podido borrar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
                  }
                });
              }
            }
        }
    });

    return false;
  }

  addUsproh() {
    if (this.usproh.ControlID === '') {
      $('#ControlID').focus();
      return;
    }
    if (this.usproh.DescripcionControl === '') {
      $('#DescripcionControl').focus();
      return;
    }
    this.usproh.ProcedimientoID = this.uspro.ProcedimientoID;
    const btn = $('#btnAddUsproh');
    btn.button('loading');
    this._usprohService.nuevoRegistro(this.usproh).subscribe(exito => {
      btn.button('reset');
      if (exito) {
        this.usproh = new Usproh(this.uspro.ProcedimientoID, '', '');
        this.refrescarUsproh();
        this._helper.Notificacion('Registro agregado en la base de datos');
        this.editar = false;
        $('#ControlID').focus();
      } else {
        // tslint:disable-next-line:max-line-length
        this._helper.Notificacion('No hemos podido agregar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
      }
    });
  }

  editUsproh() {
    if (this.usproh.ControlID === '' || this.usproh.DescripcionControl === '' || this.usproh.ProcedimientoID === '') {
      return;
    }
    const btn = $('#btnEditUsproh');
    btn.button('loading');
    this._usprohService.actualizarRegistro(this.usproh).subscribe(exito => {
      btn.button('reset');
      if (exito) {
        this.usproh = new Usproh(this.uspro.ProcedimientoID, '', '');
        this.refrescarUsproh();
        this._helper.Notificacion('Registro actualizado');
        this.editar = false;
        $('#ControlID').focus();
      } else {
        // tslint:disable-next-line:max-line-length
        this._helper.Notificacion('No hemos podido actualizar el registro a la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
      }
    });
  }

  delUsproh() {
    this.usproh.ProcedimientoID = this.uspro.ProcedimientoID;
    if (this.usproh.ControlID === '') {
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
                const btn = $('#btnDelUsproh');
                btn.button('loading');
                me._usprohService.eliminarRegistro(me.usproh.ProcedimientoID, me.usproh.ControlID).subscribe(exito => {
                  btn.button('reset');
                  if (exito) {
                    me.usproh = new Usproh(me.uspro.ProcedimientoID);
                    me.refrescarUsproh();
                    me._helper.Notificacion('Registro borrado de la base de datos');
                    $('#ControlID').focus();
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

  cancelarEdicion() {
    this.editar = false;
    this.usproh = new Usproh(this.uspro.ProcedimientoID, '', '');
  }

}
