import { Injectable } from '@angular/core';
import { Arc as Model } from '../modelos/arc';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ArcService {

  constructor(private _http: Http, private _authService: AuthService) { }

  /**
   * Agrega un registro en la tabla ARC
   * @param model Objeto de tipo Arc
   */
  public nuevoArchivo(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = 'json=' + JSON.stringify({ model });
    // console.log(_json);
    const _url = environment.apiurl + '/archivos/nuevo';
    return this._http.put(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Obtiene el listado de registros de la tabla ARC o un registro si pasa como parámetro el código del archivo
   * @param archivoid Código del archivo
   */
  public archivos(archivoid: string = ''): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/archivos/' + archivoid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  /**
   * Genera un codigo serial único para codigos de barras
   * @param municipioid Código del municipio
   */
  public sticker(municipioid: string): Observable<string> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/archivos/sticker/' + municipioid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }
}
