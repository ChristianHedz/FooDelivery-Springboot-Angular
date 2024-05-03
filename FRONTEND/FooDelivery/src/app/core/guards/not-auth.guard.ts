import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { inject } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {tap} from "rxjs/operators";

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdminAuthenticated()
    .pipe(
      tap(
        isAuthenticated => {
          if ( isAuthenticated ) {
            router.navigate(['/admin']);
          }
        }),
      map( isAuthenticated => !isAuthenticated)
    );
};
