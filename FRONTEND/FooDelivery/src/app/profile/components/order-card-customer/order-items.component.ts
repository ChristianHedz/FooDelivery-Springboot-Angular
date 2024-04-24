import {Component, Input} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {CurrencyPipe} from "@angular/common";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {IProduct, ProductRegister} from "../../../admin-dashboard/interfaces/product.interface";

@Component({
  selector: 'app-order-items',
  standalone: true,
  imports: [
    ButtonModule,
    CurrencyPipe,
    RippleModule,
    SharedModule,
    TableModule
  ],
  templateUrl: './order-items.component.html',
  styleUrl: './order-items.component.css'
})
export class OrderItemsComponent {

  @Input( { required: true }) products!: any[];

}
