import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../../services/auth.service";
import {tap} from "rxjs/operators";
import {map} from "rxjs";

export const authGuardAdmin: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);

  const router = inject(Router);
  return authService.isAdminAuthenticated()
    .pipe(
      map( isAuthenticated => {
        if ( isAuthenticated ) return true;

        router.navigateByUrl('/login');
        return false;
        /*if ( !isAuthenticated ) {
          console.log('authGuard yendo al login ', isAuthenticated);
          router.navigate(['/login']);
        }*/
      })
    );
};
