import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NovService } from '../../../general/servicios/nov.service';
import { Nov } from '../../../general/modelos/nov';
import { Formulario } from '../../modelos/formulario';
import { TidService } from '../../../general/servicios/tid.service';
import { Tid } from '../../../general/modelos/tid';
import { GenService } from '../../../general/servicios/gen.service';
import { Gen } from '../../../general/modelos/gen';
import { TgenService } from '../../../general/servicios/tgen.service';
import { GpoService } from '../../../general/servicios/gpo.service';
import { Gpo } from '../../../general/modelos/gpo';
import { GdiService } from '../../../general/servicios/gdi.service';
import { TdiService } from '../../../general/servicios/tdi.service';
import { Tdi } from '../../../general/modelos/tdi';
import { Gdi } from '../../../general/modelos/gdi';
import { Tgen } from '../../../general/modelos/tgen';
import { Helper } from '../../../../app-helper';
import { MunService } from '../../../general/servicios/mun.service';
import { Mun } from '../../../general/modelos/mun';
import { ZonService } from '../../../general/servicios/zon.service';
import { Zon } from '../../../general/modelos/zon';
import { EmplService } from '../../../general/servicios/empl.service';
import { Empl } from '../../../general/modelos/empl';
declare var $: any;
@Component({
  selector: 'app-afiliaciones-novedades',
  templateUrl: './afiliaciones-novedades.component.html',
  styleUrls: ['./afiliaciones-novedades.component.css']
})
export class AfiliacionesNovedadesComponent implements OnInit, AfterViewInit {
  public cargando = false;
  constructor(
    private _novService: NovService,
    private _tidService: TidService,
    private _genService: GenService,
    private _tgenService: TgenService,
    private _gpoService: GpoService,
    private _gdiService: GdiService,
    private _tdiService: TdiService,
    private _helper: Helper,
    private _munService: MunService,
    private _zonService: ZonService,
    private _emplService: EmplService,
  ) { }

  // #region Métodos de obtención y establecimiento de valores
  private _novedades: Nov[] = [];
  public get novedades(): Nov[] {
    return this._novedades;
  }
  public set novedades(v: Nov[]) {
    this._novedades = v;
  }

  private _novedad: Nov = new Nov();
  public get novedad(): Nov {
    return this._novedad;
  }
  public set novedad(v: Nov) {
    this._novedad = v;
  }

  private _formulario: Formulario = new Formulario();
  public get formulario(): Formulario {
    if (!this._formulario) { this._formulario = new Formulario(); }
    if (this._formulario.TipoDiscapacidad === '') { this._formulario.GradoDiscapacidad = ''; }
    return this._formulario;
  }
  public set formulario(v: Formulario) {
    this._formulario = v;
  }

  private _tiposDocumentos: Tid[] = [];
  public get tiposDocumentos(): Tid[] {
    return this._tiposDocumentos;
  }
  public set tiposDocumentos(v: Tid[]) {
    this._tiposDocumentos = v;
  }


  private _generos: Gen[] = [];
  public get generos(): Gen[] {
    return this._generos;
  }
  public set generos(v: Gen[]) {
    this._generos = v;
  }

  private _etnias: Tgen[] = [];
  public get etnias(): Tgen[] {
    return this._etnias;
  }
  public set etnias(v: Tgen[]) {
    this._etnias = v;
  }

  private _poblacionEspecial: Tgen[] = [];
  public get poblacionEspecial(): Tgen[] {
    return this._poblacionEspecial;
  }
  public set poblacionEspecial(v: Tgen[]) {
    this._poblacionEspecial = v;
  }

  private _gruposPoblacionales: Gpo[] = [];
  public get gruposPoblacionales(): Gpo[] {
    return this._gruposPoblacionales;
  }
  public set gruposPoblacionales(v: Gpo[]) {
    this._gruposPoblacionales = v;
  }

  private _tiposDiscapacidades: Tdi[] = [];
  public get tiposDiscapacidades(): Tdi[] {
    return this._tiposDiscapacidades;
  }
  public set tiposDiscapacidades(v: Tdi[]) {
    this._tiposDiscapacidades = v;
  }

  private _gradosDiscapacidades: Gdi[] = [];
  public get gradosDiscapacidades(): Gdi[] {
    return this._gradosDiscapacidades;
  }
  public set gradosDiscapacidades(v: Gdi[]) {
    this._gradosDiscapacidades = v;
  }

  private _municipios: Mun[] = [];
  public get municipios(): Mun[] {
    return this._municipios;
  }
  public set municipios(v: Mun[]) {
    this._municipios = v;
  }

  private _zonas: Zon[] = [];
  public get zonas(): Zon[] {
    return this._zonas;
  }
  public set zonas(v: Zon[]) {
    this._zonas = v;
  }

  private _empls: Empl[] = [];
  public get empls(): Empl[] {
    return this._empls;
  }
  public set empls(v: Empl[]) {
    this._empls = v;
  }

  // #endregion

  private autoGuardado() {
    let formulario = JSON.parse(localStorage.getItem('formulario'))['formulario'];
    const a = JSON.stringify({ formulario });
    formulario = this.formulario;
    const b = JSON.stringify({ formulario });
    const _me = this;
    if (a === b) {
    } else {
      // console.log('Guardar Formulario');
      localStorage.setItem('formulario', JSON.stringify({ formulario: this.formulario }));
      this._helper.Notificacion('Autoguardado');
    }
    setTimeout(function () {
      _me.autoGuardado();
    }, 10000);

  }

  ngOnInit() {
    const me = this;
    this.cargando = true;
    this._novService.novedades().subscribe(novedades => {
      this.novedades = novedades;
      this._tidService.tiposIdentificacion().subscribe(tiposDocumentos => {
        this.tiposDocumentos = tiposDocumentos;
        this._genService.registros().subscribe(generos => {
          this.generos = generos;
          this._tgenService.registros('GENERAL', 'GRUPOETNICO').subscribe(etnias => {
            this.etnias = etnias;
            this._tgenService.registros('GENERAL', 'GRUPOPOBESPECIAL').subscribe(poblacionEspecial => {
              this.poblacionEspecial = poblacionEspecial;
              this._gdiService.registros().subscribe(gradosDiscapacidades => {
                this.gradosDiscapacidades = gradosDiscapacidades;
                this._tdiService.registros().subscribe(tiposDiscapacidades => {
                  this.tiposDiscapacidades = tiposDiscapacidades;
                  this._gpoService.registros().subscribe(gruposPoblacionales => {
                    this.gruposPoblacionales = gruposPoblacionales;
                    this._munService.municipios().subscribe(municipios => {
                      this.municipios = municipios;
                      this._zonService.registros().subscribe(zonas => {
                        this.zonas = zonas;
                        this._emplService.registros().subscribe(empls => {
                          this.empls = empls;
                          console.log(this.empls);
                          this.cargando = false;
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

    $('input[name^="TipoTramite"]').focus();

    $.mask.definitions['~'] = '[+-]';
    $('.input-mask-date').mask('99/99/9999');
    $('.input-mask-phone').mask('(999) 999-9999');
    $('.input-mask-eyescript').mask('~9.99 ~9.99 999');
    $('.input-mask-product').mask('a*-999-a999',
      { placeholder: ' ', completed: function () { alert('Escribiste lo siguiente: ' + this.val()); } }
    );
    // $('.input-mask-email').mask('999.999.999.999.999,99', {reverse: true});

    $('#FechaNacimiento').change(function () {
      me.formulario.FechaNacimiento = $('#FechaNacimiento').val();
      me.refrescarFormulario();
    });

    // #region Ventanas Modales
    // $('.modal.aside').ace_aside();
    // $('#aside-inside-modal').addClass('aside').ace_aside({ container: '#my-modal > .modal-dialog' });

    // // $('#top-menu').modal('show')
    // $(document).one('ajaxloadstart.page', function (e) {
    //   // in ajax mode, remove before leaving page
    //   $('.modal.aside').remove();
    //   $(window).off('.aside');
    // });

    // make content sliders resizable using jQuery UI (you should include jquery ui files)
    // $('#right-menu > .modal-dialog').resizable({handles: "w", grid: [ 20, 0 ], minWidth: 200, maxWidth: 600});

    // $('#modal-formConyugue > .modal-dialog').resizable({ handles: 'w', grid: [20, 0], minWidth: 200, maxWidth: 600 });

    // #endregion
    if (!localStorage.getItem('formulario')) {
      this.formulario = new Formulario();
    } else {
      this.formulario = JSON.parse(localStorage.getItem('formulario'))['formulario'];
      // console.log(this.formulario.Conyugue);
      // console.log(this.formulario.Beneficiarios);
    }
  }

  ngAfterViewInit() {
    this.autoGuardado();
  }


  refrescarFormulario() {
    this.formulario.PrimerApellido = this._helper.Capitalizar(this.formulario.PrimerApellido);
    this.formulario.SegundoApellido = this._helper.Capitalizar(this.formulario.SegundoApellido);
    this.formulario.PrimerNombre = this._helper.Capitalizar(this.formulario.PrimerNombre);
    this.formulario.SegundoNombre = this._helper.Capitalizar(this.formulario.SegundoNombre);
    if (!this._helper.EmailValido(this.formulario.CorreoElectronico)) {
      this.formulario.CorreoElectronico = '';
    }
    // localStorage.setItem('formulario', JSON.stringify({ formulario: this.formulario }));
    // const formulario = JSON.parse(localStorage.getItem('formulario'))['formulario'];
    // console.log(formulario);
  }

  setDireccion(event): void {
    const me = this;
    me.formulario.Direccion = event.direccion;
    me.refrescarFormulario();
    // console.log(event);
    // alert(event.direccion);
  }

  lanzarVentanaConyugue() {
    // $('#modal-formConyugue').modal('show');
    $('#modal-formConyugue').modal(
      { dialogClass: 'someStyle' }
    );
    // $('#modal-formConyugue').jqm({
    //   onHide: function (hash) {
    //     hash.w.fadeOut('2000', function () { hash.o.remove(); });
    //   }
    // }).show();

  }
  lanzarVentanaBeneficiarios() {
    $('#modal-formBeneficiarios').modal(
      { dialogClass: 'someStyle' }
    );
  }

  setConyugue(event) {
    // console.log(event.afiliado);
    this.formulario.Conyugue = event.afiliado;
    this.refrescarFormulario();
  }

  addBeneficiario(event) {
    this.formulario.Beneficiarios.push(event.afiliado);
    // console.log(this.formulario.Beneficiarios);
    this.refrescarFormulario();
  }

  delBeneficiario(TipoId: string, NumeroIdentificacion: string) {
    let i = 0;
    this.formulario.Beneficiarios.forEach(ben => {
      if (ben.TipoId === TipoId && ben.NumeroIdentificacion === NumeroIdentificacion) {
        this.formulario.Beneficiarios.splice(i, 1);
      }
      i++;
    });
  }
}
