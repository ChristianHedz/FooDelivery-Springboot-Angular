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
  idUser?: number;



// Ahora puedes pasar `paymentInfo` en lugar de los valores individuales

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
  }

  payOrderWithPaypal(){
    let urlPayment;
    let dataPayment = new DataPayment ('PAYPAL', '100', 'USD', 'COMPRA');

    console.log('Data Payment:', dataPayment);

    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe(
      data => {
        urlPayment = data.url;
        console.log('Respuesta exitosa...');
        this.payOrder();
        window.location.href = urlPayment;
      },
      error => {
        urlPayment = error.url;
        window.location.href = urlPayment;
      }
    );
  }



  payOrder(){

    this.authService.getUserProfile().subscribe({
      next: (user: User) => {
        this.idUser = user.id
        console.log(this.idUser);
      }
    })
    let currentDate = new Date();
    console.log(this.idUser);

    console.log(currentDate);
    console.log(this.carritoProducts);
    let productInfo = Array.from(this.carritoProducts.entries()).map(([id, product]) => ({id, count: product.count}));
    console.log(productInfo);

    let order: Order = {
      totalPrice: this.totalFinal,
      status: StatusOrder.IN_PROGRESS,
      paymentMethod: PaymentMethod.PAYPAL,
      createdAt: new Date(),
      products: productInfo,
      user: {
        id: 10,
      }
  };

    this.paymentService.payOrderwithPaypal(order).subscribe({
      next: (data) => {
        console.log(data);
        console.log({data});
      }
    });


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
