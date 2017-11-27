import { Injectable } from '@angular/core';
import { Afi as Model } from '../modelos/afi';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class AfiService {

  constructor(private _http: Http, private _authService: AuthService) { }


  /**
   * Afiliado consultado por su documento de identidad
   * @param tipoid Id del tipo de documento de identidad
   * @param numeroIdentificacion Número de documento de identidad
   */
  public afiliadoPorDocumento(tipoid: string, numeroIdentificacion: string): Observable<Model[]> {
    const _headers = new Headers({ 'Authorization': 'Bearer ' + this._authService.Usuario().TOKEN });
    const _options = new RequestOptions({ headers: _headers });
    const _url = environment.apiurl + '/afiliados/' + tipoid + '/' + numeroIdentificacion;
    return this._http.get(_url, _options)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }
}
