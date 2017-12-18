import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { Helper } from '../../../../app-helper';
import { EmplService } from '../../../general/servicios/empl.service';
import { Empl } from '../../../general/modelos/empl';
import { TidService } from '../../../general/servicios/tid.service';
import { Tid } from '../../../general/modelos/tid';
import { Nae } from '../../../general/modelos/nae';
import { Rem } from '../../../general/modelos/rem';
import { Tae } from '../../../general/modelos/tae';
import { Tem } from '../../../general/modelos/tem';
import { Mun } from '../../../general/modelos/mun';
import { NaeService } from '../../../general/servicios/nae.service';
import { RemService } from '../../../general/servicios/rem.service';
import { TaeService } from '../../../general/servicios/tae.service';
import { TemService } from '../../../general/servicios/tem.service';
import { MunService } from '../../../general/servicios/mun.service';
import { Http } from '@angular/http/src/http';
declare var $: any;
declare var ace: any;
declare var bootbox: any;
// var $ = require('jquery');
// import $ from 'jquery';
// import * as $ from 'jquery';
// import * as dt from 'datatables.net';

@Component({
  selector: 'app-empl',
  templateUrl: './empl.component.html',
  styleUrls: ['./empl.component.css']
})
export class EmplComponent implements OnInit {
  public cargando = false;


  constructor(
    private _helper: Helper,
    private _emplService: EmplService,
    private _tidService: TidService,
    private _naeService: NaeService,
    private _remService: RemService,
    private _taeService: TaeService,
    private _temService: TemService,
    private _munService: MunService,
  ) {
  }

  // #region Métodos de obtención y establecimiento de valores

  private _empl: Empl = new Empl();
  public get empl(): Empl {
    // this._empl.Telefono = this._empl.Telefono.replace('-', '').replace(' ', '').replace('(', '').replace(')', '');
    return this._empl;
  }
  public set empl(v: Empl) {
    this._empl = v;
  }

  private _empls: Empl[] = [];
  public get empls(): Empl[] {
    return this._empls;
  }
  public set empls(v: Empl[]) {
    this._empls = v;
  }

  private _tids: Tid[] = [];
  public get tids(): Tid[] {
    return this._tids;
  }
  public set tids(v: Tid[]) {
    this._tids = v;
  }

  private _naes: Nae[] = [];
  public get naes(): Nae[] {
    return this._naes;
  }
  public set naes(v: Nae[]) {
    this._naes = v;
  }

  private _rems: Rem[] = [];
  public get rems(): Rem[] {
    return this._rems;
  }
  public set rems(v: Rem[]) {
    this._rems = v;
  }

  private _taes: Tae[] = [];
  public get taes(): Tae[] {
    return this._taes;
  }
  public set taes(v: Tae[]) {
    this._taes = v;
  }


  private _tems: Tem[] = [];
  public get tems(): Tem[] {
    return this._tems;
  }
  public set tems(v: Tem[]) {
    this._tems = v;
  }

  private _editar = false;
  public get editar(): boolean {
    return this._editar;
  }
  public set editar(v: boolean) {
    this._editar = v;
  }

  private _muns: Mun[] = [];
  public get muns(): Mun[] {
    return this._muns;
  }
  public set muns(v: Mun[]) {
    this._muns = v;
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
  someClickHandler(_empl: any): void {
    // console.log(_empl);
    this._emplService.registro(_empl.TipoID, _empl.NumeroIdentificacion).subscribe(empls => {
      empls.forEach(empl => {
        this.empl = empl;
      });
      if (empls.length > 0) {
        this.editar = true;
      }
    });
  }
  // #endregion

  ngOnInit() {
    this.refrescarEmpleadores();
    // this.dtTrigger.next();

    this.cargar();


    // #region Datatable
    // // initiate dataTables plugin
    // const myTable =
    //   $('#dynamic-table')
    //     // .wrap('<div class='dataTables_borderWrap' />')   //if you are applying horizontal scrolling (sScrollX)
    //     .DataTable({
    //       bAutoWidth: false,
    //       'aoColumns': [
    //         { 'bSortable': false },
    //         null, null, null, null, null,
    //         { 'bSortable': false }
    //       ],
    //       'aaSorting': [],
    //       'language': {
    //         'lengthMenu': 'Mostrar _MENU_ registros por página',
    //         'zeroRecords': 'Nada encontrado - vuelve a intentar con otro filtro',
    //         'info': 'Mostrando página _PAGE_ de _PAGES_',
    //         'infoEmpty': 'No hay registros disponibles',
    //         'infoFiltered': '(filtrado de _MAX_ registros en total)',
    //         'search': 'Filtrar registros:',
    //         'paginate': {
    //           'previous': 'Anterior',
    //           'next': 'Siguiente'
    //         }
    //       },

    //       // 'bProcessing': true,
    //       // 'bServerSide': true,
    //       // 'sAjaxSource': 'http://127.0.0.1/table.php'	,

    //       // ,
    //       // 'sScrollY': '200px',
    //       // 'bPaginate': false,

    //       // 'sScrollX': '100%',
    //       // 'sScrollXInner': '120%',
    //       // 'bScrollCollapse': true,
    //       // Note: if you are applying horizontal scrolling (sScrollX) on a '.table-bordered'
    //       // you may want to wrap the table inside a 'div.dataTables_borderWrap' element

    //       // 'iDisplayLength': 50


    //       select: {
    //         style: 'multi'
    //       }
    //     });



    // // in Ace demo ../components will be replaced by correct assets path
    // $.fn.dataTable.Buttons.swfPath = '../assets/components/datatables.net-buttons-swf/index.swf';
    // $.fn.dataTable.Buttons.defaults.dom.container.className = 'dt-buttons btn-overlap btn-group btn-overlap';

    // // tslint:disable-next-line:no-unused-expression
    // new $.fn.dataTable.Buttons(myTable, {
    //   buttons: [
    //     {
    //       'extend': 'colvis',
    //       'text': '<i class="fa fa-search bigger-110 blue"></i> <span class="hidden">Mostrar/ocultar columnas</span>',
    //       'className': 'btn btn-white btn-primary btn-bold',
    //       columns: ':not(:first):not(:last)'
    //     },
    //     {
    //       'extend': 'copy',
    //       'text': '<i class="fa fa-copy bigger-110 pink"></i> <span class="hidden">Copiar al portapapeles</span>',
    //       'className': 'btn btn-white btn-primary btn-bold'
    //     },
    //     {
    //       'extend': 'csv',
    //       'text': '<i class="fa fa-database bigger-110 orange"></i> <span class="hidden">Exportar a CSV</span>',
    //       'className': 'btn btn-white btn-primary btn-bold'
    //     },
    //     {
    //       'extend': 'excel',
    //       'text': '<i class="fa fa-file-excel-o bigger-110 green"></i> <span class="hidden">Export to Excel</span>',
    //       'className': 'btn btn-white btn-primary btn-bold'
    //     },
    //     {
    //       'extend': 'pdf',
    //       'text': '<i class="fa fa-file-pdf-o bigger-110 red"></i> <span class="hidden">Exportar a PDF</span>',
    //       'className': 'btn btn-white btn-primary btn-bold'
    //     },
    //     {
    //       'extend': 'print',
    //       'text': '<i class="fa fa-print bigger-110 grey"></i> <span class="hidden">Imprimir</span>',
    //       'className': 'btn btn-white btn-primary btn-bold',
    //       autoPrint: false,
    //       // title:'Pruebas'
    //       // message: 'This print was produced using the Print button for DataTables'
    //     }
    //   ]
    // });
    // myTable.buttons().container().appendTo($('.tableTools-container'));

    // // style the message box
    // const defaultCopyAction = myTable.button(1).action();
    // myTable.button(1).action(function (e, dt, button, config) {
    //   defaultCopyAction(e, dt, button, config);
    //   $('.dt-button-info').addClass('gritter-item-wrapper gritter-info gritter-center white');
    // });


    // const defaultColvisAction = myTable.button(0).action();
    // myTable.button(0).action(function (e, dt, button, config) {

    //   defaultColvisAction(e, dt, button, config);


    //   if ($('.dt-button-collection > .dropdown-menu').length === 0) {
    //     $('.dt-button-collection')
    //       .wrapInner('<ul class="dropdown - menu dropdown - light dropdown - caret dropdown - caret" />')
    //       .find('a').attr('href', '#').wrap('<li />');
    //   }
    //   $('.dt-button-collection').appendTo('.tableTools-container .dt-buttons');
    // });

    // ////

    // setTimeout(function () {
    //   $($('.tableTools-container')).find('a.dt-button').each(function () {
    //     const div = $(this).find(' > div').first();
    //     if (div.length === 1) {
    //       div.tooltip({ container: 'body', title: div.parent().text() });
    //     } else { $(this).tooltip({ container: 'body', title: $(this).text() }); }
    //   });
    // }, 500);


    // myTable.on('select', function (e, dt, type, index) {
    //   if (type === 'row') {
    //     $(myTable.row(index).node()).find('input:checkbox').prop('checked', true);
    //   }
    // });
    // myTable.on('deselect', function (e, dt, type, index) {
    //   if (type === 'row') {
    //     $(myTable.row(index).node()).find('input:checkbox').prop('checked', false);
    //   }
    // });

    // /////////////////////////////////
    // // table checkboxes
    // $('th input[type=checkbox], td input[type=checkbox]').prop('checked', false);

    // // select/deselect all rows according to table header checkbox
    // $('#dynamic-table > thead > tr > th input[type=checkbox],
    // #dynamic-table_wrapper input[type=checkbox]').eq(0).on('click', function () {
    //   const th_checked = this.checked; // checkbox inside 'TH' table header

    //   $('#dynamic-table').find('tbody > tr').each(function () {
    //     const row = this;
    //     if (th_checked) {
    //       myTable.row(row).select();
    //     } else { myTable.row(row).deselect(); }
    //   });
    // });

    // // select/deselect a row when the checkbox is checked/unchecked
    // $('#dynamic-table').on('click', 'td input[type=checkbox]', function () {
    //   const row = $(this).closest('tr').get(0);
    //   if (this.checked) {
    //     myTable.row(row).deselect();
    //   } else { myTable.row(row).select(); }
    // });



    // $(document).on('click', '#dynamic-table .dropdown-toggle', function (e) {
    //   e.stopImmediatePropagation();
    //   e.stopPropagation();
    //   e.preventDefault();
    // });



    // // And for the first simple table, which doesn't have TableTools or dataTables
    // // select/deselect all rows according to table header checkbox
    // const active_class = 'active';
    // $('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
    //   const th_checked = this.checked; // checkbox inside 'TH' table header

    //   $(this).closest('table').find('tbody > tr').each(function () {
    //     const row = this;
    //     if (th_checked) {
    //       $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
    //     } else { $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false); }
    //   });
    // });

    // // select/deselect a row when the checkbox is checked/unchecked
    // $('#simple-table').on('click', 'td input[type=checkbox]', function () {
    //   const $row = $(this).closest('tr');
    //   if ($row.is('.detail-row ')) { return; }
    //   if (this.checked) {
    //     $row.addClass(active_class);
    //   } else { $row.removeClass(active_class); }
    // });

    // /********************************/
    // // add tooltip for small view action buttons in dropdown menu
    // $('[data-rel="tooltip"]').tooltip({ placement: tooltip_placement });

    // // tooltip placement on right or left
    // function tooltip_placement(context, source) {
    //   const $source = $(source);
    //   const $parent = $source.closest('table');
    //   const off1 = $parent.offset();
    //   const w1 = $parent.width();

    //   const off2 = $source.offset();
    //   // var w2 = $source.width();
    //   let x: number;
    //   x = w1 / 2;
    //   // if (parseInt(off2.left) < parseInt(off1.left) + parseInt(w1 / 2)) { return 'right'; }
    //   if (parseInt(off2.left) < parseInt(off1.left) + x) { return 'right'; }
    //   return 'left';
    // }

    // /***************/
    // $('.show-details-btn').on('click', function (e) {
    //   e.preventDefault();
    //   $(this).closest('tr').next().toggleClass('open');
    //   $(this).find(ace.vars['.icon']).toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
    // });

    // /***************/
    // /**
    // //add horizontal scrollbars to a simple table
    // $('#simple-table').css({'width':'2000px', 'max-width': 'none'}).wrap('<div style='width: 1000px;' />').parent().ace_scroll(
    //   {
    //   horizontal: true,
    //   styleClass: 'scroll-top scroll-dark scroll-visible',//show the scrollbars on top(default is bottom)
    //   size: 2000,
    //   mouseWheelLock: true
    //   }
    // ).css('padding-top', '12px');
    // */

    // #endregion

    // #region Mascaras de texto en inputs
    $.mask.definitions['~'] = '[+-]';
    $('.input-mask-date').mask('99/99/9999');
    $('.input-mask-phone').mask('(999) 999-9999');
    $('.input-mask-eyescript').mask('~9.99 ~9.99 999');
    $('.input-mask-product').mask('a*-999-a999',
      { placeholder: ' ', completed: function () { alert('Escribiste lo siguiente: ' + this.val()); } }
    );
    // #endregion

    const me = this;
    $('#Telefono').change(function () {
      me.empl.Telefono = $('#Telefono').val();
    });

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
        // buttons: {
        //   copy: 'Copiar',
        //   print: 'Imprimir',
        //   csv: 'CSV'
        // }
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
      columns: [{
        title: 'Tipo',
        data: 'TipoID'
      }, {
        title: 'Identificación',
        data: 'NumeroIdentificacion'
      }, {
        title: 'Razón Social',
        data: 'RazonSocial'
      }, {
        title: 'Dirección Fiscal',
        data: 'DireccionFiscal'
      }, {
        title: 'Email',
        data: 'Email'
      }, {
        title: 'Teléfono',
        data: 'Telefono'
      }
      ],
      // Declare the use of the extension in the dom parameter
      // dom: 'Bfrtip',
      // Configure the buttons
      // buttons: [
      //   // 'columnsToggle',
      //   'colvis',
      //   'copy',
      //   'print',
      //   'excel',
      //   {
      //     text: 'Some button',
      //     key: '1',
      //     action: function (e, dt, node, config) {
      //       alert('Button activated');
      //     }
      //   }
      // ]
    };
  }


  // #region Zona de obtención de valores
  private cargar() {
    this.dbTid();
    this.dbNae();
    this.dbRem();
    this.dbTae();
    this.dbTem();
    this.dbMun();
  }

  dbTid(reload = false) {
    if (!reload) {
      this.tids = this._helper.GetLocalStorage('tid');
      if (this.tids.length <= 0) {
        reload = true;
      }
    }
    if (reload) {
      this.cargando = true;
      this._tidService.registros().subscribe(tids => {
        this.tids = tids;
        this.cargando = false;
        this._helper.SetLocalEstorage('tid', this.tids);
      });
    }
  }

  dbNae(reload = false) {
    if (!reload) {
      this.naes = this._helper.GetLocalStorage('nae');
      if (this.naes.length <= 0) {
        reload = true;
      }
    }
    if (reload) {
      this.cargando = true;
      this._naeService.registros().subscribe(naes => {
        this.naes = naes;
        this.cargando = false;
        this._helper.SetLocalEstorage('nae', this.naes);
      });
    }
  }

  dbRem(reload = false) {
    if (!reload) {
      this.rems = this._helper.GetLocalStorage('rem');
      if (this.rems.length <= 0) {
        reload = true;
      }
    }
    if (reload) {
      this.cargando = true;
      this._remService.registros().subscribe(rems => {
        this.rems = rems;
        this.cargando = false;
        this._helper.SetLocalEstorage('rem', this.rems);
      });
    }
  }

  dbTae(reload = false) {
    if (!reload) {
      this.taes = this._helper.GetLocalStorage('tae');
      if (this.taes.length <= 0) {
        reload = true;
      }
    }
    if (reload) {
      this.cargando = true;
      this._taeService.registros().subscribe(taes => {
        this.taes = taes;
        this.cargando = false;
        this._helper.SetLocalEstorage('tae', this.taes);
      });
    }
  }

  dbTem(reload = false) {
    if (!reload) {
      this.tems = this._helper.GetLocalStorage('tem');
      if (this.tems.length <= 0) {
        reload = true;
      }
    }
    if (reload) {
      this.cargando = true;
      this._temService.registros().subscribe(tems => {
        this.tems = tems;
        this.cargando = false;
        this._helper.SetLocalEstorage('tem', this.tems);
      });
    }
  }

  dbMun(reload = false) {
    if (!reload) {
      this.muns = this._helper.GetLocalStorage('mun');
      if (this.muns.length <= 0) {
        reload = true;
      }
    }
    if (reload) {
      this.cargando = true;
      this._munService.registros().subscribe(muns => {
        this.muns = muns;
        this.cargando = false;
        this._helper.SetLocalEstorage('mun', this.muns);
      });
    }
  }

  // #endregion

  public consultarEmpleador2() {
    const TipoID = this.empl.TipoID;
    const NumeroIdentificacion = this.empl.NumeroIdentificacion;
    // console.log('TipoID: ', TipoID);
    // console.log('NumeroIdentificacion: ', NumeroIdentificacion);
    if (TipoID === '' || NumeroIdentificacion === '') { return; }
    // console.log(this.empl);
    this.cargando = true;
    this.editar = false;
    // this.empl = new Empl(TipoID, NumeroIdentificacion, '', '', '', '', '', '', '', '', '', '', '', null);
    // this.empl = new Empl();
    this._emplService.registro(this.empl.TipoID, this.empl.NumeroIdentificacion).subscribe(empls => {
      empls.forEach(empl => {
        this.empl = empl;
      });
      if (this.empl.RazonSocial !== '') { this.editar = true; }
      this.cargando = false;
      // console.log(this.empl);
    });
  }

  public consultarEmpleador() {
    if (this.empl.TipoID === '' || this.empl.NumeroIdentificacion === '') { return; }
    this._emplService.registro(this.empl.TipoID, this.empl.NumeroIdentificacion).subscribe(empls => {
      this.empls.forEach(empl => {
        this.empl = empl;
        this.editar = true;
      });
    });
  }

  refrescarEmpleadores() {
    this.cargando = true;
    this._emplService.registros().subscribe(empls => {
      this.empls = empls;
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

  cancelar() {
    this.editar = false;
    this.empl = new Empl();
  }

  aceptar() {
    // console.log(this.editar);
    // console.log(this.empl);
    this.empl.Telefono = this.empl.Telefono.replace('-', '').replace(' ', '').replace('(', '').replace(')', '');
    if (!this.editar) {
      this._emplService.nuevoRegistro(this.empl).subscribe(exito => {
        if (exito) {
          this.empl = new Empl();
          this._helper.Notificacion('Registro agregado a la tabla');
          this.refrescarEmpleadores();
        } else {
          let msj = 'El registro no ha podido ser agregado en la base de datos. ';
          msj += 'Si el problema persiste, contacta por favor al departamento de tecnología.';
          this._helper.Notificacion(msj, 'error', '', false);
        }
      });
    } else {
      this._emplService.actualizarRegistro(this.empl).subscribe(exito => {
        if (exito) {
          this._helper.Notificacion('Registro actualizado');
          this.refrescarEmpleadores();
        } else {
          let msj = 'El registro no ha podido ser actualizado en la base de datos. ';
          msj += 'Si el problema persiste, contacta por favor al departamento de tecnología.';
          this._helper.Notificacion(msj, 'error', '', false);
        }
      });
    }
  }

  borrar() {
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
                this.cargando = true;
                me._emplService.eliminarRegistro(me.empl.TipoID, me.empl.NumeroIdentificacion).subscribe(eliminado => {
                  if (eliminado) {
                    this.editar = false;
                    this.empl = new Empl();
                    me.refrescarEmpleadores();
                    me._helper.Notificacion('Registro Borrado');
                  } else {
                    // tslint:disable-next-line:max-line-length
                    me._helper.Notificacion('El registro no ha ha podido ser borrado. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
                  }
                  this.cargando = false;
                });
              }
            }
        }
    });
  }

  setDireccion(event): void {
    const me = this;
    me.empl.DireccionFiscal = event.direccion;
  }

  formatNombre() {
    this.empl.RazonSocial = this._helper.Capitalizar(this.empl.RazonSocial);
  }
}
