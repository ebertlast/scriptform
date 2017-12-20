import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Usu } from '../../modelos/usu';
import { Helper } from '../../../../app-helper';
import { UsuService } from '../../servicios/usu.service';
import { Router } from '@angular/router';
declare var $: any;
declare var bootbox: any;
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  cargando = false;
  constructor(
    private _authService: AuthService,
    private _usuService: UsuService,
    private _helper: Helper,
    private _router: Router
  ) { }

  // #region Métodos de obtención y establecimiento de valores

  private _usu: Usu = new Usu();
  public get usu(): Usu {
    return this._usu;
  }
  public set usu(v: Usu) {
    this._usu = v;
  }

  // #endregion

  ngOnInit() {
    this.usu = this._authService.Usuario();

    // // editables on first profile page
    // $.fn.editable.defaults.mode = 'inline';
    // tslint:disable-next-line:quotemark
    // $.fn.editableform.loading = "<div class='editableform-loading'><i class='ace-icon fa fa-spinner fa-spin fa-2x light-blue'></i></div>";
    // $.fn.editableform.buttons = '<button type="submit" class="btn btn-info editable-submit"><i class="ace-icon fa fa-check"></i></button>' +
    //   '<button type="button" class="btn editable-cancel"><i class="ace-icon fa fa-times"></i></button>';
    // // text editable
    // $('#CLAVE')
    //   .editable({
    //     type: 'text',
    //     name: 'CLAVE',
    //     id: 'CLAVE',
    //     success: function (response, newValue) {
    //       console.log(response);
    //       console.log(newValue);
    //     }

    //   })
    //   // .on('change', function () {
    //   //   console.log($('#CLAVE').val());
    //   // })
    //   ;

    // ////////////////////
    // // change profile
    // $('[data-toggle="buttons"] .btn').on('click', function (e) {
    //   const target = $(this).find('input[type=radio]');
    //   const which = parseInt(target.val());
    //   $('.user-profile').parent().addClass('hide');
    //   $('#user-profile-' + which).parent().removeClass('hide');
    // });


    // $(document).one('ajaxloadstart.page', function (e) {
    //   // in ajax mode, remove remaining elements before leaving page
    //   try {
    //     $('.editable').editable('destroy');
    //   } catch (e) { }
    //   $('[class*=select2]').remove();
    // });

  }

  /**
   * actualizarClave
   */
  public actualizarClave() {
    const me = this;
    bootbox.dialog({
      // tslint:disable-next-line:max-line-length
      message: '<span class="bigger-110">¿Confirma que realmente actualizar su clave de acceso?</span>',
      buttons:
        {
          'click':
            {
              'label': 'Cancelar',
              'className': 'btn-sm btn-primary',
              'callback': function () {
                // Example.show('Primary button');
                me.usu.CLAVE = '';
                me._helper.Notificacion('Cancelado por el usuario', 'info');
              }
            },
          'danger':
            {
              'label': 'Cambiar!',
              'className': 'btn-sm btn-success',
              'callback': function () {
                me.cargando = true;
                me._usuService.cambiarClave(me.usu).subscribe(exito => {
                  me.cargando = false;
                  if (exito) {
                    me._helper.Notificacion('Usuario actualizado, vuelve a iniciar sesión');
                    me._router.navigate(['/seguridad/salir']);
                    // me._authService.CerrarSesion();
                  } else {
                    // tslint:disable-next-line:max-line-length
                    me._helper.Notificacion('No hemos podido actualizar tu registro en la base de datos, vuelve a intentarlo. Si el problema persiste no dudes en contactar con el departamento de tecnología.', 'error');
                  }
                });
              }
            }
        }
    });
  }

}
