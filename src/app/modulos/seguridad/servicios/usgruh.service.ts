import { Injectable } from '@angular/core';
import { Usgruh as Model } from '../modelos/usgruh';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class UsgruhService {

  constructor(private _http: Http, private _authService: AuthService) { }

  public nuevoRegistro(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = 'json=' + JSON.stringify({ model });
    const _url = environment.apiurl + '/detallegrupos/nuevo';
    return this._http.put(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  public registros(GrupoID: string, ProcedimientoID: string, ControlID: string = ''): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/detallegrupos/' + GrupoID + '/' + ProcedimientoID + '/' + ControlID;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  public eliminarRegistro(GrupoID: string, ProcedimientoID: string, ControlID: string): Observable<boolean> {
    const _headers = new Headers({
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/detallegrupos/' + GrupoID + '/' + ProcedimientoID + '/' + ControlID;
    return this._http.delete(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

  public actualizarRegistro(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = 'json=' + JSON.stringify({ model });
    const _url = environment.apiurl + '/detallegrupos/actualizar';
    return this._http.post(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }

}
