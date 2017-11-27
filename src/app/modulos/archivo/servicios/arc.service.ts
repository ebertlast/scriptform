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

  public nuevoArchivo(model: Model): Observable<boolean> {
    const _headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN
    });
    const _options = new RequestOptions({ headers: _headers });
    const _json = "json=" + JSON.stringify({ model });
    // console.log(_json);
    const _url = environment.apiurl + '/archivos/nuevo';
    return this._http.put(_url, _json, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }
}
