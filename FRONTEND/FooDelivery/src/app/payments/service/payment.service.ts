import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlPaypalResponse } from '../common/url-paypal-response';
import { DataPayment } from '../common/data-payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }


  getUrlPaypalPayment(dataPayment: DataPayment):Observable<UrlPaypalResponse>{
    return this.http.post<UrlPaypalResponse>(this.baseUrl + '/api/payments', dataPayment)
  }
}
