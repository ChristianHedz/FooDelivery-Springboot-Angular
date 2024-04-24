import { Component, ElementRef, ViewChild } from "@angular/core";
import { PaymentService } from "../../service/payment.service";
import { DataPayment } from "../../common/data-payment";
import { CommonModule } from "@angular/common";
import { throws } from "assert";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-purchase-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.css'
})
export class PurchaseSuccessComponent {
  order: any;
  totalPrice: any;

  ngOnInit() {
    const orderData = sessionStorage.getItem('order');
    if (orderData !== null) {
      this.order = JSON.parse(orderData).products;
      this.totalPrice = JSON.parse(orderData).totalPrice;
    }
  }
}
