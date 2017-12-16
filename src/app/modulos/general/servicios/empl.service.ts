import { Injectable } from '@angular/core';
import { Empl as Model } from '../modelos/empl';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class EmplService {

  constructor(private _http: Http, private _authService: AuthService) { }

  /**
   * Agrega un registro en la tabla EMPL
   * @param model Objeto de tipo Empleador para ser registrado
   */
  public nuevoRegistro(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = 'json=' + JSON.stringify({ model });
    const _url = environment.apiurl + '/empleador/nuevo';
    return this._http.put(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Obtiene un registro de la tabla de Empleadores
   * @param TipoID Tipo de Documento de Identidad
   * @param NumeroIdentificacion Número de documento de identidad
   */
  public registro(TipoID: string, NumeroIdentificacion: string): Observable<Model[]> {
    if (TipoID === '' || NumeroIdentificacion === '') { return; }
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/empleador/empleador/' + TipoID + '/' + NumeroIdentificacion;
    console.log(_url);
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Obtiene todos los registros de Empleadores
   */
  public registros(): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/empleador/';
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Elimina un registro de la tabla EMPL
   * @param TipoID Tipo de Documento de Identidad
   * @param NumeroIdentificacion Número de documento de identidad
   */
  public eliminarRegistro(TipoID: string, NumeroIdentificacion: string): Observable<boolean> {
    const _headers = new Headers({
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/empleador/' + TipoID + '/' + NumeroIdentificacion;
    return this._http.delete(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Actualiza un registro en la tabla EMPL (Empleadores)
   * @param model Objeto de tipo Empleador para ser actualizado
   */
  public actualizarRegistro(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = 'json=' + JSON.stringify({ model });
    const _url = environment.apiurl + '/empleador/actualizar';
    return this._http.post(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

}
