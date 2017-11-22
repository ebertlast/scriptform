import { Injectable } from '@angular/core';
import { Rep as Model } from '../modelos/rep';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RepService {

  constructor(private _http: Http, private _authService: AuthService) { }

  /**
   * Obtiene todos los reportes que tiene asignado el usuario que ha ingresado al sistema
   * @param reporteid Identificador del Reporte (opcional)
   */
  public reportesDisponibles(reporteid: string = ''): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    // console.log(_headers);

    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/reportes/' + reporteid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        // console.log(data);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Obtiene todos los reportes en la base de datos o filtrado por el identificador si es ingresado como parámetro
   * @param reporteid Identificador del reporte (opcional)
   */
  public reportes(reporteid: string = ''): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    // console.log(_headers);

    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/reportes/todos/' + reporteid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        // console.log(data);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Ejecuta en la base de datos la consulta registrada en el campo QUERY de la tabla REP tomando en cuenta los filtros configurados en la tabla REPP y devuelve la consulta paginada.
   * @param reporteid Identificador del Reporte
   * @param filasPorPagina Número de filas por páginas, valor por defecto: 10
   * @param nroPagina Número de página actual, valor por defecto: Primera Página
   */
  public ejecutarReporte(reporteid: string, filasPorPagina: number = 10, nroPagina = 1): Observable<any> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/reportes/ejecutar/' + reporteid + '/' + filasPorPagina.toString() + '/' + nroPagina;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        // console.log(data);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Actualiza la consulta SQL vinculada al reporte indicado
   * @param reporteid Identificador del Reporte 
   * @param query Consulta SQL que necesita ser actualizada
   */
  public actualizarQuery(reporteid: string, query: string): Observable<boolean> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    // console.log(_options);
    const _url = environment.apiurl + '/reportes/actualizarquery/' + reporteid + '/' + query;
    return this._http.put(_url, '', _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }


}
