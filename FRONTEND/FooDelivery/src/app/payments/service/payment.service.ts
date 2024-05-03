import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { UrlPaypalResponse } from '../common/url-paypal-response';
import { DataPayment } from '../common/data-payment';
import { Order } from '../../services/order';
import { AuthService } from '../../services/auth.service';
import { OrderResponse } from '../../admin-dashboard/interfaces/order.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://foodelivery-d2d7a5204308.herokuapp.com';

  constructor(private http: HttpClient, private authService:AuthService) { }

  getUrlPaypalPayment(dataPayment: DataPayment):Observable<UrlPaypalResponse>{
    return this.http.post<UrlPaypalResponse>(this.baseUrl + '/api/payments', dataPayment);
  }

  createOrder(order: Order):Observable<OrderResponse>{
    const jwt = sessionStorage.getItem("jwt_token");
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.post<OrderResponse>(this.baseUrl + '/orders',order,{headers})
  }
}
