import { NonNullableFormBuilder } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { IProductDTO } from '../../admin-dashboard/interfaces/product.interface';
import { ModalBuyComponent } from './modal-buy/modal-buy.component';
import { FormsModule } from '@angular/forms';
import { error, log } from 'console';
import { PaymentService } from '../../payments/service/payment.service';
import { Order, PaymentMethod, StatusOrder } from '../../services/order';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/user';
import { DataPayment } from '../../payments/common/data-payment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  imports: [ModalBuyComponent, FormsModule],
})
export class ProductsListComponent {
  private paymentService = inject(PaymentService);
  private productService = inject(ProductService);
  private authService = inject(AuthService);
  private router = inject(Router)
  products: IProductDTO[] = [];
  newProducts: IProductDTO[] = [];
  carritoProducts: Map<number, IProductDTO> = new Map();
  cantidadDeProductosCarrito: number = 0;
  precioTotalProductos: number = 0;
  totalFinal: number = 0;
  priceDelivery: number = 500;
  showInput: boolean = false;
  address: string = 'Caseros 3445 (N)';
  selectedProduct?: IProductDTO;
  idUser!: number;
  productQuantity!: number;

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.newProducts = this.mapProducts();
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      },
    });

    this.authService.getUserProfile().subscribe({
      next: (user: User) => {
        this.idUser = user.id
        console.log(this.idUser);
      }
    })
  }

  payOrderWithPaypal(){
    let urlPayment;
    let dataPayment = new DataPayment ('PAYPAL', this.totalFinal.toString(), 'USD', 'COMPRA');

    console.log('Data Payment:', dataPayment);

    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe(
      data => {
        urlPayment = data.url;
        window.location.href = urlPayment;
      },
      error => {
        urlPayment = error.url;
        window.location.href = urlPayment;
      },
    );
  }



  payOrder(){
    let productInfo = Array.from(this.carritoProducts.entries())
    .map(([id, product]) => ({id, quantity: product.count}));
      console.log(productInfo);

    let order: Order = {
      totalPrice: this.totalFinal,
      status: StatusOrder.IN_PROGRESS,
      paymentMethod: PaymentMethod.PAYPAL,
      createdAt: new Date(),
      products: productInfo,
      user: {
        id: this.idUser,
      }
    };

    this.paymentService.createOrder(order).subscribe({
      next: (data) => {
        console.log(data);
        console.log({data});
        sessionStorage.setItem('order', JSON.stringify(data));
      }
    });

    this.payOrderWithPaypal();
  }

  mapProducts() {
    console.log(this.products.map((product) => ({ ...product, count: 0 })));

    return this.products.map((product) => ({ ...product, count: 0 }));
  }

  increment(productId: number | undefined) {
    if (productId) {
      this.newProducts.forEach((product) => {
        if (product.id === productId && product.count != undefined) {
          product.count += 1;
          this.cantidadDeProductosCarrito++;
          this.precioTotalProductos += product.price;
          this.carritoProducts.set(product.id, product);
          this.updateTotal();
        }
      });
    }
  }

  decrement(productId: number | undefined) {
    if (productId) {
      this.newProducts.forEach((product) => {
        if (product.count != undefined)
          if (product.id === productId && product.count > 0) {
            product.count -= 1;
            this.cantidadDeProductosCarrito--;
            this.precioTotalProductos -= product.price;
            if (product.count === 0) {
              this.carritoProducts.delete(product.id);
            } else {
              this.carritoProducts.set(product.id, product);
            }
            this.updateTotal();
          }
      });
    }
  }

  deleteProduct(productId: number | undefined) {
    this.newProducts.forEach((product) => {
      if (product.count != undefined && product.id != undefined)
        if (product.id === productId && product.count > 0) {
          this.cantidadDeProductosCarrito -= product.count;
          this.precioTotalProductos -= product.price * product.count;
          product.count = 0;
          this.carritoProducts.delete(productId);
          this.updateTotal();
        }
    });
  }

  updateTotal(): void {
    this.totalFinal = this.precioTotalProductos + this.priceDelivery;
    console.log(this.carritoProducts);
  }

  toggleInput(): void {
    this.showInput = !this.showInput; // Cambia el estado de visibilidad
  }

  submitAddress(): void {
    this.address;
  }

  openModal(product: IProductDTO): void {
    this.selectedProduct = product;
  }
}
