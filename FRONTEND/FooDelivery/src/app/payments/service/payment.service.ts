import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlPaypalResponse } from '../common/url-paypal-response';
import { DataPayment } from '../common/data-payment';
import { Order } from '../../services/order';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'https://foodelivery-d2d7a5204308.herokuapp.com';

  constructor(private http: HttpClient, private authService:AuthService) { }


  getUrlPaypalPayment(dataPayment: DataPayment):Observable<UrlPaypalResponse>{
    return this.http.post<UrlPaypalResponse>(this.baseUrl + '/api/payments', dataPayment)
  }

  getTokenFromHeaders(){
    return this.authService.addTokenToHeaders();
  }

  payOrderwithPaypal(order: Order):Observable<Order>{
    return this.http.post<Order>(this.baseUrl + '/orders',order, {headers: this.getTokenFromHeaders()});
  }
}
