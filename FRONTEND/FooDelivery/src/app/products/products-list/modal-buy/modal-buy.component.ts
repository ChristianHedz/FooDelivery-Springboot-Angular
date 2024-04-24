import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProductDTO } from '../../../admin-dashboard/interfaces/product.interface';
import { ProductsListComponent } from '../products-list.component';


@Component({
  selector: 'app-modal-buy',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './modal-buy.component.html',
  styleUrl: './modal-buy.component.css',
})
export class ModalBuyComponent {
  @Input() products: IProductDTO[] | undefined;
  @Input() incrementMethod!: (productId: number | undefined) => void;
  @Input() decrementMethod!: (productId: number | undefined) => void;
  @Input() deleteMethod!: (productId: number | undefined) => void;
  @Input() toggleInput!: () => void;
  @Input() submitAddress!: () => void;
  @Input() cantidadDeProductosCarrito!: number;
  @Input() totalPriceProduct!: number;
  @Input() priceTotal!: number;
  @Input() priceDelivery!: number;
  @Input() showInput!: boolean;
  @Input() address!: string;
  @Output() buttonPayment = new EventEmitter<any>();

  onButtonPayment() {
    this.buttonPayment.emit(null);
  }

  increment(productId: number | undefined) {
    this.incrementMethod(productId);
  }

  decrement(productId: number | undefined) {
    this.decrementMethod(productId);
  }




}
