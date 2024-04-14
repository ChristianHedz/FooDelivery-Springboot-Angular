import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {IPromReq} from "../../admin-dashboard/interfaces/promotion.interface";

@Injectable({
  providedIn: 'root'
})
export class PromotionApiService {

  private http = inject(HttpClient);
  private url = environments.baseUrl;
  private authService = inject(AuthService);

  createPromotionByAdmin( prom: IPromReq ): Observable<any> {
    return this.http.post<any>(`${this.url}/promotion/save`, prom, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  updatePromotionByAdmin( prom: IPromReq ): Observable<any> {
    const { id, ...body } = prom;

    return this.http.put<any>(`${this.url}/promotion/update/${ id }`, body, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  deletePromotionByAdmin( promId: number ): Observable<void> {
    return this.http.delete<void>(`${this.url}/promotion/delete/${ promId }`, { headers: this.authService.addTokenToHeaders() });
  }

  getPromotionByAdmin( promId: number ): Observable<any> {
    return this.http.get<any>(`${this.url}/promotion/findById/${ promId }`, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  getAllPromotions(): Observable<any> {
    return this.http.get<any>(`${this.url}/promotion/list`, { headers: this.authService.addTokenToHeaders() });
  }

}
