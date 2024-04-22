import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environments} from "../../../environments/environments";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {IOrderReq, OrderResponse, OrderResponseAll} from "../../admin-dashboard/interfaces/order.interface";

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

  getAllOrders(page: number): Observable<OrderResponseAll> {
    return this.http.get<OrderResponseAll>(`${this.url}/orders`, { headers: this.authService.addTokenToHeaders() });
  } //?size=${ 10 }&page=${ page }

  getOrdersByStatus(status: string) {
    return this.http.get<OrderResponse[]>(`${this.url}/orders/status?status=${status}`, { headers: this.authService.addTokenToHeaders() });
  }

  updateOrderStatus(id: number, status: string) {
    return this.http.put<any>(`${this.url}/orders/${id}/status?status=${status}`, { headers: this.authService.addTokenToHeaders() });
  }
}
