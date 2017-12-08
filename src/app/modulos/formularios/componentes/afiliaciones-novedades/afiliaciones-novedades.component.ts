import { Component, OnInit } from '@angular/core';
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
declare var $: any;
@Component({
  selector: 'app-afiliaciones-novedades',
  templateUrl: './afiliaciones-novedades.component.html',
  styleUrls: ['./afiliaciones-novedades.component.css']
})
export class AfiliacionesNovedadesComponent implements OnInit {
  public cargando = false;
  constructor(
    private _novService: NovService,
    private _tidService: TidService,
    private _genService: GenService,
    private _tgenService: TgenService,
    private _gpoService: GpoService,
    private _gdiService: GdiService,
    private _tdiService: TdiService,
  ) { }

  ngOnInit() {
    const me = this;
    this._novService.novedades().subscribe(novedades => { this.novedades = novedades; });
    this._tidService.tiposIdentificacion().subscribe(tiposDocumentos => { this.tiposDocumentos = tiposDocumentos; });
    this._genService.registros().subscribe(generos => { this.generos = generos; });
    this._tgenService.registros('GENERAL', 'GRUPOETNICO').subscribe(etnias => { this.etnias = etnias; });
    this._tgenService
      .registros('GENERAL', 'GRUPOPOBESPECIAL').subscribe(poblacionEspecial => { this.poblacionEspecial = poblacionEspecial; });
    this._gdiService.registros().subscribe(gradosDiscapacidades => { this.gradosDiscapacidades = gradosDiscapacidades; });
    this._tdiService.registros().subscribe(tiposDiscapacidades => { this.tiposDiscapacidades = tiposDiscapacidades; });
    this._gpoService.registros().subscribe(gruposPoblacionales => { this.gruposPoblacionales = gruposPoblacionales; });

    $('input[name^="TipoTramite"]').focus();

    $.mask.definitions['~'] = '[+-]';
    $('.input-mask-date').mask('99/99/9999');
    $('.input-mask-phone').mask('(999) 999-9999');
    $('.input-mask-eyescript').mask('~9.99 ~9.99 999');
    $('.input-mask-product').mask('a*-999-a999',
      { placeholder: ' ', completed: function () { alert('Escribiste lo siguiente: ' + this.val()); } }
    );

    $('#FechaNacimiento').change(function () {
      me.formulario.FechaNacimiento = $('#FechaNacimiento').val();
      me.refrescarFormulario();
    });

  }

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


  // #endregion

  refrescarFormulario() {
    console.log(this.formulario);
  }

  setDireccion(event): void {
    const me = this;
    me.formulario.Direccion = event.direccion;
    // console.log(event);
    // alert(event.direccion);
  }
}
