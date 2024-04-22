import { Component, ElementRef, ViewChild } from "@angular/core";
import { PaymentService } from "../../service/payment.service";
import { DataPayment } from "../../common/data-payment";
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-purchase-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './purchase-success.component.html',
  styleUrl: './purchase-success.component.css'
})
export class PurchaseSuccessComponent{

  products: { name: string, ingredients: string[], price: number }[] = [
    { name: 'Producto 1', ingredients: ['Ingrediente 1', 'Ingrediente 2'], price: 10 },
    { name: 'Producto 2', ingredients: ['Ingrediente 3', 'Ingrediente 4'], price: 20 },
    { name: 'Producto 3', ingredients: ['Ingrediente 5', 'Ingrediente 6'], price: 30 },
    // Agrega más productos aquí
  ];

  constructor(private paymentService: PaymentService){}


}
