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

  public reportes(reporteid: string = ''): Observable<Model[]> {
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
}
