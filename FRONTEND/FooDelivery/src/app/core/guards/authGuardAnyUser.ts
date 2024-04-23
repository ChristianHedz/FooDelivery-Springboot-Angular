import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {tap} from "rxjs/operators";
import {map} from "rxjs";

export const authGuardAnyUser: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router);
  return authService.isAnyUserAuthenticated()
    .pipe(
      map( isAuthenticated => {
        if ( isAuthenticated ) return true;

        router.navigateByUrl('/home');
        return false;
        /*if ( !isAuthenticated ) {
          console.log('authGuard yendo al login ', isAuthenticated);
          router.navigate(['/login']);
        }*/
      })
    );
};
