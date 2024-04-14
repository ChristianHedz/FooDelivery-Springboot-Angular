import { Component, ElementRef, ViewChild } from "@angular/core";
import { PaymentService } from "../../payments/service/payment.service";
import { DataPayment } from "../../payments/common/data-payment";


@Component({
  selector: 'app-purchase-success',
  standalone: true,
  imports: [],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.css'
})
export class PurchaseSuccessComponent{

  constructor(private paymentService: PaymentService){}

  paypalPayment(){
        //redireccion y pago con paypal
        let urlPayment;
        let dataPayment = new DataPayment ('PAYPAL', '100', 'USD', 'COMPRA');

        console.log('Data Payment:', dataPayment);

        this.paymentService.getUrlPaypalPayment(dataPayment).subscribe(
          data => {
            urlPayment = data.url;
            console.log('Respuesta exitosa...');
            window.location.href = urlPayment;
          }
        );
  }
}
