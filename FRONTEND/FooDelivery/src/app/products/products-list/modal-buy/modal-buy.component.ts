import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IProductDTO } from '../../../admin-dashboard/interfaces/product.interface';
import { ProductsListComponent } from '../products-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab,faPaypal } from '@fortawesome/free-brands-svg-icons';

library.add(fab);

@Component({
  selector: 'app-modal-buy',
  standalone: true,
  imports: [FormsModule,FontAwesomeModule],
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
