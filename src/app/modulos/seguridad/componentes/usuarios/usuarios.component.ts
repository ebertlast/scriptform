import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { Usu } from '../../modelos/usu';
import { Usgru } from '../../modelos/usgru';
import { Sed } from '../../../general/modelos/sed';
import { Helper } from '../../../../app-helper';
import { UsgruService } from '../../servicios/usgru.service';
import { UsuService } from '../../servicios/usu.service';
import { SedService } from '../../../general/servicios/sed.service';
declare var $: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  editar = false;
  cargando = false;
  sedeVacia: Sed = new Sed();
  grupoVacio: Usgru = new Usgru();
  constructor(
    private _helper: Helper,
    private _usgruService: UsgruService,
    private _usuService: UsuService,
    private _sedService: SedService
  ) { }

  // #region Métodos de obtención y establecimiento de valores

  private _usu: Usu = new Usu();
  public get usu(): Usu {
    return this._usu;
  }
  public set usu(v: Usu) {
    this._usu = v;
  }

  private _usus: Usu[] = [];
  public get usus(): Usu[] {
    return this._usus;
  }
  public set usus(v: Usu[]) {
    this._usus = v;
  }

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

  private _sed: Sed = new Sed();
  public get sed(): Sed {
    return this._sed;
  }
  public set sed(v: Sed) {
    this._sed = v;
  }

  private _seds: Sed[] = [];
  public get seds(): Sed[] {
    return this._seds;
  }
  public set seds(v: Sed[]) {
    this._seds = v;
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
  someClickHandler(_usu: any): void {
    this.usu = new Usu();
    this._usuService.usuariosPorSede(_usu[0], _usu[1]).subscribe(usus => {
      usus.forEach(usu => {
        this.usu = usu;
        console.log(this.usu);
        this._sedService.registros(this.usu.SEDEID).subscribe(seds => {
          seds.forEach(sed => {
            this.sed = sed;
          });
          // console.log(this.sed);
        });
        this._usgruService.registros(this.usu.GRUPOID).subscribe(usgrus => {
          usgrus.forEach(usgru => {
            this.usgru = usgru;
          });
          // console.log(this.usgru);
        });
      });
      // console.log(this.usu);
    });
    this.editar = true;
    // $('#ControlID').focus();
  }
  // #endregion

  ngOnInit() {
    this._usgruService.registros().subscribe(usgrus => { this.usgrus = usgrus; });
    this._sedService.registros().subscribe(seds => { this.seds = seds; });

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

    this.refrescarUsu();
  }

  public refrescarUsu() {
    // this.usu = new Usu();
    this.cargando = true;
    this._usuService.registros().subscribe(usus => {
      this.usus = usus;
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

  public guardar() {
    if (this.usu.SEDEID === '') {
      $('#SEDEID').focus();
      return;
    }
    if (this.usu.GRUPOID === '') {
      $('#GRUPOID').focus();
      return;
    }
    const btn = $('#btnAceptar');
    btn.button('loading');
    this.usu.EMAIL = this.usu.EMAIL.toLowerCase();
    this.usu.USUARIOID = this.usu.USUARIOID.toUpperCase();
    this.usu.NOMBRE = this.usu.NOMBRE.toUpperCase();
    let existeEmail = false;
    if (!this.editar) {
      this._usuService.registros().subscribe(usus => {
        let existeUsuario = false;
        usus.forEach(usu => {
          if (usu.EMAIL === this.usu.EMAIL) {
            existeEmail = true;
          }
          if (usu.USUARIOID === this.usu.USUARIOID && usu.SEDEID === this.usu.SEDEID) {
            existeUsuario = true;
          }
        });
        if (existeEmail) {
          btn.button('reset');
          this._helper.Notificacion('El email (' + this.usu.EMAIL + ') se encuentra vinculado a otro usuario', 'warning', 'EMAIL');
          $('#EMAIL').focus();
          return;
        }
        if (existeUsuario) {
          btn.button('reset');
          // tslint:disable-next-line:max-line-length
          this._helper.Notificacion('El usuario (' + this.usu.USUARIOID + ') con sede (' + this.usu.SEDEID + ') se encuentra registrado', 'warning', 'USUARIOID');
          $('#EMAIL').focus();
          return;
        }
        if (!existeEmail && !existeUsuario) {
          this.usu.CLAVE = this._helper.GenerarID(); // Generamos la clave del usuario
          this._usuService.nuevoRegistro(this.usu).subscribe(exito => {
            btn.button('reset');
            if (exito) {
              this.usu = new Usu();
              this.editar = false;
              this.refrescarUsu();
              // tslint:disable-next-line:max-line-length
              this._helper.Notificacion('Usuario registrado, un email de confirmación se ha enviado al correo del usuario con su usuario y clave que puede se modificada en cualquier momento por él mismo.');
            } else {
              // tslint:disable-next-line:max-line-length
              this._helper.Notificacion('El usuario no ha podido ser registrado, vuelve a intentarlo. Si el problema persiste no dudes en contactar al departamento de tecnología.', 'error');
            }
          });
        }
      });
    } else {
      this._usuService.registros().subscribe(usus => {
        usus.forEach(usu => {
          if (usu.USUARIOID !== this.usu.USUARIOID && usu.EMAIL === this.usu.EMAIL) {
            existeEmail = true;
          }
        });
        if (existeEmail) {
          btn.button('reset');
          this._helper.Notificacion('El email (' + this.usu.EMAIL + ') se encuentra vinculado a otro usuario', 'warning', 'EMAIL');
          $('#EMAIL').focus();
          return;
        }
        this._usuService.actualizar(this.usu).subscribe(exito => {
          btn.button('reset');
          if (exito) {
            this.usu = new Usu();
            this.editar = false;
            this.refrescarUsu();
            this._helper.Notificacion('Usuario actualizado.');
          } else {
            // tslint:disable-next-line:max-line-length
            this._helper.Notificacion('El usuario no ha podido ser actualizado, vuelve a intentarlo. Si el problema persiste no dudes en contactar al departamento de tecnología.', 'error');
          }
        });
      });
    }
  }

  public cancelar() {
    $('#btnAceptar').button('reset');
    this.editar = false;
    this.usu = new Usu();
  }
}
