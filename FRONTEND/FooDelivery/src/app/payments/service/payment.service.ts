import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UrlPaypalResponse } from '../common/url-paypal-response';
import { DataPayment } from '../common/data-payment';
import { Order } from '../../services/order';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://foodelivery-d2d7a5204308.herokuapp.com';
  private _authStatus = signal<boolean>(false);
  public authStatus  = computed(() => this._authStatus());

  constructor(private http: HttpClient, private authService:AuthService) { }

  getUrlPaypalPayment(dataPayment: DataPayment):Observable<UrlPaypalResponse>{
    return this.http.post<UrlPaypalResponse>(this.baseUrl + '/api/payments', dataPayment);
  }

  payOrderwithPaypal(order: Order):Observable<Order>{
    console.log(order.user.id);
    const jwt = sessionStorage.getItem("jwt_token");
    console.log(jwt);
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwt);
    return this.http.post<Order>(this.baseUrl + '/orders',order,{headers})
  }
}
