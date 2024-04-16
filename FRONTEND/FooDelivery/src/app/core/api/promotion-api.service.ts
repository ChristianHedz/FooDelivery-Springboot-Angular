import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {catchError, Observable, of, throwError} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {IPromDto, IPromReq} from "../../admin-dashboard/interfaces/promotion.interface";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PromotionApiService {

  private http = inject(HttpClient);
  private url = environments.baseUrl;
  private authService = inject(AuthService);

  createPromotionByAdmin( prom: IPromReq ): Observable<any> {
    return this.http.post<any>(`${this.url}/promotions/save`, prom, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  updatePromotionByAdmin( prom: IPromReq ): Observable<IPromDto> {
    const { id, ...body } = prom;

    return this.http.put<any>(`${this.url}/promotions/update/${ id }`, body, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  deletePromotionByAdmin( promo: IPromDto ): Observable<string | void> {
    return this.http.delete<void>(`${this.url}/promotions/${ promo.id }`, { headers: this.authService.addTokenToHeaders() })
      .pipe(
        catchError( (err) => {
          if (err.status === 200) {
            return of('La promoción fue eliminada exitosamente');
          } else {
            return throwError( () => "Error al eliminar la promoción");
          }
        })
      )
  }

  getPromotionByAdmin( promId: number ): Observable<any> {
    return this.http.get<any>(`${this.url}/promotions/search/${ promId }`, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  getAllPromotions(): Observable<any> {
    return this.http.get<any>(`${this.url}/promotions/list`, { headers: this.authService.addTokenToHeaders() });
  }

}
