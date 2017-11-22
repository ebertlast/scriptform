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

  
}
