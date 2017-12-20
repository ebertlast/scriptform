import { Injectable } from '@angular/core';
import { Sed as Model } from '../modelos/sed';
import { environment } from '../../../../environments/environment';
import { Http, Response, Headers } from '@angular/http';
import { AuthService } from '../../seguridad/servicios/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';

@Injectable()
export class SedService {

  constructor(private _http: Http, private _authService: AuthService) { }

  public registros(sedeid: string = ''): Observable<Model[]> {
    return this._http.get(environment.apiurl + '/sedes/' + sedeid)
      .map((response: Response) => {
        const data = this._authService.ExtraerResultados(response);
        return data;
      })
      .catch(err => this._authService.CapturarError(err));
  }
  public SedesPromise(sedeid: string = ''): Promise<Model[]> {
    return this.registros(sedeid).toPromise();
  }
}
