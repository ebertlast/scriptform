import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './modulos/seguridad/servicios/auth.service';
import { environment } from '../environments/environment';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router,
    private _auth: AuthService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    let _url = '';
    state.url.split('/').forEach(element => {
      if (_url === '') {
        if (element !== '') {
          _url = element;
        }
      }
    });

    // console.log('AuthGuard:', _url);
    let supervisar = true;
    switch (_url) {
      case 'ingresar':
        supervisar = false;
        break;
      case 'salir':
        supervisar = false;
        break;
      case '':
        this._router.navigate(['escritorio']);
        return Observable.of(false);
      default:
        supervisar = true;
    }
    if (supervisar) {
      // console.log('Validar que un usuario se haya autentificado');
      // if (!localStorage.getItem(environment.currentuser)) {
      if (this._auth.Usuario().USUARIOID === '') {
        this._router.navigate(['/ingresar']);
        return Observable.of(false);
      } else {
        // console.log('Usuario Autenticado: ', this._auth.Usuario().usuario);
      }
    }
    return Observable.of(true);
  }

}
