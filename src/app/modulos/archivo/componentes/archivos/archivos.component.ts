import { Component, OnInit } from '@angular/core';
import { Arc } from '../../modelos/arc';
import { TidService } from '../../../general/servicios/tid.service';
import { Tid } from '../../../general/modelos/tid';
import { Afi } from '../../../general/modelos/afi';
import { Helper } from '../../../../app-helper';
import { Observable } from 'rxjs/Observable';
import { AfiService } from '../../../general/servicios/afi.service';
import { MunService } from '../../../general/servicios/mun.service';
import { Mun } from '../../../general/modelos/mun';
import { ArchService } from '../../servicios/arch.service';
import { ArcService } from '../../servicios/arc.service';
import { Arch } from '../../modelos/arch';

declare var $: any;
declare var jQuery: any;
declare var bootbox: any;
@Component({
  selector: 'app-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.css']
})
export class ArchivosComponent implements OnInit {
  public cargando = false;
  private documentoConsultado = '';
  public paso = 1;
  public formularioID = '';
  public codebar = '';
  public srcCodebar = '';
  public codigoBarrasHabilitado = false;
  constructor(
    private _tidService: TidService,
    private _helper: Helper,
    private _afiService: AfiService,
    private _munService: MunService,
    private _archService: ArchService,
    private _arcService: ArcService,
  ) { }
  // #region Metodos de obtención y establecimiento de valore

  private _archivo: Arc = new Arc();
  public get archivo(): Arc {
    // this.archivo.TIPOID = this._tipoDocumento.TipoID;
    return this._archivo;
  }
  public set archivo(v: Arc) {
    this._archivo = v;
  }

  private _tiposDocumentos: Tid[] = [];
  public get tiposDocumentos(): Tid[] {
    return this._tiposDocumentos;
  }
  public set tiposDocumentos(v: Tid[]) {
    this._tiposDocumentos = v;
  }

  private _tipoDocumento: Tid = new Tid();
  public get tipoDocumento(): Tid {
    return this._tipoDocumento;
  }
  public set tipoDocumento(v: Tid) {
    this._tipoDocumento = v;
  }

  private _totalTiempo = 0;
  public get totalTiempo(): number {
    return this._totalTiempo;
  }
  public set totalTiempo(v: number) {
    this._totalTiempo = v;
  }


  private _afiliado: Afi = new Afi();
  public get afiliado(): Afi {
    return this._afiliado;
  }
  public set afiliado(v: Afi) {
    this._afiliado = v;
  }


  private _municipios: Mun[] = [];
  public get municipios(): Mun[] {
    return this._municipios;
  }
  public set municipios(v: Mun[]) {
    this._municipios = v;
  }


  private _municipio: Mun = new Mun();
  public get municipio(): Mun {
    return this._municipio;
  }
  public set municipio(v: Mun) {
    this._municipio = v;
    this.codigoBarrasHabilitado = false;
    if (this._municipio.CodigoMunicipio !== '') {
      this.codigoBarrasHabilitado = true;
      // console.log(this.municipio);
    }
  }


  private _pdf: Arch = new Arch();
  public get pdf(): Arch {
    return this._pdf;
  }
  public set pdf(v: Arch) {
    this._pdf = v;
  }


  // #endregion
  ngOnInit() {
    const _me = this;
    // #region Construcción del Wizard
    $('[data-rel=tooltip]').tooltip();

    $('.select2').css('width', '200px').select2({ allowClear: true })
      .on('change', function () {
        $(this).closest('form').validate().element($(this));
      });


    let $validation = false;
    $('#fuelux-wizard-container')
      .ace_wizard({
        // step: 2 //optional argument. wizard will jump to step "2" at first
        // buttons: '.wizard-actions:eq(0)'
      })
      .on('actionclicked.fu.wizard', function (e, info) {
        _me.validar(e);
        if (info.step === 1 && $validation) {
          if (!$('#validation-form').valid()) { e.preventDefault(); }
        }
      })
      // .on('changed.fu.wizard', function() {
      // })
      .on('finished.fu.wizard', function (e) {
        // bootbox.dialog({
        //   message: "Thank you! Your information was successfully saved!",
        //   buttons: {
        //     "success": {
        //       "label": "OK",
        //       "className": "btn-sm btn-primary"
        //     }
        //   }
        // });
        _me.afiliado = new Afi();
        _me.archivo = new Arc();
        _me.municipio = new Mun();
        _me.tipoDocumento = new Tid();
        _me.paso = 1;
        _me.documentoConsultado = '';
        _me.pdf = new Arch();
        const wizard = $('#fuelux-wizard-container').data('fu.wizard');
        wizard.currentStep = _me.paso;
        wizard.setState();
        e.preventDefault();

      }).on('stepclick.fu.wizard', function (e) {
        // e.preventDefault();//this will prevent clicking and selecting steps
      });


    // jump to a step
    /**
    var wizard = $('#fuelux-wizard-container').data('fu.wizard')
    wizard.currentStep = 3;
    wizard.setState();
    */

    // determine selected step
    // wizard.selectedItem().step



    // hide or show the other form which requires validation
    // this is for demo only, you usullay want just one form in your application
    $('#skip-validation').removeAttr('checked').on('click', function () {
      $validation = this.checked;
      if (this.checked) {
        $('#sample-form').hide();
        $('#validation-form').removeClass('hide');
      } else {
        $('#validation-form').addClass('hide');
        $('#sample-form').show();
      }
    });



    // documentation : http://docs.jquery.com/Plugins/Validation/validate


    $.mask.definitions['~'] = '[+-]';
    $('#phone').mask('(999) 999-9999');

    jQuery.validator.addMethod('phone', function (value, element) {
      return this.optional(element) || /^\(\d{3}\) \d{3}\-\d{4}( x\d{1,6})?$/.test(value);
    }, 'Enter a valid phone number.');

    $('#validation-form').validate({
      errorElement: 'div',
      errorClass: 'help-block',
      focusInvalid: false,
      ignore: '',
      rules: {
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5
        },
        password2: {
          required: true,
          minlength: 5,
          equalTo: '#password'
        },
        name: {
          required: true
        },
        phone: {
          required: true,
          phone: 'required'
        },
        url: {
          required: true,
          url: true
        },
        comment: {
          required: true
        },
        state: {
          required: true
        },
        platform: {
          required: true
        },
        subscription: {
          required: true
        },
        gender: {
          required: true,
        },
        agree: {
          required: true,
        }
      },

      messages: {
        email: {
          required: 'Please provide a valid email.',
          email: 'Please provide a valid email.'
        },
        password: {
          required: 'Please specify a password.',
          minlength: 'Please specify a secure password.'
        },
        state: 'Please choose state',
        subscription: 'Please choose at least one option',
        gender: 'Please choose gender',
        agree: 'Please accept our policy'
      },


      highlight: function (e) {
        $(e).closest('.form-group').removeClass('has-info').addClass('has-error');
      },

      success: function (e) {
        $(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
        $(e).remove();
      },

      errorPlacement: function (error, element) {
        if (element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
          var controls = element.closest('div[class*="col-"]');
          if (controls.find(':checkbox,:radio').length > 1) controls.append(error);
          else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
        }
        else if (element.is('.select2')) {
          error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
        }
        else if (element.is('.chosen-select')) {
          error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
        }
        else error.insertAfter(element.parent());
      },

      submitHandler: function (form) {
      },
      invalidHandler: function (form) {
      }
    });




    $('#modal-wizard-container').ace_wizard();
    $('#modal-wizard .wizard-actions .btn[data-dismiss=modal]').removeAttr('disabled');


    /**
    $('#date').datepicker({autoclose:true}).on('changeDate', function(ev) {
      $(this).closest('form').validate().element($(this));
    });

    $('#mychosen').chosen().on('change', function(ev) {
      $(this).closest('form').validate().element($(this));
    });
    */


    $(document).one('ajaxloadstart.page', function (e) {
      // in ajax mode, remove remaining elements before leaving page
      $('[class*=select2]').remove();
    });
    // #endregion

    // #region Spinner correspondientes a la cantidad de beneficiarios
    $('#spinner1').ace_spinner({ value: 0, min: 0, max: 5, step: 1, btn_up_class: 'btn-info', btn_down_class: 'btn-info' })
      .closest('.ace-spinner')
      .on('changed.fu.spinbox', function () {
        const cantBeneficiarios = $('#spinner1').val();
        // console.log(cantBeneficiarios);
        _me.archivo.CANTIDADBENEFICIARIOS = cantBeneficiarios;
      });
    // $('#spinner1').ace_spinner('disable').ace_spinner('value', 11);
    // or
    // $('#spinner1').closest('.ace-spinner').spinner('disable').spinner('enable').spinner('value', 11);//disable, enable or change value
    // $('#spinner1').closest('.ace-spinner').spinner('value', 0);//reset to 0
    // #endregion

    // #region Seleccionar archivos para cargarlos
    const whitelist_ext = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'pdf'];
    const whitelist_mime = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/bmp', 'application/pdf'];

    $('#archivos').ace_file_input({
      style: 'well',
      btn_choose: 'Suelta los archivos aquí o haz clic para elegir',
      btn_change: null,
      no_icon: 'ace-icon fa fa-cloud-upload',
      droppable: true,
      allowExt: whitelist_ext,
      allowMime: whitelist_mime,
      // thumbnail: 'small'//large | fit
      thumbnail: 'large'// large | fit
      // ,icon_remove:null// set null, to hide remove/reset button
      /**,before_change:function(files, dropped) {
        //Check an example below
        //or examples/file-upload.html
        return true;
      }*/
      /**,before_remove : function() {
        return true;
      }*/
      ,
      preview_error: function (filename, error_code) {
        // name of the file that failed
        // error_code values
        // 1 = 'FILE_LOAD_FAILED',
        // 2 = 'IMAGE_LOAD_FAILED',
        // 3 = 'THUMBNAIL_FAILED'
        // alert(error_code);
      }

    }).on('change', function () {
      // console.log($(this).data('ace_input_files'));
      // console.log($(this).data('ace_input_method'));
    });


    // $('#archivos')
    // .ace_file_input('show_file_list', [
    // {type: 'image', name: 'name of image', path: 'http://path/to/image/for/preview'},
    // {type: 'file', name: 'hello.txt'}
    // ]);







    // #endregion
    this._tidService.registros().subscribe(tiposDocumentos => {
      this.tiposDocumentos = tiposDocumentos;
    });

    this._munService.registros().subscribe(municipios => {
      this.municipios = municipios;
    });

    // $.fn.delayPasteKeyUp = function (fn, ms) {
    //   let timer = 0;
    //   $(this).on('propertychange input', function () {
    //     clearTimeout(timer);
    //     timer = setTimeout(fn, ms);
    //   });
    // };

    // $('#serialsticker').delayPasteKeyUp(function () {
    //   // $('#respuesta').append('Producto registrado: ' + $('#serialsticker').val() + '');
    //   $('#serialsticker').val('');
    //   }, 200);
  }

  actualizarPaso() {
    const wizard = $('#fuelux-wizard-container').data('fu.wizard');
    this.paso = wizard.selectedItem().step;
  }

  validar(e) {
    this.cargando = true;
    const wizard = $('#fuelux-wizard-container').data('fu.wizard');
    this.paso = wizard.selectedItem().step;
    // console.log('Hacer validaciones del paso ' + this.paso);
    let valido = true;
    switch (this.paso) {
      case 1:
        if (this.archivo.TIPOID === '') {
          this._helper.Notificacion('Debes elegir un tipo de documento de identificación', 'error', 'tipoDocumento', false);
          valido = false;
        }
        if (this.archivo.NUMEROIDENTIFICACION === '') {
          this._helper.Notificacion('Debes ingresar un número de identificacion', 'error', 'numeroDocumento', false);
          valido = false;
        }
        this.consultarDocumento();
        // console.log(this.municipio.MunicipioID);
        break;
      case 2:
        this.archivo.MUNICIPIOID = this.municipio.MunicipioID;
        if (this.archivo.FORMULARIOID === '') {
          this._helper.Notificacion('Debes indicar el número del formulario', 'error', 'formularioid', false);
          valido = false;
        }
        // serialsticker
        if (this.archivo.SERIALSTICKER === '') {
          this._helper.Notificacion('Debes ingresar el código del sticker pegado al formulario', 'error', 'serialsticker', false);
          valido = false;
        }
        if (this.archivo.MUNICIPIOID === '') {
          this._helper.Notificacion('Debes seleccionar la ubicación donde donde proviene la radicación', 'error', 'municipioId', false);
          valido = false;
        }
        break;
      case 3:

        const files = $('#archivos').prop('files');
        if (files.length <= 0) {
          this._helper.Notificacion('Debes seleccionar al menos un archivo', 'error', 'archivos', false, 'top-full-width');
          // console.log(files);
          valido = false;
        } else {
          // console.log(names);
          const names = $.map(files, function (val) { return val.name; });
          const postData = { field1: 'field1', field2: 'field2' }; // Put your form data variable. This is only example.
          this.cargando = true;
          if (this.pdf.ARCHIVOID === '') {
            this._archService.upload(postData, files).then(archivosRegistrados => {
              let archivos: any;
              archivos = archivosRegistrados;
              archivos.forEach(archivo => {
                this.pdf = archivo;
              });
              // console.log(this.pdf);
              if (this.pdf.ARCHIVOID !== '') {
                this.archivo.ARCHIVOID = this.pdf.ARCHIVOID;
                // console.log(this.archivo);
                this._arcService.nuevoArchivo(this.archivo).subscribe(radicado => {
                  this.cargando = false;
                });
                // this._arcService.nuevoArchivo()
              }
              // this.cargando = false;
            });
          }
          break;
        }
        break;
      default:
        break;
    }
    this.cargando = false;
    if (!valido) {
      wizard.currentStep = this.paso;
      wizard.setState();
      e.preventDefault();
    }
  }
  public consultarDocumento() {
    // this.solicitudDocumento.unsuscribe(); // Si se encuentra una hilo de consulta de afiliado a la base de datos la cancela
    this.cargando = false; // Ya no esta cargando nada
    this.archivo.TIPOID = this.tipoDocumento.TipoID;
    if (this.archivo.TIPOID.trim() === '' || this.archivo.NUMEROIDENTIFICACION.trim() === '') {
      return;
    }
    if (this.documentoConsultado === this.archivo.TIPOID + this.archivo.NUMEROIDENTIFICACION) {
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
    // this.afiliarse = false;
    // this.ingresar = false;
    // this.registrarse = false;

    if (tiempoDemora > this.totalTiempo) {
      this.totalTiempo = tiempoDemora;
    }
    // console.log(this.totalTiempo);
    if (this.totalTiempo === 0 && this.archivo.TIPOID !== '' && this.archivo.NUMEROIDENTIFICACION !== '') {
      this.documentoConsultado = this.archivo.TIPOID + this.archivo.NUMEROIDENTIFICACION;
      this.cargando = true;
      // console.log('Consultar');
      // console.log(this.archivo.TIPOID + ' - ' + this.archivo.NUMEROIDENTIFICACION);
      this.afiliado = new Afi();
      this._afiService.afiliadoPorDocumento(this.archivo.TIPOID, this.archivo.NUMEROIDENTIFICACION).subscribe(afiliados => {
        afiliados.forEach(afiliado => {
          this.afiliado = afiliado;
        });
        if (this.afiliado.NumeroIdentificacion !== '') {
          this.archivo.NUEVOREGISTRO = false;
          // this._helper.Notificacion('Cotizante fue encontrado en nuestra base de datos', 'success', 'numeroDocumento');
          // this._helper.Notificacion('Cotizante fue encontrado en nuestra base de datos', 'success');
        } else {
          let msj = 'Cotizante no fue encontrado en nuestra base de datos.';
          msj += '\nRecuerda indicar si es o no una nueva afiliación';
          this._helper.Notificacion(msj, 'info', 'nuevoregistro', false, 'top-left');
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

  public generarCodigoBarras() {
    // this.codebar='<img alt="Barcoded value 1234567890"
    // src="http://bwipjs-api.metafloor.com/?bcid=code128&text=1234567890&includetext">'
    this._arcService.sticker(this.municipio.MunicipioID).subscribe(codebar => {
      // this.codebar = '1100130453950';
      this.codebar = codebar;
      this.srcCodebar = 'http://bwipjs-api.metafloor.com/?bcid=code128&text=' + this.codebar + '&includetext';
      $('#imgCodebar')
        .attr('src', this.srcCodebar)
        .attr('alt', 'Sticker ' + this.codebar);
      this.imprimirCodigoBarras();
      $('#serialsticker').focus();
    });
    return false;
  }

  public imprimirCodigoBarras() {
    const image = '<html><head><script>function step1(){\n' +
      'setTimeout("step2()", 10);}\n' +
      'function step2(){window.print();window.close()}\n' +
      '</scri' + 'pt></head><body onload="step1()">\n' +
      '<center><img src="' + this.srcCodebar + '" /></center></body></html>';

    const Pagelink = 'about:blank';
    const pwa = window.open(Pagelink, '_new');
    pwa.document.open();
    pwa.document.write(image);
    pwa.document.close();
    return false;
  }

}
