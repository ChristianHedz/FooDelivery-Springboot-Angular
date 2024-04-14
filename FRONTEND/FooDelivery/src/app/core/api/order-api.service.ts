import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {IOrderReq} from "../../admin-dashboard/interfaces/order.interface";

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  private http = inject(HttpClient);
  private url = environments.baseUrl;
  private authService = inject(AuthService);

  createOrderByAdmin( order: IOrderReq ): Observable<any> {
    return this.http.post<any>(`${this.url}/orders`, order, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  updateOrderByAdmin( order: IOrderReq ): Observable<any> {
    const { id, ...body } = order;

    return this.http.put<any>(`${this.url}/orders/${ id }`, body, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  deleteOrderByAdmin( orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/orders/${orderId}`, { headers: this.authService.addTokenToHeaders() });
  }

  getOrderByAdmin( orderId: number ): Observable<any> {
    return this.http.get<any>(`${this.url}/orders/${ orderId }`, {
      headers: this.authService.addTokenToHeaders()
    });
  }

  getAllOrdersOrders(): Observable<any> {
    return this.http.get<any>(`${this.url}/orders/list`, { headers: this.authService.addTokenToHeaders() });
  }

}
