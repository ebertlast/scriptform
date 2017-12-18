import { Injectable } from '@angular/core';
import { Helper } from '../../../app-helper';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Usu as Model } from '../modelos/usu';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
import { MSJBIENVENIDA } from './mock.msjsbienvenida';

@Injectable()
export class AuthService {
  private usuario: Model = new Model();
  public Usuario(): Model {
    if (!localStorage.getItem(environment.currentuser)) {
      return new Model();
    }
    this.usuario = JSON.parse(localStorage.getItem(environment.currentuser))['usuario'];
    // console.log(this.usuario);
    return this.usuario;
  }
  constructor(private _helper: Helper, private _router: Router, private _http: Http) { }

  /**
   * Extrae el contenido del Response que devuelve la API Rest
   * @param res Respuesta que genera la API Rest
   * @param mostrarError Muestra al usuario o no lo que contiene el campo 'error' en el response.
   */
  public ExtraerResultados(res: Response, mostrarError: boolean = true) {
    // console.log(res);
    const body = res.json();
    // console.log('global.service.ExtraerResultados');
    // console.log(res.json());
    if (!body.response && body.message && mostrarError) {
      // this._helper.Notificacion(body.message || body.statusText, 'Excepción', 'error');
      this._helper.Notificacion(body.message || body.statusText, 'error', '', false);
      if (body.logout === true) {
        this._router.navigate(['/ingresar']);
      }
    }

    this.usuario = this.Usuario();
    // console.log(body);
    // console.log('body.TOKEN: ', body.TOKEN);
    // console.log('body.token: ', body.token);
    this.usuario.TOKEN = (typeof (body.TOKEN) === 'undefined') ? '' : body.TOKEN;
    if (this.usuario.TOKEN === '') { this.usuario.TOKEN = (typeof (body.token) === 'undefined') ? '' : body.token; }
    if ((typeof (this.usuario.TOKEN) === 'undefined') ||
      this.usuario.TOKEN === '' ||
      !this.usuario.TOKEN
    ) { this.usuario.TOKEN = this.Usuario().TOKEN; }
    // console.log(this.usuario);
    // console.log(this.usuario.TOKEN);

    localStorage.removeItem(environment.currentuser);
    localStorage.setItem(environment.currentuser, JSON.stringify({ usuario: this.usuario }));
    return body.result || {};
  }

  /**
   * Maneja los errores que se puedan generar la momento de hacer las solicitudes a la API Rest
   * @param error Respuesta que genera la API Rest
   */
  public CapturarError(error: Response | any) {
    let errMsg: string;
    if (!error.ok) {
      console.log(error);
      errMsg = (typeof (error._body.message) !== 'undefined' || error._body.message) ? error._body.message : '';
      if (error instanceof Response) {
        let body: any = '';
        try {
          body = error.json();
          // console.log(error);
          // console.log(body);
        } catch (e) {
          body = '';
        }
        if (typeof (body.message) !== 'undefined') {
          errMsg = body.message;
        } else {
          errMsg = body.error || JSON.stringify(body);
        }
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      // this._helper.Notificacion(errMsg, 'Excepción', 'error');
      this._helper.Notificacion(errMsg, 'error', '', false);
    }
    return Observable.throw(errMsg);
  }

  public Ingresar(usuario: string, clave: string, sedeid: string): Observable<boolean> {
    // console.log(environment.apiurl + '/usuarios/ingresar/' + usuario + '/' + clave + '/' + sedeid);
    return this._http.get(environment.apiurl + '/usuarios/ingresar/' + usuario + '/' + clave + '/' + sedeid)
      .map((response: Response) => {
        const data = this.ExtraerResultados(response);
        // console.log(data);

        this.usuario = this.Usuario();
        const userData: Model = data[0];
        // console.log(userData);
        if (
          // typeof (userData.USUARIOID) !== 'undefined'
          // &&
          // userData.USUARIOID !== ''
          // userData.hasOwnProperty('USUARIOID')
          // 'USUARIOID' in userData
          userData
        ) {
          this.usuario = userData;
          localStorage.setItem(environment.currentuser, JSON.stringify({ usuario: this.usuario }));
          // console.log(this.Usuario());
          return true;
        }
        return false;
      })
      .catch(err => this.CapturarError(err));
  }

  public CerrarSesion() {
    // console.log('Cerrar Sesión!');
    // console.log(this.Usuario());
    if (this.Usuario().USUARIOID !== '') {
      this._helper.Notificacion('Sesión previa cerrada (' + this.Usuario().USUARIOID + '.- ' + this.Usuario().NOMBRE + ')', 'info');
      localStorage.removeItem(environment.currentuser);
      localStorage.clear();
      this.usuario = new Model();

      // for (let x = 0; x <= localStorage.length - 1; x++) {
      //   const clave = localStorage.key(x);
      //   //   console.log("La clave " + clave + "contiene el valor " + localStorage.getItem(clave) + "<br />");
      //   // if (clave.indexOf(environment.dbconsultas) !== -1) {
      //   if (clave.includes(environment.dbconsultas)) {
      //     console.log('Eliminando ' + clave);
      //     localStorage.removeItem(clave);
      //   }
      // }
    }
  }

  public ReenviarClave(email: string): Observable<boolean> {
    const _url = environment.apiurl + '/usuarios/reenviarclave/' + email;
    return this._http.get(_url)
      .map((response: Response) => {
        const data = this.ExtraerResultados(response);
        // console.log(data);
        // return data;
        if (data === true) {
          return true;
        } else { return false; }
      })
      .catch(err => this.CapturarError(err));
  }

  public SupervisarSesionDEPRECATED(): Observable<any> {
    if (this.Usuario().USUARIOID === '') {
      return;
    }
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/usuarios/sesion/supervisar/';
    // const d = new Date();
    // const h = d.getHours();
    // const m = d.getMinutes();
    // console.log('Supervisando Sesión ' + h + ':' + m);
    // console.log(_url);
    return this._http.get(_url, _options)
      .map((response: Response) => {
        console.log('Antes');
        const data = this.ExtraerResultados(response);
        console.log('Despues');
        console.log(data);
      })
      .catch(err => this.CapturarError(err));
  }

  public SupervisarSesion(): Observable<boolean> {
    if (this.Usuario().USUARIOID === '') {
      return;
    }
    const d = new Date();
    const h = d.getHours();
    const m = d.getMinutes();
    console.log('Supervisando Sesión ' + h + ':' + m);
    // console.log(this.Usuario().TOKEN);
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/usuarios/sesion/supervisar';
    return this._http.get(_url, _options).map((response: Response) => {
      const data = this.ExtraerResultados(response);
      // console.log(this.Usuario().TOKEN);
      return true;
    }).catch(err => this.CapturarError(err));
  }

  public MsjBienvenida(): string {
    // this.SupervisarSesion().subscribe(response => {
    //   // console.log(response);
    // });
    const MSJID = Math.floor(Math.random() * 57) + 1;
    let _msj = '';
    MSJBIENVENIDA.forEach(msj => {
      if (MSJID === msj.msjid) {
        _msj = msj.msj;
      }
    });
    return _msj;
  }
}
