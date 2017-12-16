import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Afi } from '../../modelos/afi';
import { Ben } from '../../modelos/ben';
import { AfiService } from '../../servicios/afi.service';
import { Tid } from '../../modelos/tid';
import { TidService } from '../../servicios/tid.service';
import { Helper } from '../../../../app-helper';
import { GenService } from '../../servicios/gen.service';
import { Gen } from '../../modelos/gen';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { TiprService } from '../../servicios/tipr.service';
import { TgenService } from '../../servicios/tgen.service';
import { Tipr } from '../../modelos/tipr';
import { Tgen } from '../../modelos/tgen';
import { Mun } from '../../modelos/mun';
import { MunService } from '../../servicios/mun.service';
import { ZonService } from '../../servicios/zon.service';
import { Zon } from '../../modelos/zon';
import { IpsService } from '../../servicios/ips.service';
import { Ips } from '../../modelos/ips';
declare var $: any;
@Component({
  selector: 'app-modal-afi',
  templateUrl: './modal-afi.component.html',
  styleUrls: ['./modal-afi.component.css']
})
export class ModalAfiComponent implements OnInit, AfterViewInit {
  @Input() modalid = '';
  @Input() direccion = '';
  @Input() beneficiario = false; // Determina si se devolverá un beneficiario o un afiliado como registro

  private _afiliado: any = new Afi();
  public get afiliado(): any {
    this._afiliado.PrimerApellido = this._helper.Capitalizar(this._afiliado.PrimerApellido);
    this._afiliado.PrimerNombre = this._helper.Capitalizar(this._afiliado.PrimerNombre);
    this._afiliado.SegundoApellido = this._helper.Capitalizar(this._afiliado.SegundoApellido);
    this._afiliado.SegundoNombre = this._helper.Capitalizar(this._afiliado.SegundoNombre);
    if (this._afiliado.DireccionResidencia === '') { this._afiliado.DireccionResidencia = this.direccion; }
    return this._afiliado;
  }
  public set afiliado(v: any) {
    this._afiliado = v;
  }

  @Output() EnviarAfiliado = new EventEmitter();
  registrar = true;
  cargando = false;
  documentoConsultado = '';
  totalTiempo = 0;
  public dividdireccion = '';
  constructor(
    private _helper: Helper,
    private _afiService: AfiService,
    private _tidService: TidService,
    private _genService: GenService,
    private _tiprService: TiprService,
    private _tgenService: TgenService,
    private _munService: MunService,
    private _zonService: ZonService,
    private _ipsService: IpsService,
  ) {
    if (this.beneficiario) {
      this.afiliado = new Ben();
    } else {
      this.afiliado = new Afi();
    }
  }

  // #region Métodos de obtención y establecimiento de valores

  private _tids: Tid[] = [];
  public get tids(): Tid[] {
    return this._tids;
  }
  public set tids(v: Tid[]) {
    this._tids = v;
  }


  private _gens: Gen[] = [];
  public get gens(): Gen[] {
    return this._gens;
  }
  public set gens(v: Gen[]) {
    this._gens = v;
  }


  private _tiprs: Tipr[] = [];
  public get tiprs(): Tipr[] {
    return this._tiprs;
  }
  public set tiprs(v: Tipr[]) {
    this._tiprs = v;
  }


  private _etnias: Tgen[] = [];
  public get etnias(): Tgen[] {
    return this._etnias;
  }
  public set etnias(v: Tgen[]) {
    this._etnias = v;
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


  private _ipsTodas: Ips[] = [];
  public get ipsTodas(): Ips[] {
    return this._ipsTodas;
  }
  public set ipsTodas(v: Ips[]) {
    this._ipsTodas = v;
  }

  private _ipsMixtas: Ips[] = [];
  public get ipsMixtas(): Ips[] {
    return this._ipsMixtas;
  }
  public set ipsMixtas(v: Ips[]) {
    this._ipsMixtas = v;
  }

  private _ipsIndependientes: Ips[] = [];
  public get ipsIndependientes(): Ips[] {
    return this._ipsIndependientes;
  }
  public set ipsIndependientes(v: Ips[]) {
    this._ipsIndependientes = v;
  }

  private _ipsMedica: Ips = new Ips();
  public get ipsMedica(): Ips {
    return this._ipsMedica;
  }
  public set ipsMedica(v: Ips) {
    this._ipsMedica = v;
  }

  private _ipsOdontologica: Ips = new Ips();
  public get ipsOdontologica(): Ips {
    return this._ipsOdontologica;
  }
  public set ipsOdontologica(v: Ips) {
    this._ipsOdontologica = v;
  }

  // #endregion

  ngOnInit() {
    // alert(this.modalid);
    this._tidService.tiposIdentificacion().subscribe(tids => { this.tids = tids; });
    this._genService.registros().subscribe(gens => { this.gens = gens; });
    this._tiprService.registros().subscribe(tiprs => { this.tiprs = tiprs; });
    this._tgenService.registros('GENERAL', 'GRUPOETNICO').subscribe(etnias => { this.etnias = etnias; });
    // this._tgenService.registros('GENERAL', 'GRUPOETNICO').subscribe(etnias => { this.etnias = etnias; });
    this._munService.municipios().subscribe(municipios => { this.municipios = municipios; });
    this._zonService.registros().subscribe(zonas => { this.zonas = zonas; });

    this._ipsService.registros().subscribe(ipsTodas => {
      this.ipsTodas = ipsTodas;
      this._ipsService.mixtas().subscribe(ipsMixtas => {
        this.ipsMixtas = ipsMixtas;
        this._ipsService.independientes().subscribe(ipsIndependientes => {
          this.ipsIndependientes = ipsIndependientes;
        });
      });
    });
    this.dividdireccion = (Math.floor(Math.random() * 999999)).toString();

    const me = this;
    $.mask.definitions['~'] = '[+-]';
    $('.input-mask-date').mask('99/99/9999');
    $('.input-mask-phone').mask('(999) 999-9999');
    $('.input-mask-eyescript').mask('~9.99 ~9.99 999');
    $('.input-mask-product').mask('a*-999-a999',
      { placeholder: ' ', completed: function () { alert('Escribiste lo siguiente: ' + this.val()); } }
    );
    // $('.input-mask-email').mask('999.999.999.999.999,99', {reverse: true});
  }

  ngAfterViewInit() {
    // #region Fecha de Nacimiento
    const id = '#' + this.modalid;
    const fnacimiento = $('#' + this.modalid).find('#FNacimiento');
    const me = this;
    fnacimiento.change(function () {
      me.afiliado.FechaNacimiento = fnacimiento.val();
      // console.log(me.afiliado.FechaNacimiento);
    });
    // #endregion

    // $('#SeleccionIpsOdontologica :input').attr('disabled', true);
  }

  public consultarDocumento() {
    // this.solicitudDocumento.unsuscribe(); // Si se encuentra una hilo de consulta de afiliado a la base de datos la cancela
    this.cargando = false; // Ya no esta cargando nada
    if (this.afiliado.TipoId.trim() === '' || this.afiliado.NumeroIdentificacion.trim() === '') {
      return;
    }
    if (this.documentoConsultado === this.afiliado.TipoId + this.afiliado.NumeroIdentificacion) {
      return;
    }
    this.cargando = true;
    if (this.totalTiempo <= 0) {
      this.consultaDemorada(2);
    } else {
      this.totalTiempo = 2;
    }
  }

  private consultaDemorada(tiempoDemora: number = -1) {
    if (tiempoDemora > this.totalTiempo) {
      this.totalTiempo = tiempoDemora;
    }
    // console.log(this.totalTiempo);
    if (this.totalTiempo === 0 && this.afiliado.TipoId !== '' && this.afiliado.NumeroIdentificacion !== '') {
      this.registrar = true;
      this.documentoConsultado = this.afiliado.TipoId + this.afiliado.NumeroIdentificacion;
      this.cargando = true;

      let afiliadoConsultado = new Afi();
      // console.log(this.afiliado.TipoId + this.afiliado.NumeroIdentificacion);

      this._afiService.afiliadoPorDocumento(this.afiliado.TipoId, this.afiliado.NumeroIdentificacion).subscribe(afiliados => {
        afiliados.forEach(afiliado => {
          afiliadoConsultado = afiliado;
          // console.log('Afiliado Consultado:');

          // console.log(afiliadoConsultado);
        });
        if (afiliadoConsultado.NumeroIdentificacion !== '') {
          this.afiliado = afiliadoConsultado;
          this.registrar = false;
        } else {
          // let msj = 'Cotizante no fue encontrado en nuestra base de datos.';
          // msj += '\nRecuerda indicar si es o no una nueva afiliación';
          // this._helper.Notificacion(msj, 'info', 'nuevoregistro', false, 'top-left');
        }
        // console.log(this.afiliado);
        this.cargando = false;
      });

    } else {
      /* Restamos un segundo al tiempo restante */
      this.totalTiempo -= 1;
      /* Ejecutamos nuevamente la función al pasar 1000 milisegundos (1 segundo) */
      this._helper.Sleep(1000).then(() => {
        this.consultaDemorada();
      });
    }
  }

  setDireccion(event): void {
    const me = this;
    // me.formulario.Direccion = event.direccion;
    // me.refrescarFormulario();
    // console.log(event);
    // alert(event.direccion);
    this.afiliado.DireccionResidencia = event.direccion;
  }

  enviarAfiliado(event) {
    // console.log(this.afiliado);
    this.EnviarAfiliado.emit({ afiliado: this.afiliado });
    return false;
  }

  elegirIPSMedica() {
    // console.log(this.afiliado.IPSMedica);
    this.ipsMedica = new Ips();
    this.afiliado.IPSMixta = '';
    this.afiliado.IPSOdontologica = '';
    this.ipsTodas.forEach(ips => {
      const _ips: Ips = ips;
      if (_ips.Codigo_Med_BH === this.afiliado.IPSMedica) {
        this.ipsMedica = _ips;
        // this.ipsTodas.forEach(ipsOdontologica => {
        //   if (this.ipsMedica.Codigo_Odo_BH === ipsOdontologica.Codigo_Odo_BH) {
        //     this.ipsOdontologica = ipsOdontologica;
        //   }
        // });
      }
    });
    if (this.ipsMedica.Codigo_Med_BH === this.ipsMedica.Codigo_Odo_BH) {
      this.afiliado.IPSMixta = this.ipsMedica.Codigo_Odo_BH;
    } else {
      this.afiliado.IPSOdontologica = this.ipsMedica.Codigo_Odo_BH;
    }
    this.elegirIPSOdontologica();
    // console.log(this.ipsOdontologica);
  }
  elegirIPSOdontologica() {
    this.ipsOdontologica = new Ips();
    this.ipsIndependientes.forEach(ips => {
      if (ips.Codigo_Odo_BH === this.afiliado.IPSOdontologica) {
        this.ipsOdontologica = ips;
      }
    });
    // console.log(this.ipsOdontologica);
  }
}
