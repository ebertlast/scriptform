import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Helper } from '../../../../app-helper';
declare var $: any;
@Component({
  selector: 'app-generar-direccion',
  templateUrl: './generar-direccion.component.html',
  styleUrls: ['./generar-direccion.component.css']
})
export class GenerarDireccionComponent implements OnInit {
  @Input() desplegado = false;
  @Output() EnviarDireccion = new EventEmitter();
  public btnminimizar = '';
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
    this.direccion = this._direccionAux.TipoViaPrincipal + ' ';
    this.direccion += this._direccionAux.NumeroViaPrincipal + ' ';
    this.direccion += this._direccionAux.LetraViaPrincipal + ' ';
    this.direccion += this._direccionAux.Bis + ' ';
    this.direccion += this._direccionAux.LetraBis + ' ';
    this.direccion += this._direccionAux.CuadranteViaPrincipal + ' ';
    this.direccion += this._direccionAux.NumeroViaSecundaria + ' ';
    this.direccion += this._direccionAux.LetraViaSecundaria + ' ';
    this.direccion += this._direccionAux.NumeroPlaca + ' ';
    this.direccion += this._direccionAux.CuadranteViaSecundaria + ' ';
    this.direccion += this._direccionComp.toUpperCase() + ' ';
    this.direccion.replace('  ', ' '); // .trim();
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

  sendDireccion(event) {
    this.EnviarDireccion.emit({ direccion: this.direccion });
    // this.desplegado = false;
    $('#' + this.btnminimizar).click();
  }
  agregarComplemento(): void {
    const componenteComplemento = $('#componenteComplemento').val();
    const valorComplemento = $('#valorComplemento').val();
    if (componenteComplemento === '') {
      $('#componenteComplemento').focus();
      return;
    }
    if (valorComplemento === '') {
      $('#valorComplemento').focus();
      return;
    }
    this.direccionComp += ' ' + componenteComplemento + ' ' + valorComplemento;
    $('#componenteComplemento').val('');
    $('#valorComplemento').val('');
    // console.log(this.direccionComp);
    this.construirDireccion();
    // this.direccionAuxComp = '';
    $('#componenteComplemento').focus();
  }
  public limpiarDireccion() {
    this.direccionComp = '';
    this.direccion = '';
    this.direccionAux = new Direccion();
  }
}

class Direccion {
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
