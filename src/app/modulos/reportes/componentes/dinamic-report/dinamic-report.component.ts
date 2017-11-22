import { Component, OnInit } from '@angular/core';
import { Rep } from '../../modelos/rep';
import { Repp } from '../../modelos/repp';
import { RepService } from '../../servicios/rep.service';
import { ReppService } from '../../servicios/repp.service';
import { Helper } from '../../../../app-helper';
declare var $: any;
declare var jQuery: any;
declare var ace: any;
@Component({
  selector: 'app-dinamic-report',
  templateUrl: './dinamic-report.component.html',
  styleUrls: ['./dinamic-report.component.css']
})
export class DinamicReportComponent implements OnInit {
  constructor(private _repService: RepService, private _reppService: ReppService, private _helper: Helper) { }
  private btnEjecutarConsulta: any;

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
    this.getParametros();
  }


  private _parametros: Repp[] = [];
  public get parametros(): Repp[] {
    return this._parametros;
  }
  public set parametros(v: Repp[]) {
    this._parametros = v;
  }


  private _paginador: Paginador = new Paginador();
  public get paginador(): Paginador {
    if (!this._paginador) { this._paginador = new Paginador(); }
    this._paginador.ultimaPagina = this._paginador.totalPaginas;
    // console.log(this._paginador);
    return this._paginador;
  }
  public set paginador(v: Paginador) {
    this._paginador = v;
  }


  private _data: any[];
  public get data(): any[] {
    if (!this._data) { this._data = []; }
    return this._data;
  }
  public set data(v: any[]) {
    this._data = v;
  }


  private _columnas: string[] = [];
  public get columnas(): string[] {
    if (!this._columnas) { this._columnas = []; }
    return this._columnas;
  }
  public set columnas(v: string[]) {
    this._columnas = v;
  }


  private _consultaParametros: ConsultaParametro[];
  public get consultaParametros(): ConsultaParametro[] {
    return this._consultaParametros;
  }
  public set consultaParametros(v: ConsultaParametro[]) {
    this._consultaParametros = v;
  }



  ngOnInit() {
    this._repService.reportesDisponibles().subscribe(reportes => {
      this.reportes = reportes;
      // console.log((this.reportes));
    });



    this.btnEjecutarConsulta = $('#btnEjecutarConsulta');

    // And for the first simple table, which doesn't have TableTools or dataTables
    // select/deselect all rows according to table header checkbox
    var active_class = 'active';
    $('#simple-table > thead > tr > th input[type=checkbox]').eq(0).on('click', function () {
      var th_checked = this.checked;//checkbox inside "TH" table header

      $(this).closest('table').find('tbody > tr').each(function () {
        var row = this;
        if (th_checked) $(row).addClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', true);
        else $(row).removeClass(active_class).find('input[type=checkbox]').eq(0).prop('checked', false);
      });
    });


    // select/deselect a row when the checkbox is checked/unchecked
    $('#simple-table').on('click', 'td input[type=checkbox]', function () {
      var $row = $(this).closest('tr');
      if ($row.is('.detail-row ')) return;
      if (this.checked) $row.addClass(active_class);
      else $row.removeClass(active_class);
    });

    // add horizontal scrollbars to a simple table
    $('#simple-table').css({ 'width': '2000px', 'max-width': 'none' }).wrap('<div style="padding-right: 0px;" />').parent().ace_scroll(
      {
        horizontal: true,
        styleClass: 'scroll-top scroll-dark scroll-visible',//show the scrollbars on top(default is bottom)
        size: 2000,
        mouseWheelLock: true
      }
    ).css('padding-top', '12px');


    // Para la ventana Modal
    jQuery(function ($) {
      $('.modal.aside').ace_aside();

      $('#aside-inside-modal').addClass('aside').ace_aside({ container: '#my-modal > .modal-dialog' });

      //$('#top-menu').modal('show')

      $(document).one('ajaxloadstart.page', function (e) {
        //in ajax mode, remove before leaving page
        $('.modal.aside').remove();
        $(window).off('.aside')
      });

      //make content sliders resizable using jQuery UI (you should include jquery ui files)
      //$('#right-menu > .modal-dialog').resizable({handles: "w", grid: [ 20, 0 ], minWidth: 200, maxWidth: 600});
    });

    //datepicker plugin
    //link
    $('.date-picker').datepicker({
      autoclose: true,
      todayHighlight: true,
      language: 'es'
    })
      //show datepicker when clicking on the icon
      .next().on(ace.click_event, function () {
        $(this).prev().focus();
      });

    $('.date-picker').click(function () {
      var popup = $(this).offset();
      var popupTop = popup.top - 40;
      $('.ui-datepicker').css({
        'top': popupTop
      });
    });

    //or change it into a date range picker
    $('.input-daterange').datepicker({ autoclose: true });
    // $.datepicker.setDefaults($.datepicker.regional['es']);

    $.mask.definitions['~'] = '[+-]';
    $('.input-mask-date').mask('99/99/9999');
    $('.input-mask-phone').mask('(999) 999-9999');
    $('.input-mask-eyescript').mask('~9.99 ~9.99 999');
    $(".input-mask-product").mask("a*-999-a999", { placeholder: " ", completed: function () { alert("You typed the following: " + this.val()); } });

    $('#spinner1').ace_spinner({ value: 0, min: 0, max: 200, step: 10, btn_up_class: 'btn-info', btn_down_class: 'btn-info' })
      .closest('.ace-spinner')
      .on('changed.fu.spinbox', function () {
        //console.log($('#spinner1').val())
      });
    //$('#spinner1').ace_spinner('disable').ace_spinner('value', 11);
    //or
    //$('#spinner1').closest('.ace-spinner').spinner('disable').spinner('enable').spinner('value', 11);//disable, enable or change value
    //$('#spinner1').closest('.ace-spinner').spinner('value', 0);//reset to 0


  }

  getConsultaParametro(parametroid: string) {
    this._reppService.geConsulta(this.reporte.REPORTEID, parametroid).subscribe(datos => {
      // console.log(datos);
      datos.forEach(element => {
        var array = $.map(element, function (value, index) {
          return [value];
        });
        this.consultaParametros.push(new ConsultaParametro(parametroid, array[0], array[1]));

        // console.log(array);
      });
    });
    // console.log(this.consultaParametros);
  }

  getParametros() {
    this.parametros = [];
    this.consultaParametros = [];
    // console.log(this.reporte);
    if (this.reporte.REPORTEID !== '') {
      this._reppService.parametros(this.reporte.REPORTEID).subscribe(parametros => {
        this.parametros = parametros;
        // console.log(this.parametros);

        this.parametros.forEach(parametro => {
          if (parametro.UTILIZAQUERY !== '') {
            this.getConsultaParametro(parametro.PARAMETROID);
          }
        });
      });

      // console.log(this.consultaParametros);
    }
  }

  ejecutarConsulta() {
    // console.log(this.paginador);
    this.data = [];
    const _me = this;
    this.btnEjecutarConsulta.button('loading');
    this._repService.ejecutarReporte(this.reporte.REPORTEID, this.paginador.filasPorPagina, this.paginador.paginaActual).subscribe(
      respuesta => {
        this.data = respuesta['data'];
        this.paginador.totalPaginas = respuesta['totalpaginas'];

        // console.log(this.data);
        // console.log(this.paginador.totalPaginas);
        this.columnas = [];
        for (var i = 0; i < 1; i++) {
          for (let key in this.data[i]) {
            // console.log(key + " :: " + this.data[i][key]);
            // console.log(key);
            this.columnas.push(key);
          }
        }
        // console.log(this.columnas);
        _me.btnEjecutarConsulta.button('reset');



      }
    );
    // this.paginador.paginaActual = 1000;
    // console.log(this.paginador)
    // setTimeout(function () {
    // _me.btnEjecutarConsulta.button('reset');
    // }, 5000);
  }

  setPagina(pagina: number) {
    this.paginador.paginaActual = pagina;
    // console.log(this.paginador);
    this.ejecutarConsulta();
    return false;
  }

  onChangeFilasPorPagina($event) {
    this.paginador.paginaActual = 1;
    this.ejecutarConsulta();
  }

  onChangeValoresParametros(parametroid: string, valor: string) {
    this._reppService.actualizarValor(this.reporte.REPORTEID, parametroid, valor).subscribe(actualizado => {
      if (actualizado) {
        this._helper.Notificacion('Valor de filtro actualizado en la base de datos');
      } else {
        this._helper.Notificacion('El filtro no ha podido ser actualizado en la base de datos. Si el problema persiste, contacta por favor al departamento de tecnología', 'error', '', false);
      }
    })
    // console.log(this.reporte.REPORTEID+'.- '+parametroid+': '+valor);
  }
}

export class Paginador {
  constructor(
    public filasPorPagina: number = 10,
    public totalPaginas: number = 0,
    public paginaActual: number = 1,
    public primeraPagina: number = 1,
    public ultimaPagina: number = 1
  ) { }
}

class ConsultaParametro {
  constructor(
    public parametroid: string = '',
    public columna1: string = '',
    public columna2: string = ''
  ) { }
}
