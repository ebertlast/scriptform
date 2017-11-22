import { Injectable } from '@angular/core';
import { Helper } from '../../../app-helper';
import { Router } from '@angular/router';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Usu as Model } from '../modelos/usu';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { AuthService } from './auth.service';
@Injectable()
export class UsuService {

  constructor(private _helper: Helper,
    private _router: Router,
    private _http: Http,
    private _authService: AuthService
  ) { }

  public usuarios(reporteid: string = ''): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/usuarios/' + reporteid;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }
}
