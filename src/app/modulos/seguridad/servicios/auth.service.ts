import { Injectable } from '@angular/core';
import { Helper } from '../../../app-helper';
import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Usu as Model } from '../modelos/usu';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

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
    const body = res.json();
    // console.log('global.service.ExtraerResultados');
    // console.log(res.json());
    if (!body.response && body.message && mostrarError) {
      this._helper.Notificacion(body.message || body.statusText, 'Excepción', 'error');
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
    // console.log(this.usuario);

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
      this._helper.Notificacion(errMsg, 'Excepción', 'error');
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
      this.usuario = new Model();
    }
  }


}
