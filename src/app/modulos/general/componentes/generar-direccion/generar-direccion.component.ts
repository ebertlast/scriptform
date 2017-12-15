import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Helper } from '../../../../app-helper';
import { Direccion } from '../../modelos/direccion';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
declare var $: any;
@Component({
  selector: 'app-generar-direccion',
  templateUrl: './generar-direccion.component.html',
  styleUrls: ['./generar-direccion.component.css']
})
export class GenerarDireccionComponent implements OnInit, AfterViewInit {
  @Input() desplegado = false;
  @Input() divid = 'widget-container-col-1';
  @Output() EnviarDireccion = new EventEmitter();
  public btnminimizar = '';
  public div: any;
  //#region Direccion
  private _direccion = '';
  public get direccion(): string {
    return this._direccion;
  }
  public set direccion(v: string) {
    this._direccion = v;
  }
  //#endregion
  //#region Dirección Complementaria
  private _direccionComp = '';
  public get direccionComp(): string {
    return this._direccionComp;
  }
  public set direccionComp(v: string) {
    this._direccionComp = v;
  }
  //#endregion
  //#region Direccion Auxiliar
  private _direccionAux: Direccion = new Direccion();
  public get direccionAux(): Direccion {
    // this._direccionAux.Numero = this._direccionAux.Numero.replace(/[^\d]/, '');
    this.construirDireccion();
    // this.direccion += this.direccionComp;

    return this._direccionAux;
  }
  public set direccionAux(v: Direccion) {
    this._direccionAux = v;
  }

  //#endregion
  private construirDireccion() {
    this.direccion = this._direccionAux.TipoViaPrincipal + (this._direccionAux.TipoViaPrincipal === '' ? '' : ' ');
    this.direccion += this._direccionAux.NumeroViaPrincipal + (this._direccionAux.NumeroViaPrincipal === '' ? '' : ' ');
    this.direccion += this._direccionAux.LetraViaPrincipal + (this._direccionAux.LetraViaPrincipal === '' ? '' : ' ');
    this.direccion += this._direccionAux.Bis + (this._direccionAux.Bis === '' ? '' : ' ');
    this.direccion += this._direccionAux.LetraBis + (this._direccionAux.LetraBis === '' ? '' : ' ');
    this.direccion += this._direccionAux.CuadranteViaPrincipal + (this._direccionAux.CuadranteViaPrincipal === '' ? '' : ' ');
    this.direccion += this._direccionAux.NumeroViaSecundaria + (this._direccionAux.NumeroViaSecundaria === '' ? '' : ' ');
    this.direccion += this._direccionAux.LetraViaSecundaria + (this._direccionAux.LetraViaSecundaria === '' ? '' : ' ');
    this.direccion += this._direccionAux.NumeroPlaca + (this._direccionAux.NumeroPlaca === '' ? '' : ' ');
    this.direccion += this._direccionAux.CuadranteViaSecundaria + (this._direccionAux.CuadranteViaSecundaria === '' ? '' : ' ');
    this.direccion += this._direccionComp.toUpperCase(); // + (this._direccionAux.TipoViaPrincipal === '' ? '' : ' ');
    // this.direccion.replace('  ', ' '); // .trim();
  }
  constructor(
    private _helper: Helper
  ) { }

  ngOnInit() {
    const me = this;
    $('[id^=Numero]').keypress(me._helper.SoloNumeros);
    $('[id^=Cuadrante]').keypress(me._helper.SoloNumeros);
    this.btnminimizar = (Math.floor(Math.random() * 999999)).toString();
  }
  ngAfterViewInit() {
    this.div = $('#' + this.divid);
  }
  sendDireccion(event) {
    this.direccion =
      this.direccion
        // .trim()
        // .replace(' ', '*')
        // .replace('**', '*')
        // .replace('**', '*')
        // .replace('*', ' ')
        .trim();
    // console.log(this.direccion);
    this.EnviarDireccion.emit({ direccion: this.direccion });
    // this.desplegado = false;
    $('#' + this.btnminimizar).click();
  }
  agregarComplemento(): void {
    const componenteComplemento = this.div.find('#componenteComplemento').val();
    const valorComplemento = this.div.find('#valorComplemento').val();
    if (componenteComplemento === '') {
      this.div.find('#componenteComplemento').focus();
      return;
    }
    if (valorComplemento === '') {
      this.div.find('#valorComplemento').focus();
      return;
    }
    this.direccionComp += componenteComplemento + ' ' + valorComplemento + ' ';
    this.div.find('#componenteComplemento').val('');
    this.div.find('#valorComplemento').val('');
    // console.log(this.direccionComp);
    this.construirDireccion();
    // this.direccionAuxComp = '';
    this.div.find('#componenteComplemento').focus();
  }
  public limpiarDireccion() {
    this.direccionComp = '';
    this.direccion = '';
    this.direccionAux = new Direccion();
  }
}

class DireccionDEPRECATED {
  constructor(
    /**
     * 1.- Tipo de Vía
     */
    public TipoViaPrincipal: string = '',
    /**
     * 2.- Nombre o número de vía
     */
    public NumeroViaPrincipal: string = '',
    /**
     * 3.- Letra vía principal
     */
    public LetraViaPrincipal: string = '',
    /**
     * 4.- Bis
     */
    public Bis: string = '',
    /**
     * 5.- Letra Bis
     */
    public LetraBis: string = '',
    /**
     * 6.- Prefijo o Cuadrante
     */
    public CuadranteViaPrincipal: string = '',
    /**
     * 7.- Número vía secundaria
     */
    public NumeroViaSecundaria: string = '',
    /**
     * 8.- Letra vía Secundaria
     */
    public LetraViaSecundaria: string = '',
    /**
     * 9.- Número de Placa
     */
    public NumeroPlaca: string = '',
    /**
     * 10.- Cuadrante Vía Secundaria
     */
    public CuadranteViaSecundaria: string = '',
    /**
     * 11.- Direccion Complementaria
     */
    public DireccionComplementaria: string = '',
  ) { }
}
