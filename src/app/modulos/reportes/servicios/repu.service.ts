import { Injectable } from '@angular/core';
import { Repu as Model } from '../modelos/repu';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RepuService {

  constructor(private _http: Http, private _authService: AuthService) { }

  /**
   * Obtiene todos los usuarios que tiene asignado un reporte
   * @param reporteid Identificador del Reporte
   */
  public usuarios(reporteid: string): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    // console.log(_headers);

    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/reportes/usuarios/' + reporteid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        // console.log(data);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Quita permiso a un usuario para acceder al reporte
   * @param reporteid Identificador del Reporte
   * @param usuarioid Identificador del Usuario
   * @param sedeid Identificador de la sede a la cual pertenece el usuario
   */
  public quitarUsuario(reporteid: string, usuarioid: string, sedeid: string): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    // console.log(_headers);
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/reportes/usuarios/' + reporteid + '/' + usuarioid + '/' + sedeid;
    return this._http.delete(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        // console.log(data);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Da permiso a un usuario para que pueda visualizar el reporte
   * @param reporteid Identificador del Reporte
   * @param usuarioid Identificador del Usuario
   * @param sedeid Identificador de la sede a la cual pertenece el usuario
   */
  public agregarUsuario(reporteid: string, usuarioid: string, sedeid: string): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    // console.log(_headers);
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/reportes/usuarios/' + reporteid + '/' + usuarioid + '/' + sedeid;
    return this._http.put(_url, '', _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        // console.log(data);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

}
