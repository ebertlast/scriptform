import { Injectable } from '@angular/core';
import { Repp as Model } from '../modelos/repp';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable()
export class ReppService {

  constructor(private _http: Http, private _authService: AuthService) { }

  /**
   * Obtiene todos los filtros vinculados a un reporte
   * @param reporteid Id del reporte que se desea obtener los filtros configurados
   */
  public parametros(reporteid: string): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });

    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/parametros/' + reporteid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Obtiene la consulta vinculada a un filtro o parámetro si ésta no está vacía en la base de datos
   * @param reporteid Id del reporte al que pertenece el filtro o parámetro
   * @param parametroid Id del parámetro al que se quiere obtener la consulta
   */
  public geConsulta(reporteid: string, parametroid: string): Observable<any[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/parametros/consulta/' + reporteid + '/' + parametroid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Actualizar el valor de un filtro o parámetro del reporte
   * @param reporteid Id del reporte al que pertenece el parámetro
   * @param parametroid Id del parámetro a actualizar el valor
   * @param valor El nuevo valor que tendrá el parametro
   */
  public actualizarValor(reporteid: string, parametroid: string, valor: string): Observable<boolean> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    // console.log(_options);
    const _url = environment.apiurl + '/parametros/actualizarvalor/' + reporteid + '/' + parametroid + '/' + valor;
    return this._http.put(_url, '', _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }


  /**
   * Registra un nuevo parámetro o filtro al reporte
   * @param model Parametro filtro que sera agregado al reporte
   */
  public nuevoParametro(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = "json=" + JSON.stringify({ model });
    // console.log(_json);
    const _url = environment.apiurl + '/parametros/nuevo';
    return this._http.put(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Elimina un parametro de la base de datos
  * @param parametroid Id del Parametro que se va a eliminar del reporte
   */
  public quitarParametro(parametroid: string): Observable<boolean> {
    const _headers = new Headers({
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/parametros/' + parametroid;
    return this._http.delete(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Actualiza los datos de un parámetro ya registrado
   * @param model Parámetro que será actualizado en la base de datos
   */
  public actualizarParametro(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = "json=" + JSON.stringify({ model });
    console.log(_json);
    
    const _url = environment.apiurl + '/parametros/actualizar';
    return this._http.put(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }



}
