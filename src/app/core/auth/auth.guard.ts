import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { HttpClientService } from '../services/http-client.service';
import { mapTo, map } from 'rxjs/operators';
import { UserService } from '@app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _http: HttpClientService, private _userSer: UserService, private _router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this._userSer.setRedirectUrl(state.url);

    // return this._http.get('canActivate', '/usersvc/auth', null).pipe(
    //   map(v => {
    //     if (v.error) {
    //       this._router.navigateByUrl('sign');
    //       return false;
    //     }
    //     return true;
    //   })
    // );

    return true;
  }
}
